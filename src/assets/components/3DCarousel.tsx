"use client"

import React, { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query)
    return defaultValue
  })

  const handleChange = () => setMatches(getMatches(query))

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

interface KeywordData {
  keyword: string;
  title: string;
  description: string;
  imageUrl: string;
}

const keywordData: KeywordData[] = [
  {
    keyword: "night",
    title: "Urban Nightscape",
    description: "A breathtaking view of the city at night, with countless lights illuminating the urban landscape.",
    imageUrl: "/images/sponsors/teho.png"
  },
  {
    keyword: "city",
    title: "Metropolis View",
    description: "The bustling city center with modern architecture and busy streets full of life.",
    imageUrl: "/images/sponsors/vauhtisammakko.png"
  },
  {
    keyword: "sky",
    title: "Cloudy Skies",
    description: "A vast open sky with dramatic clouds creating a stunning natural canvas.",
    imageUrl: "/images/sponsors/hskk.png"
  },
  {
    keyword: "sunset",
    title: "Golden Hour",
    description: "The warm colors of sunset painting the horizon in hues of orange, pink, and purple.",
    imageUrl: "/images/sponsors/zalando.png"
  },
  {
    keyword: "sunrise",
    title: "Morning Light",
    description: "The first light of day breaking over the city, bringing new energy and possibilities.",
    imageUrl: "/images/sponsors/oikia.png"
  }
];

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    items,
    isCarouselActive,
  }: {
    handleClick: (item: KeywordData) => void
    controls: any
    items: KeywordData[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 1100 : 1800
    const faceCount = items.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    const requestRef = useRef<number | null>(null)
    const lastTimeRef = useRef<number>(0)
    const cooldownRef = useRef<NodeJS.Timeout | null>(null)
    const isPausedRef = useRef<boolean>(false)

    const animate = (time: number) => {
      if (!isPausedRef.current) {
        const delta = time - lastTimeRef.current
        lastTimeRef.current = time
        rotation.set(rotation.get() + (delta * 0.01)) // Adjust rotation speed here
      }
      requestRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
      lastTimeRef.current = performance.now()
      requestRef.current = requestAnimationFrame(animate)
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current)
      }
    }, [])

    const pauseRotation = () => {
      isPausedRef.current = true
      if (cooldownRef.current) clearTimeout(cooldownRef.current)
      cooldownRef.current = setTimeout(() => {
        isPausedRef.current = false
      }, 0.1)
    }

    return (
      <div className="relative h-full w-full">
        <div className="absolute top-4 left-0 right-0 z-10 flex justify-center"></div>
        <div
          className="flex h-full items-center justify-center bg-mauve-dark-2"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          } as React.CSSProperties}
        >
          <motion.div
            drag={isCarouselActive ? "x" : false}
            className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
            style={{
              transform: transform as unknown as React.CSSProperties["transform"],
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            
            onDrag={(_, info) => {
              if (isCarouselActive) {
                rotation.set(rotation.get() + info.offset.x * 0.05)
                pauseRotation()
              }
            }}
            onDragEnd={(_, info) => {
              if (isCarouselActive) {
                controls.start({
                  rotateY: rotation.get() + info.velocity.x * 0.05,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    mass: 0.1,
                  },
                })
                pauseRotation()
              }
            }}
            animate={controls}
          >
            {items.map((item, i) => (
              <motion.div
                key={`key-${item.keyword}-${i}`}
                className="absolute flex flex-col h-full origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-2"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
                } as React.CSSProperties}
                onClick={() => {
                  pauseRotation()
                  handleClick(item)
                }}
              >
                <motion.img
                  src={item.imageUrl}
                  alt={`${item.keyword} ${item.imageUrl}`}
                  layoutId={`img-${item.imageUrl}`}
                  className="pointer-events-none w-full rounded-xl object-contain aspect-square bg-transparent"
                  initial={{ filter: "blur(4px)" }}
                  layout="position"
                  animate={{ filter: "blur(0px)" }}
                  transition={transition}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel() {
  const [activeItem, setActiveItem] = useState<KeywordData | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  const handleClick = (item: KeywordData) => {
    setActiveItem(item)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveItem(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && handleClose()}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            style={{ willChange: "opacity", paddingTop: '80px' }}
            transition={transitionOverlay}
          >
            <motion.div
              layoutId={`img-container-${activeItem.imageUrl}`}
              className="bg-white rounded-xl max-w-5xl w-full max-h-[80vh] overflow-hidden flex flex-col md:flex-row"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <motion.img
                  layoutId={`img-${activeItem.imageUrl}`}
                  src={activeItem.imageUrl}
                  className="w-full h-full object-contain bg-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {activeItem.title}
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mb-6">{activeItem.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">Tags:</span>
                    <span className="bg-gray-100 px-2 py-1 rounded mr-2">
                      #{activeItem.keyword}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      #photography
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[500px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          items={keywordData}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel };
