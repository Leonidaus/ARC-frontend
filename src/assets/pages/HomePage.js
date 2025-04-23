import React, { useState, useEffect, useRef } from "react";
import { LogoCarousel } from "../components/logo-carousel.tsx";
import { GooeyText } from "../components/gradient-heading.tsx";
import { FeatureSteps } from "../components/feature-section.tsx";
import { Map, Users, Calendar } from "lucide-react";
import { GlowingEffect } from "../components/glowing-effect";
import HomePageMobile from "./HomePageMobile";

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

const GridItem = ({ icon, title, description }) => {
  return (
    <li className="min-h-[14rem] list-none">
      <div className="relative h-full rounded-[1.25rem] border border-white/10 p-2">
        <GlowingEffect
          spread={100}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-6 shadow-lg">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-white/20 bg-white/5 p-2 text-white">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-white">
                {title}
              </h3>
              <p className="text-sm text-white/80">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const logos = [
  { name: "Logo 1", id: 1, img: "/images/sponsors/hskk.png" },
  { name: "Logo 2", id: 2, img: "/images/sponsors/oikia.png" },
  { name: "Logo 2", id: 3, img: "/images/sponsors/teho.png" },
  { name: "Logo 2", id: 4, img: "/images/sponsors/vauhtisammakko.png" },
  { name: "Logo 2", id: 5, img: "/images/sponsors/zalando.png" },
]

// Add features data
const getStartedFeatures = [
  {
    step: "Connect",
    title: "Join the Community",
    content: "Connect with fellow runners and join local running groups.",
    image: "/images/features/feat1.png"
  },
  {
    step: "Train",
    title: "Start Training",
    content: "Access personalized training programs and track your progress.",
    image: "/images/features/feat2.png"
  },
  {
    step: "Compete",
    title: "Join Events",
    content: "Participate in events and challenge yourself with the community.",
    image: "/images/features/feat3.png"
  }
];

const VideoBackground = ({ src, opacity }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        transition: "opacity 1s ease-in-out",
        opacity,
        pointerEvents: "none",
      }}
    >
      <video
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        autoPlay
        loop
        muted
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const ContentBox = ({ title, text, backgroundColor, opacity, offsetX, children }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: `calc(50% + ${offsetX}px)`,
        transform: "translate(-50%, -50%)",
        width: "80%",
        padding: "20px",
        backgroundColor,
        color: "white",
        textAlign: "center",
        borderRadius: "10px",
        transition: "opacity 1s ease-in-out, background-color 1s ease-in-out, left 1s ease-in-out",
        opacity,
      }}
    >
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  );
};


const RunningBackground = () => {

  const isMobile = useIsMobile();
  

  // State to manage the current scene index
  const [sceneIndex, setSceneIndex] = useState(0);
  const totalScenes = 4;
  const offsetAmount = 100;
  const scrollCooldown = 1500;
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = (event) => {
      const now = Date.now();
      if (now - lastScrollTimeRef.current < scrollCooldown) return;
      lastScrollTimeRef.current = now;

      setSceneIndex((prevIndex) => {
        let newIndex = prevIndex;
        if (event.deltaY > 0) {
          newIndex = Math.min(prevIndex + 1, totalScenes - 1);
        } else {
          newIndex = Math.max(prevIndex - 1, 0);
        }
        return newIndex;
      });
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isMobile]);

  if (isMobile) {
    return <HomePageMobile
    logos={logos}
    getStartedFeatures={getStartedFeatures}
    GridItem={GridItem}
    />;
  }

  const scenes = [
      {
        video: "/videos/IMG_6014.mp4",
        title: "",
        text: "",
        bg: "rgba(0, 0, 0, 0)",
        component: () => <GooeyText
          texts={["The", "Future", "Of", "Running", "Is", "Here", "ARC", "", ""]}
          morphTime={1}
          cooldownTime={0.25}
          className="font-bold"
        />,
      },
      {
        video: "/videos/running1.mp4",
        title: "",
        text: "",
        bg: "rgba(50, 50, 50, 0)",
        component: () => (
          <div className="w-full max-w-6xl mt-6">
            <FeatureSteps 
              features={getStartedFeatures}
              title="WHAT IS ARC?"
              autoPlayInterval={4000}
              imageHeight="h-[300px]"
              className="bg-transparent text-white"
            />
          </div>
        ),
      },
      {
        video: "/videos/running4.mp4",
        title: "",
        text: "",
        bg: "rgba(0, 0, 0, 0)",
        component: () => (
          <div className="w-full max-w-6xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <GridItem
                icon={<Map className="h-6 w-6" />}
                title="Local Routes"
                description="Discover the best running routes in your area, from scenic trails to urban adventures."
              />
              <GridItem
                icon={<Users className="h-6 w-6" />}
                title="Running Groups"
                description="Join running groups that match your pace and schedule. Train together, grow together."
              />
              <GridItem
                icon={<Calendar className="h-6 w-6" />}
                title="Events"
                description="Participate in local running events, marathons, and community challenges."
              />
            </ul>
          </div>
        ),
      },
      {
        video: "/videos/running3.mp4",
        title: "",
        text: "",
        bg: "rgba(150, 150, 150, 0)",
        component: () => (
          <div className="w-full flex items-center justify-center"> {/* Added flex container */}
            <div className="w-full max-w-4xl"> {/* Increased max-width and removed mt-6 */}
              <LogoCarousel logos={logos} columnCount={4} />
            </div>
          </div>
        ),
      },
    ];
  

  return (
    <div style={{ height: "100vh", background: "black", position: "relative", overflow: "hidden" }}>
      {scenes.map((scene, index) => (
        <VideoBackground key={index} src={scene.video} opacity={1 - Math.abs(sceneIndex - index)} />
      ))}

      {scenes.map((scene, index) => {
        const distanceFromActive = sceneIndex - index;
        const offsetX = offsetAmount * distanceFromActive;
        const Component = scene.component;

        return (
          <ContentBox
            key={index}
            title={scene.title}
            text={scene.text}
            backgroundColor={scene.bg}
            opacity={1 - Math.abs(distanceFromActive)}
            offsetX={offsetX}
          >
            {Component && sceneIndex === index && <Component />}
          </ContentBox>
        );
      })}

    </div>
  );
};

export default RunningBackground;
