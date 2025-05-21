// backend/models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  image: String,
  link: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
