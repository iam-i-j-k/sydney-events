import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleGetTickets = () => {
    navigate('/subscribe', { state: { eventLink: event.link } });
  };

  return (
    <div 
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute transform rotate-45 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-1 right-[-35px] top-[32px] w-[170px]"></div>
      </div>

      {/* Image section with overlay gradient */}
      {event.image ? (
        <div className="relative h-52 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-50'}`}></div>
          <img 
            src={event.image || "/placeholder.svg"} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        </div>
      ) : (
        <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center"></div>
      )}
      
      <div className="p-5 flex flex-col flex-grow relative">
        {/* Title with animated underline on hover */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {event.title}
          <span className="block max-w-0 group-hover:max-w-full h-0.5 bg-blue-600 transition-all duration-500 mt-1"></span>
        </h2>
        
        {/* Location with animated icon */}
        <div className="flex items-center mb-4 text-gray-600">
          <div className="mr-2 p-1.5 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors duration-300">
            <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <span className="line-clamp-1 text-sm">{event.location}</span>
        </div>
        
        {/* Animated ticket button */}
        <div className="mt-auto">
          <button 
            onClick={handleGetTickets} 
            className="relative cursor-pointer w-full overflow-hidden group-hover:overflow-visible bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            aria-label={`Get tickets for ${event.title}`}
          >
            <div className="relative z-10 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
              </svg>
              GET TICKETS
            </div>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
          </button>
        </div>
      </div>
      
      {/* Decorative dots */}
      <div className="absolute bottom-3 right-3 flex space-x-1">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-300 transition-colors duration-300 delay-75"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-400 transition-colors duration-300 delay-150"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-500 transition-colors duration-300 delay-200"></div>
      </div>
    </div>
  );
};

export default EventCard;