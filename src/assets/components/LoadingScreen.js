import { useState, useEffect } from "react";

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100); // Fills every 100ms

    const timer = setTimeout(() => {
      clearInterval(interval);
      if (onFinish) onFinish();
    }, 2500); // Hide after 2 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onFinish]);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100vh",
      backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center",
      color: "white", zIndex: 9999
    }}>
      {/* Circular Progress Bar */}
      <svg width="120" height="120" viewBox="0 0 100 100" style={{ position: "absolute" }}>
        {/* Background Circle */}
        <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="6" fill="none" opacity="0.2" />
        {/* Progress Circle */}
        <circle
          cx="50" cy="50" r="45"
          stroke="white" strokeWidth="6" fill="none"
          strokeDasharray="283" // Circumference of circle (2 * π * r)
          strokeDashoffset={`${283 - (progress / 100) * 283}`} // Adjust fill
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>

      {/* ARC Logo */}
      <div style={{
        position: "absolute", fontSize: "1.5rem", fontWeight: "bold", textAlign: "center"
      }}>
        ARC
        <span style={{
          fontSize: "0.75rem", position: "relative", top: "-12px", marginLeft: "4px"
        }}>
          TM
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;
