import { ThreeDPhotoCarousel } from "../components/3DCarousel.tsx";

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="h-screen bg-gray-100 pt-16 flex flex-col">
      {/* Header Section */}
      <div className="w-full py-8 px-4 text-center bg-white">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Our Sponsors</h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          We're grateful to partner with these amazing organizations that support our running community. Their contributions help us create better events and experiences for all our members.
        </p>
      </div>

      {/* Carousel Section */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="w-full max-w-4xl h-[400px] flex flex-col justify-center">
          <div className="p-2">
            <ThreeDPhotoCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreeDPhotoCarouselDemo;