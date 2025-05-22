// backend/scraper/scrapeEvents.js
import puppeteer from 'puppeteer';
import Event from '../models/Event.js';

export const scrapeSydneyEvents = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // ✅ Required for Render deployment
    });

    const page = await browser.newPage();

    await page.goto('https://www.eventbrite.com.au/d/australia--sydney/events/', {
      waitUntil: 'networkidle2',
      timeout: 0
    });

    const events = await page.evaluate(() => {
      const eventAnchors = Array.from(document.querySelectorAll('a.event-card-link[data-event-id]'));

      return eventAnchors.map(el => {
        let title = el.querySelector('h3')?.innerText.trim();
        if (!title) {
          title = el.getAttribute('aria-label')?.replace(/^View\s+/i, '').trim();
        }
        if (!title) {
          title = el.innerText.trim();
        }

        const link = el.href;
        const image = el.querySelector('img')?.src || 'https://placehold.co/600x400?text=No+Image';
        const location = el.getAttribute('data-event-location') || 'Location not specified';
        const paidStatus = el.getAttribute('data-event-paid-status') || 'free';
        const category = el.getAttribute('data-event-category') || 'N/A';

        return {
          title,
          link,
          location,
          date: '',
          time: '',
          image,
          paidStatus,
          category
        };
      }).filter(event => event.image && event.link && event.title); // Only complete events
    });

    await browser.close();

    // Replace old data with fresh scrape
    await Event.deleteMany({});
    await Event.insertMany(events);

    console.log(`${events.length} events scraped and saved.`);
  } catch (err) {
    console.error("Initial scrape failed:", err);
  }
};
