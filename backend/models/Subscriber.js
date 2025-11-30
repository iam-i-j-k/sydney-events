// backend/models/Subscriber.js
import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true },
  eventLink: { type: String },
  dob: { type: String },
  createdAt: { type: Date, default: Date.now },
});

subscriberSchema.index({ email: 1, eventLink: 1 }, { unique: true });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;
