import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Optimize floating paths rendering
function FloatingPaths({ position }) {
  const paths = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({  // Reduced from 36 to 20 paths
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      stroke: `rgba(255, 255, 255, ${0.05 + i * 0.02})`,
      width: 0.5 + i * 0.03,
    }));
  }, [position]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        preserveAspectRatio="none"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={path.width}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.4, 0.2], // Simplified animation
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 30 + Math.random() * 10, // Reduced randomness range
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Main component with optimizations
export function BackgroundPaths({
  teamRef,
  contactRef,
  teamProgress,
  contactProgress,
  users,
  currentIndex,
  navigateCarousel,
  willChange,
}) {
  // Memoize user data to prevent rerenders
  const currentUser = useMemo(() => users[currentIndex], [users, currentIndex]);
  
  // Use hardware acceleration for smooth animations
  const acceleratedStyle = useMemo(() => ({
    transform: "translate3d(0,0,0)",
    backfaceVisibility: "hidden",
    WebkitFontSmoothing: "subpixel-antialiased"
  }), []);

  return (
    <div className="fixed inset-0 z-0 bg-gray-900" style={acceleratedStyle}>
      {/* Reduce number of FloatingPaths components */}
      <FloatingPaths position={1} />

      {/* Team Section - optimized */}
      <motion.div
        ref={teamRef}
        className="relative z-10 py-20 min-h-screen"
        style={{
          opacity: teamProgress,
          transform: `translateY(${(1 - teamProgress) * 20}px)`,
          ...willChange,
        }}
        initial={false}
        animate={{opacity: teamProgress}}
        transition={{duration: 0.2}}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            OUR LEADERSHIP
          </h2>
          <p className="text-xl text-center mb-12 text-white/80">
            The pacesetters who keep our club moving forward
          </p>

          <div className="relative max-w-4xl mx-auto h-96">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-white text-4xl"
              onClick={() => navigateCarousel("prev")}
              aria-label="Previous team member"
            >
              &#8592;
            </button>

            <div className="relative h-full">
              {/* Only render the current user for better performance */}
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex flex-col items-center transition-all duration-500 ease-in-out opacity-100 scale-100"
                style={willChange}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white">
                  <img
                    src={currentUser.image}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{currentUser.name}</h3>
                  <p className="text-xl mb-4 text-primary-300">{currentUser.role}</p>
                  <p className="max-w-md">{currentUser.description}</p>
                </div>
              </motion.div>
            </div>

            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 text-white text-4xl"
              onClick={() => navigateCarousel("next")}
              aria-label="Next team member"
            >
              &#8594;
            </button>
          </div>
        </div>
      </motion.div>

      {/* Contact Section - optimized */}
      <motion.div
        ref={contactRef}
        className="relative z-10 py-20 min-h-screen"
        style={{
          opacity: contactProgress,
          transform: `translateY(${(1 - contactProgress) * 20}px)`,
          ...willChange,
        }}
        initial={false}
        animate={{opacity: contactProgress}}
        transition={{duration: 0.2}}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              JOIN THE PACK
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">✉️</span>
                <a
                  href="mailto:aaltorunclub@gmail.com"
                  className="text-lg text-gray-800 hover:text-primary-500 transition-colors"
                >
                  aaltorunclub@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-2xl">🏃‍♂️</span>
                <p className="text-lg text-gray-800">
                  Puumiehenkuja 5, Otaniemi
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-2xl">🕒</span>
                <p className="text-lg text-gray-800">
                  Weekly runs: Tuesday 6PM, Saturday 10AM
                </p>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              {["Instagram", "Strava", "Facebook"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                  aria-label={platform}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}