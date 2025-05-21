// backend/routes/subscribeRoute.js
import express from 'express';
import nodemailer from 'nodemailer';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, eventLink } = req.body;

  console.log('Received subscribe request:', { email, eventLink });

  if (!email || !eventLink) {
    console.log('Missing email or eventLink');
    return res.status(400).json({ message: 'Email and Event Link required' });
  }

  try {
    const subscriber = new Subscriber({ email, eventLink });
    await subscriber.save();
    console.log('Subscriber saved:', subscriber);

    // Send confirmation email
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
      subject: 'Your Event Ticket Link',
      html: `<p>Thanks for your interest! Click below to get your ticket:</p><a href="${eventLink}" target="_blank">Get Ticket</a>`,
    });

    console.log('Confirmation email sent to:', email);

    res.status(200).json({ message: 'Email sent and saved' });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate email error
      console.error('Duplicate email:', email);
      return res.status(409).json({ message: 'This email is already subscribed.' });
    }
    console.error('Error in subscribe route:', err);
    res.status(500).json({ message: 'Submission failed' });
  }
});

export default router;
