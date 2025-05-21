// backend/routes/eventRoutes.js
import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

export default router;
