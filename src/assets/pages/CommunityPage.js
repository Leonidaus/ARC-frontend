import React from 'react';
import '../styles/CommunityPage.css'; // Ensure you create this CSS file
import { GlowingEffect } from "../components/glowing-effect";

const CommunityPage = () => {
    return (
        <div className="community-page">
            <div
                className="panel left-panel"
                style={{
                    backgroundImage: "url('/images/community/left-panel.jpg')",
                    backgroundColor: '#000000',
                }}
                onClick={() => window.open("https://www.strava.com/clubs/1236005", "_blank")}
            >
                <h1>Strava</h1>
                <p>Join our Strava club to discuss the latest activities and events.</p>
            </div>

            <div
                className="panel center-panel"
                style={{
                    backgroundImage: "url('/images/community/center-panel.jpg')",
                    backgroundColor: '#000000',
                }}
                onClick={() => window.open("https://community.example.com", "_blank")}
            >
                <h1>Telegram</h1>
                <p>Join our community forum to discuss the latest activities and events.</p>
            </div>

            <div
                className="panel right-panel"
                style={{
                    backgroundImage: "url('/images/community/right-panel.jpg')",
                    backgroundColor: '#000000',
                }}
                onClick={() => window.open("https://events.example.com", "_blank")}
            >
                <h1>Instagram</h1>
                <p>Check out our event calendar for upcoming events and activities.</p>
            </div>
        </div>
    );
};

export default CommunityPage;