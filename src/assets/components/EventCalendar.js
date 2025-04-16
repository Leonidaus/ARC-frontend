import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const [nextEventCountdown, setNextEventCountdown] = useState('TBA');

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          'https://ghwyrirvdi.execute-api.eu-north-1.amazonaws.com/dev/events'
        );
        const data = await response.json();

        if (data && data.data && Array.isArray(data.data)) {
          const now = new Date();
          const filteredEvents = data.data.filter((event) => {
            if (!event.startDate || !event.startTime || !event.endDate || !event.endTime) {
              console.warn('Event is missing required fields:', event);
              return false;
            }
            const eventStart = new Date(`${event.startDate}T${event.startTime}:00`);
            const eventEnd = new Date(`${event.endDate}T${event.endTime}:00`);
            return eventEnd > now;
          });

          const sortedEvents = filteredEvents.sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          );
          setEvents(sortedEvents);

          const initialCountdowns = {};
          sortedEvents.forEach(event => {
            const eventDate = new Date(`${event.startDate}T${event.startTime}:00`);
            initialCountdowns[event.eventId] = getCountdown(eventDate, new Date(`${event.endDate}T${event.endTime}:00`));
          });
          setCountdowns(initialCountdowns);
          updateNextEventCountdown(sortedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    const interval = setInterval(() => {
      setCountdowns(prev => {
        const updated = {};
        events.forEach(event => {
          const eventDate = new Date(`${event.startDate}T${event.startTime}:00`);
          const eventEnd = new Date(`${event.endDate}T${event.endTime}:00`);
          updated[event.eventId] = getCountdown(eventDate, eventEnd);
        });
        return updated;
      });
      updateNextEventCountdown(events);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const updateNextEventCountdown = (events) => {
    const now = new Date();
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(`${event.startDate}T${event.startTime}:00`);
      return eventDate > now;
    });

    if (upcomingEvents.length > 0) {
      const nextEvent = upcomingEvents[0];
      const eventDate = new Date(`${nextEvent.startDate}T${nextEvent.startTime}:00`);
      setNextEventCountdown(getCountdown(eventDate, new Date(`${nextEvent.endDate}T${nextEvent.endTime}:00`)));
    } else {
      setNextEventCountdown('TBA');
    }
  };

  const getCountdown = (eventDate, eventEnd) => {
    const now = new Date();

    if (now >= eventDate && now < eventEnd) {
      return 'CURRENTLY ONGOING';
    } else if (now >= eventEnd) {
      return 'EVENT ENDED';
    }

    const diff = eventDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  // Completely separate mobile implementation
  if (isMobile) {
    return (
      <div style={{
        width: '100%',
        padding: '16px',
        paddingTop: '100px',
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'rgb(255, 255, 255)',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          UPCOMING EVENTS
        </h1>

        {events.length === 0 ? (
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            padding: '32px'
          }}>
            No upcoming events scheduled.
          </p>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {events.map((event) => (
              <motion.div
                key={event.eventId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(255, 255, 255, 0)',
                  borderRadius: '0',
                  padding: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderBottom: '1px solid #FF914D'
                }}
                onClick={() => setSelectedEvent(selectedEvent?.eventId === event.eventId ? null : event)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#FF914D',
                    margin: 0,
                    flex: 1
                  }}>
                    {event.name}
                  </h2>
                  <motion.div
                    animate={{ rotate: selectedEvent?.eventId === event.eventId ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronRight style={{ color: '#FF914D' }} />
                  </motion.div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: countdowns[event.eventId] === 'CURRENTLY ONGOING' 
                      ? 'rgba(76, 175, 79, 0)' 
                      : countdowns[event.eventId] === 'EVENT ENDED'
                        ? 'rgba(255, 107, 107, 0)'
                        : 'rgba(255, 168, 38, 0)',
                  }}>
                    <p style={{
                      color: countdowns[event.eventId] === 'CURRENTLY ONGOING' 
                        ? '#4CAF50' 
                        : countdowns[event.eventId] === 'EVENT ENDED'
                          ? '#FF6B6B'
                          : '#FFA726',
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: 0
                    }}>
                      {countdowns[event.eventId] || 'Calculating...'}
                    </p>
                  </div>
                </div>

                {/* Expanded content - only shown when event is selected */}
                {selectedEvent?.eventId === event.eventId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <p style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: '12px',
                      lineHeight: '1.5'
                    }}>
                      {event.description}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <FaMapMarkerAlt style={{ color: '#FF914D', fontSize: '14px' }} />
                        <p style={{
                          fontSize: '14px',
                          color: '#FF914D',
                          margin: 0
                        }}>
                          {event.location}
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <FaCalendarAlt style={{ color: '#FF914D', fontSize: '14px' }} />
                        <p style={{
                          fontSize: '14px',
                          color: '#FF914D',
                          margin: 0
                        }}>
                          {new Date(event.startDate).toLocaleDateString()} - {event.startTime}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Original desktop implementation (unchanged)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      maxWidth: '1200px',
      gap: '2rem',
      position: 'relative',
      zIndex: 1,
      paddingTop: '2.5rem',
    }}>
      {/* Left Section: Event List */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '45%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '2rem',
          borderRadius: '10px',
          color: '#f97316',
        }}
      >
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
        }}>
          Upcoming Events
        </h1>

        <div style={{ marginTop: '1rem' }}>
          {events.length > 0 ? (
            events.map((event, index) => (
              <React.Fragment key={event.eventId}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => setSelectedEvent(event)}
                  style={{
                    background: selectedEvent?.eventId === event.eventId ? 'rgba(249, 116, 22, 0)' : 'transparent',
                    padding: '1rem 0',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                  }}
                >
                  <h3 style={{
                    color: '#FFFFFF',
                    margin: '0 0 0.25rem 0',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {event.name}
                  </h3>
                  <p style={{
                    color: countdowns[event.eventId] === 'CURRENTLY ONGOING' ? '#4CAF50' : '#f97316',
                    margin: '0',
                    fontSize: '0.9rem'
                  }}>
                    {countdowns[event.eventId] || 'Calculating...'}
                  </p>
                </motion.div>
                {index < events.length - 1 && (
                  <div style={{
                    height: '1px',
                    background: '#f97316',
                    opacity: 0.5,
                    margin: '0.5rem 0'
                  }} />
                )}
              </React.Fragment>
            ))
          ) : (
            <p style={{ color: '#A0A0A0' }}>No upcoming events.</p>
          )}
        </div>
      </motion.div>

      {/* Right Section: Event Details */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '45%',
            padding: '2rem',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0)',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF4500' }}
          >
            {selectedEvent.name}
          </motion.h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#FF4500',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <FaMapMarkerAlt /> {selectedEvent.location}
          </p>
          <p style={{
            fontSize: '1.25rem',
            color: countdowns[selectedEvent.eventId] === 'CURRENTLY ONGOING' ? '#4CAF50' : '#f97316',
            margin: '1rem 0',
            fontWeight: '500'
          }}>
            {countdowns[selectedEvent.eventId] || 'Calculating...'}
          </p>
          <p style={{
            fontSize: '1rem',
            color: '#FFFFFF',
            marginTop: '1rem',
            lineHeight: '1.6'
          }}>
            {selectedEvent.description}
          </p>
          <p style={{
            fontSize: '0.875rem',
            color: '#FF4500',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <FaCalendarAlt /> {new Date(selectedEvent.startDate).toLocaleDateString()} - {selectedEvent.startTime}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default EventCalendar;