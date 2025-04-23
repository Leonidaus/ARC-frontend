import React from "react";
import { GooeyText } from "../components/gradient-heading.tsx";
import { FeatureSteps } from "../components/feature-section.tsx";
import { Map, Users, Calendar } from "lucide-react";
import { LogoCarousel } from "../components/logo-carousel.tsx";

const HomePageMobile = ({ logos, getStartedFeatures, GridItem }) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-4">
        <GooeyText
          texts={["The", "Future", "Of", "Running", "Is", "Here", "ARC"]}
          morphTime={1}
          cooldownTime={0.25}
          className="font-bold text-3xl"
        />
      </section>

      {/* Features Section */}
      <section className="min-h-screen p-4">
        <FeatureSteps 
          features={getStartedFeatures}
          title="WHAT IS ARC?"
          autoPlayInterval={4000}
          imageHeight="h-[200px]"
          className="bg-transparent text-white"
        />
      </section>

      {/* Grid Items Section */}
      <section className="min-h-screen p-4">
        <ul className="grid grid-cols-1 gap-6">
          <GridItem
            icon={<Map className="h-6 w-6" />}
            title="Local Routes"
            description="Discover the best running routes in your area."
          />
          <GridItem
            icon={<Users className="h-6 w-6" />}
            title="Running Groups"
            description="Join running groups that match your pace."
          />
          <GridItem
            icon={<Calendar className="h-6 w-6" />}
            title="Events"
            description="Participate in local running events."
          />
        </ul>
      </section>

      {/* Sponsors Section - Updated */}
      <section className="min-h-screen p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md"> {/* Added container with max-width */}
          <h2 className="text-center text-xl font-bold mb-8">OUR PARTNERS</h2>
          <LogoCarousel 
            logos={logos} 
            columnCount={4} 
            className="mx-auto" // Added mx-auto for centering
          />
        </div>
      </section>
    </div>
  );
};

export default HomePageMobile;