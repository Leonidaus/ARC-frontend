import React from 'react';
import '../styles/CommunityPage.css';
import { useIsMobile } from '../hooks/useIsMobile';

const CommunityPage = () => {
    const isMobile = useIsMobile();

    return (
        <div className={`community-page ${isMobile ? 'mobile' : ''}`}>
            <div
                className="panel left-panel"
                style={{
                    backgroundImage: "url('/images/community/left-panel.jpg')",
                    backgroundColor: '#000000',
                }}
                onClick={() => window.open("https://www.strava.com/clubs/1236005", "_blank")}
            >
                <h1 className="text-xl md:text-3xl lg:text-4xl">Strava</h1>
                <p className="text-sm md:text-base">Join our Strava club to discuss the latest activities and events.</p>
            </div>

            <div
                className="panel center-panel"
                style={{
                    backgroundImage: "url('/images/community/center-panel.jpg')",
                    backgroundColor: '#000000',
                }}
                onClick={() => window.open("https://community.example.com", "_blank")}
            >
                <h1 className="text-xl md:text-3xl lg:text-4xl">Telegram</h1>
                <p className="text-sm md:text-base">Join our community forum to discuss the latest activities and events.</p>
            </div>

            <div
                className="panel right-panel"
                style={{
                    backgroundImage: "url('/images/community/right-panel.jpg')",
                    backgroundColor: '#000000',
                }}
                onClick={() => window.open("https://events.example.com", "_blank")}
            >
                <h1 className="text-xl md:text-3xl lg:text-4xl">Instagram</h1>
                <p className="text-sm md:text-base">Check out our event calendar for upcoming events and activities.</p>
            </div>
        </div>
    );
};

export default CommunityPage;