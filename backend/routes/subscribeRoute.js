// backend/routes/subscribeRoute.js
import express from 'express';
import nodemailer from 'nodemailer';
import Otp from '../models/Otp.js';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/send-otp', async (req, res) => {
  const { email, eventLink } = req.body;
  if (!email || !eventLink) return res.status(400).json({ message: 'Email and Event Link required' });

  const otp = generateOtp();

  await Otp.findOneAndUpdate(
    { email, eventLink },
    { otp, createdAt: new Date() },
    { upsert: true, new: true }
  );

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Sydney Events" <${process.env.EMAIL_SENDER}>`,
    to: email,
    subject: 'Your OTP for Sydney Event',
    html: `<p>Your OTP is: <b>${otp}</b></p>`,
  });

  res.json({ message: 'OTP sent' });
});

router.post('/verify-otp', async (req, res) => {
  const { email, eventLink, otp } = req.body;
  if (!email || !eventLink || !otp) return res.status(400).json({ message: 'All fields required' });

  const record = await Otp.findOne({ email, eventLink, otp });
  if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

  await Subscriber.findOneAndUpdate(
    { email, eventLink },
    { email, eventLink, dob: req.body.dob },
    { upsert: true, new: true }
  );

  await Otp.deleteOne({ _id: record._id });

  res.json({ message: 'OTP verified' });
});

export default router;
