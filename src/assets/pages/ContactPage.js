import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/ContactPage.css';
import { BackgroundPaths } from '../components/BackgroundPaths.tsx';
import { TestimonialsSection } from "../components/testimonials-with-marquee";
import ContactInfoBox from '../components/ContactInfoBox.tsx';


const contactInfo = {
    email: "contact@arcrunning.com",
    location: "Helsinki, Finland",
    socialLinks: {
      instagram: "https://instagram.com/arcrunning",
      facebook: "https://facebook.com/arcrunning",
      strava: "https://strava.com/clubs/arcrunning"
    }
  };
  
// Mock user data - you would typically fetch this from an API
const users = [
    {
        name: 'John Doe',
        role: 'President',
        description: 'Leads the club with passion and dedication.',
        image: process.env.PUBLIC_URL + '/images/board/prof1.png',
    },
    {
        name: 'Jane Smith',
        role: 'Vice President',
        description: 'Supports the president and ensures smooth operations.',
        image: process.env.PUBLIC_URL + '/images/board/prof2.jpeg',
    },
    {
        name: 'Sam Johnson',
        role: 'Secretary',
        description: 'Manages club records and communications.',
        image: process.env.PUBLIC_URL + '/images/board/prof3.png',
    },
    {
        name: 'Alice Brown',
        role: 'Treasurer',
        description: 'Handles the club\'s finances and budgeting.',
        image: process.env.PUBLIC_URL + '/images/board/prof4.jpeg',
    },
];

// Add this after your existing users array
const testimonials = [
    {
      author: {
        name: "Emma Thompson",
        handle: "Marathon Runner",
        avatar: '/images/board/prof1.png'
      },
      text: "Being part of this running club has transformed my fitness journey. The community support is incredible!",
    },
    {
      author: {
        name: "David Park",
        handle: "5K Enthusiast",
        avatar: "/images/testimonials/runner2.jpg"
      },
      text: "The coaches here are fantastic. I've improved my personal best by 5 minutes since joining.",
    },
    {
      author: {
        name: "Sofia Rodriguez",
        handle: "Trail Runner",
        avatar: "/images/testimonials/runner3.jpg"
      },
      text: "From beginner to half-marathon runner - this club made it possible. Great community, great support!",
    }
  ];

const ContactPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [showAnimatedBackground, setShowAnimatedBackground] = useState(false);
    const heroRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);
    const scrollTimeout = useRef(null);
    
    // Debounced and throttled scroll handler for better performance
    const handleScroll = () => {
        // Only update state every 50ms for better performance
        if (!scrollTimeout.current) {
            scrollTimeout.current = setTimeout(() => {
                setScrollY(window.scrollY);
                setShowAnimatedBackground(window.scrollY > window.innerHeight * 0.5);
                scrollTimeout.current = null;
            }, 50);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
            }
        };
    }, []);

    // Memoize section progress calculations to prevent unnecessary recalculations
    const getSectionProgress = (ref, offset = 0) => {
        if (!ref.current) return 0;
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        return Math.min(1, Math.max(0, (viewportHeight - rect.top - offset) / (viewportHeight * 0.8)));
    };

    const heroProgress = getSectionProgress(heroRef);
    const teamProgress = getSectionProgress(teamRef, 100);
    const contactProgress = getSectionProgress(contactRef, 100);

    const navigateCarousel = (direction) => {
        if (direction === 'next') {
            setCurrentIndex((prev) => (prev + 1) % users.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + users.length) % users.length);
        }
    };

    // Use transform properties that don't trigger layout recalculation
    const willChange = useMemo(() => ({
        willChange: 'transform',
        transform: `translateZ(0)`
    }), []);

    return (
        <div className="contact-container">
            {/* Only render the animated background when needed */}
            {showAnimatedBackground && (
                <BackgroundPaths
                    teamRef={teamRef}
                    contactRef={contactRef}
                    teamProgress={teamProgress}
                    contactProgress={contactProgress}
                    users={users}
                    currentIndex={currentIndex}
                    navigateCarousel={navigateCarousel}
                    willChange={willChange}
                />
            )}

            {/* Hero Section - with optimized transforms */}
            <div
                ref={heroRef}
                className="contact-hero"
                style={{
                    backgroundImage: `url('/images/board/birds.jpg')`,
                    backgroundAttachment: 'fixed',
                    ...willChange,
                }}
            >
                <div className="contact-hero-overlay">
                    <h1
                        className="contact-hero-title"
                        style={{
                            transform: `translateY(${scrollY * 0.1}px)`,
                            opacity: 1 - Math.min(1, scrollY / 300),
                            ...willChange,
                        }}
                    >
                        MEET THE TEAM
                    </h1>
                    <div
                        className="contact-running-track"
                        style={{
                            width: `${80 + scrollY * 0.05}%`,
                            opacity: 1 - Math.min(1, scrollY / 400),
                            ...willChange,
                        }}
                    />
                </div>
            </div>

            {/* Team Section with reduced height to improve rendering */}
            <div ref={teamRef} className="min-h-[80vh]"></div>

            {/* Add the TestimonialsSection here */}
            <TestimonialsSection
                title="2025 Board Members"
                description="The backbone of our community, these individuals work tirelessly to ensure the success of our club."
                testimonials={testimonials}
                className="py-16 bg-gradient-to-b from-background to-muted/50"
            />

            {/* Replace the empty contact section */}
            <div ref={contactRef} className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <ContactInfoBox 
                contactInfo={contactInfo}
                className="w-full max-w-lg backdrop-blur-sm"
            />
            </div>
        </div>
    );
};

export default React.memo(ContactPage);