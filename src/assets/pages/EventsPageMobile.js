import React from 'react';
import EventCalendar from '../components/EventCalendar';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';
import '../styles/EventsPage.css';

const EventsPageMobile = ({ events, nextEvent }) => {
    const renderCountdown = ({ days, hours, minutes, seconds }) => (
        <div className="countdown">
            <span>{days}D</span> <span>{hours}H</span> <span>{minutes}M</span> <span>{seconds}S</span>
        </div>
    );

    return (
        <motion.div
            className="events-page-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                minHeight: '100vh',
                width: '100%',
                padding: '1rem',
                paddingTop: 'calc(4rem + 20px)', // Account for navbar height + extra spacing
                backgroundColor: '#000',
                color: '#fff',
            }}
        >
            <div className="countdown-container-mobile">
                <h2 className="text-2xl font-bold mb-4">NEXT EVENT IN:</h2>
                {nextEvent ? (
                    <Countdown 
                        date={new Date(`${nextEvent.startDate}T${nextEvent.startTime}:00`)}
                        renderer={renderCountdown}
                    />
                ) : (
                    <div className="countdown">TBA</div>
                )}
            </div>

            <EventCalendar 
                events={events}
                isMobile={true}
            />
        </motion.div>
    );
};

export default EventsPageMobile;