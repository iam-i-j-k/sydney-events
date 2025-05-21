# 🌐 Sydney Events Aggregator

A full-stack web application that automatically scrapes live event data from public event listing platforms in Sydney, Australia. Users can browse a clean, minimal UI and get redirected to the event ticket page after entering their email.

## 🚀 Features

- ✅ Real-time web scraping using Puppeteer  
- ✅ Auto-refresh event data daily via cron job  
- ✅ Modern React + Tailwind frontend  
- ✅ Secure email submission and redirection  
- ✅ Nodemailer integration with Gmail App Password  
- ✅ MongoDB for persistent event and subscriber storage  

## 🧰 Tech Stack

| Layer       | Tools/Frameworks                          |
|------------|--------------------------------------------|
| Frontend   | React, Vite, Tailwind CSS, Axios           |
| Backend    | Node.js, Express.js, Nodemailer, Puppeteer |
| Database   | MongoDB (with Mongoose)                    |
| Cron Jobs  | node-cron                                  |
| Deployment | Vercel (Frontend), Render/Railway (Backend) |

## 📸 Screenshots

> Add screenshots of your homepage and subscribe page inside a `/screenshots` folder.

## 📦 Project Structure

event-scraper-app/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── scraper/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── index.css
│ └── .env


## 🛠️ Setup Instructions

### 🔧 Backend Setup

```bash
cd event-scraper-app/backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection
EMAIL_SENDER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

Start the backend:

node server.js

💻 Frontend Setup

Create a .env file:
VITE_API_URL=http://localhost:5000/api

📬 Email Setup (Gmail with App Password)
Enable 2-Step Verification on your Google account.

Go to https://myaccount.google.com/apppasswords

Generate a password for "Mail" and "Other"

Use that in .env as EMAIL_PASSWORD

🎯 Submission Requirements Covered
✅ Functional event display

✅ Clean, minimalist UI

✅ Email submission & redirect

✅ Scraper auto-refresh with cron job

✅ Modular backend/frontend design

🤔 Challenges Faced
Inconsistent DOM structures across events

Gmail SMTP restrictions (solved using App Passwords)

Handling missing values (title, image, link)

✅ Future Improvements
Filters (category, free/paid)

Multi-city support

Event recommendation chatbot (optional)

RSVP data analytics

🔗 Author
Irfan Jan Khan
LinkedIn: https://www.linkedin.com/in/irfan-jan-khan-3306742ba/
GitHub: https://github.com/iam-i-j-k

