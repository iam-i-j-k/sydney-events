// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { scrapeSydneyEvents } from './scraper/scrapeEvents.js';
import cron from 'node-cron';

import eventRoutes from './routes/eventRoutes.js';
import subscribeRoute from './routes/subscribeRoute.js';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/events', eventRoutes);
app.use('/api/subscribe', subscribeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled scrape...');
  await scrapeSydneyEvents();
});

// Run scraper once on server start (for development)
scrapeSydneyEvents().then(() => {
  console.log('Initial scrape complete');
}).catch(err => {
  console.error('Initial scrape failed:', err);
});