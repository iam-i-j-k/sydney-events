import { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/events`)
      .then(res => {
        console.log('Events:', res.data); // Add this line
        setEvents(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map(event => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default Home;
