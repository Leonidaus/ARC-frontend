import { useState, useEffect } from "react";
import { preloadAllAssets } from "./util/assetPreloader";

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [realProgress, setRealProgress] = useState(0);
  const [startTime] = useState(Date.now());
  const MIN_DURATION = 2000;

  // List of all assets that need to be preloaded
  const allAssets = [
    // Homepage assets
    "/videos/IMG_6014.mp4",
    "/videos/running1.mp4",
    "/videos/running3.mp4",
    "/videos/running4.mp4",
    "/videos/running2.mp4",
    "/images/sponsors/hskk.png",
    "/images/sponsors/oikia.png",
    "/images/sponsors/teho.png",
    "/images/sponsors/vauhtisammakko.png",
    "/images/sponsors/zalando.png",
    "/images/features/feat1.png",
    "/images/features/feat2.png",
    "/images/features/feat3.png",
    // Add other page assets here if needed
  ];

  useEffect(() => {
    // Start preloading assets
    const preloadAssets = async () => {
      try {
        await preloadAllAssets(allAssets, (loaded, total) => {
          const calculatedProgress = Math.floor((loaded / total) * 100);
          setRealProgress(calculatedProgress);
        });
      } catch (error) {
        console.error("Preloading failed:", error);
      }
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    // Combine both animations - the smooth fill and the actual progress
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        // Use whichever is higher - the animation or actual progress
        const targetProgress = Math.max(
          oldProgress + 2, // Smooth animation increment
          realProgress    // Actual loading progress
        );
        
        const newProgress = Math.min(targetProgress, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, MIN_DURATION - elapsedTime);

          setTimeout(() => {
            if (onFinish) onFinish();
          }, remainingTime);
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [realProgress, onFinish, startTime]);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100vh",
      backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center",
      color: "white", zIndex: 9999
    }}>
      <svg width="120" height="120" viewBox="0 0 100 100" style={{ position: "absolute" }}>
        <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="6" fill="none" opacity="0.2" />
        <circle
          cx="50" cy="50" r="45"
          stroke="white" strokeWidth="6" fill="none"
          strokeDasharray="283"
          strokeDashoffset={`${283 - (progress / 100) * 283}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>

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