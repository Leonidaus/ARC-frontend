import React, { useState, useEffect } from 'react';
import EventCalendar from '../components/EventCalendar';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import EventsPageMobile from './EventsPageMobile';
import '../styles/EventsPage.css';

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const EventsPage = () => {
    const isMobile = useIsMobile();
    const videoSrc = useState('/videos/running2.mp4');
    const [nextEvent, setNextEvent] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    'https://ghwyrirvdi.execute-api.eu-north-1.amazonaws.com/dev/events'
                );
                const data = await response.json();

                if (data?.data && Array.isArray(data.data)) {
                    const now = new Date();
                    const validEvents = data.data.filter(event => {
                        if (!event.startDate || !event.startTime) return false;
                        const eventDate = new Date(`${event.startDate}T${event.startTime}:00`);
                        return eventDate > now;
                    });

                    setEvents(validEvents);

                    if (validEvents.length > 0) {
                        const sortedEvents = [...validEvents].sort(
                            (a, b) => new Date(a.startDate) - new Date(b.startDate)
                        );
                        setNextEvent(sortedEvents[0]);
                    } else {
                        setNextEvent(null);
                    }
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // If mobile, render mobile version
    if (isMobile) {
        return (
            <EventsPageMobile 
                events={events}
                nextEvent={nextEvent}
            />
        );
    }

    // Desktop version continues here
    const renderCountdown = ({ days, hours, minutes, seconds }) => (
        <div className="countdown">
            <span>{days}D</span> <span>{hours}H</span> <span>{minutes}M</span> <span>{seconds}S</span>
        </div>
    );

    return (
        <motion.div
            className="events-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: 'transparent',
                color: '#fff',
            }}
        >
            <video
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1',
                    filter: 'brightness(50%)',
                }}
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="video-overlay"></div>

            <EventCalendar events={events} />

            <div className="countdown-container">
                <h2>NEXT ONE IN:</h2>
                {nextEvent ? (
                    <Countdown 
                        date={new Date(`${nextEvent.startDate}T${nextEvent.startTime}:00`)}
                        renderer={renderCountdown}
                    />
                ) : (
                    <div className="countdown">TBA</div>
                )}
            </div>
        </motion.div>
    );
};

export default EventsPage;