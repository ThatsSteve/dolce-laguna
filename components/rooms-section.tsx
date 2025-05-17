"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import Link from "next/link"
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import useIntersectionObserver from "../hooks/use-intersection-observer"

// Definizione dei tipi
interface Room {
  id: string
  name: string
  description: string
  price: string
  images: string[]
}

// Dati delle camere
const rooms: Room[] = [
  {
    id: "standard",
    name: "Camera Standard",
    description: "Comfort essenziale con vista sulla città",
    price: "da €80 a notte",
    images: ["/images/standard1.jpg", "/images/standard2.jpg", "/images/standard3.jpg"],
  },
  {
    id: "superior",
    name: "Camera Superior",
    description: "Spazio extra e vista panoramica",
    price: "da €120 a notte",
    images: ["/images/superior1.jpg", "/images/superior2.jpg", "/images/superior3.jpg"],
  },
  {
    id: "deluxe",
    name: "Camera Deluxe",
    description: "Lusso e raffinatezza in ogni dettaglio",
    price: "da €160 a notte",
    images: ["/images/deluxe1.jpg", "/images/deluxe2.jpg", "/images/deluxe3.jpg"],
  },
  {
    id: "family",
    name: "Suite Familiare",
    description: "Ampi spazi per tutta la famiglia",
    price: "da €200 a notte",
    images: ["/images/family1.jpg", "/images/family2.jpg", "/images/family3.jpg"],
  },
]

// Optimized Room Card component
const RoomCard = memo(({ room, activeSlide = 0, onSlideChange, autoplay = true }) => {
  const [isVisible, ref] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    freezeOnceVisible: false,
  })

  // Use ref instead of state for hover tracking to avoid re-renders
  const hoverRef = useRef(false)

  // Setup autoplay when component is visible
  useEffect(() => {
    if (!isVisible || !autoplay || hoverRef.current) return

    const intervalId = setInterval(() => {
      onSlideChange((activeSlide + 1) % room.images.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [isVisible, activeSlide, room.images.length, onSlideChange, autoplay])

  return (
    <div
      ref={ref}
      className="aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden shadow-xl relative"
      onMouseEnter={() => {
        hoverRef.current = true
      }}
      onMouseLeave={() => {
        hoverRef.current = false
      }}
    >
      {isVisible && (
        <>
          {room.images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 room-carousel-slide ${
                index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <OptimizedImage
                src={image || "/placeholder.svg"}
                alt={`${room.name} - Immagine ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform transition-transform duration-700 hover:scale-105"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              const prevSlide = (activeSlide - 1 + room.images.length) % room.images.length
              onSlideChange(prevSlide)
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Immagine precedente"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              const nextSlide = (activeSlide + 1) % room.images.length
              onSlideChange(nextSlide)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
            aria-label="Immagine successiva"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  onSlideChange(index)
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === activeSlide ? "bg-white w-4" : "bg-white/50"
                }`}
                aria-label={`Vai all'immagine ${index + 1}`}
              />
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-70"></div>
        </>
      )}
    </div>
  )
})

RoomCard.displayName = "RoomCard"

const RoomsSection = () => {
  const [activeRoom, setActiveRoom] = useState(0)
  const [activeSlides, setActiveSlides] = useState<Record<number, number>>({})
  const [isMobile, setIsMobile] = useState(false)

  // Optimize to avoid re-renders
  const changeActiveSlide = useCallback((roomIndex: number, slideIndex: number) => {
    setActiveSlides((prev) => ({ ...prev, [roomIndex]: slideIndex }))
  }, [])

  const changeRoom = useCallback((index: number) => {
    setActiveRoom(index)
  }, [])

  // Check mobile only once on mount and on resize
  useEffect(() => {
    const checkMobileSize = () => setIsMobile(window.innerWidth < 768)
    checkMobileSize()

    const resizeHandler = () => {
      checkMobileSize()
    }

    window.addEventListener("resize", resizeHandler, { passive: true })
    return () => window.removeEventListener("resize", resizeHandler)
  }, [])

  // Initialize active slides only once
  useEffect(() => {
    const initialSlides: Record<number, number> = {}
    rooms.forEach((_, index) => {
      initialSlides[index] = 0
    })
    setActiveSlides(initialSlides)
  }, [])

  return (
    <section id="camere" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mx-auto after:left-1/2 after:-translate-x-1/2 mb-12">
          Le Nostre Camere
        </h2>
        <p className="section-subtitle text-center max-w-3xl mx-auto mb-16">
          Scopri il comfort mediterraneo in ogni nostra camera, progettata per offrirti un'esperienza unica
        </p>

        {/* Selezione Camere Desktop */}
        <div className="hidden md:flex justify-center gap-4 mb-12">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => changeRoom(index)}
              className={`px-6 py-3 rounded-sm transition-all duration-300 ${
                activeRoom === index
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--tertiary)] text-[var(--text)] hover:bg-[var(--tertiary)]/80"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Selezione Camere Mobile */}
        <div className="md:hidden flex overflow-x-auto pb-4 gap-3 mb-8 scrollbar-hide">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => changeRoom(index)}
              className={`px-4 py-2 rounded-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeRoom === index
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--tertiary)] text-[var(--text)]"
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Visualizzazione Camera */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <RoomCard
            room={rooms[activeRoom]}
            activeSlide={activeSlides[activeRoom] || 0}
            onSlideChange={(slideIndex) => changeActiveSlide(activeRoom, slideIndex)}
          />

          {/* Informazioni Camera */}
          <div className="flex flex-col items-start space-y-6 p-4 md:p-8">
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-3xl md:text-4xl font-cinzel text-[var(--secondary)]">
                {rooms[activeRoom].name}
              </h3>

              <p className="text-lg md:text-xl font-light text-[var(--primary)] italic font-lora">
                {rooms[activeRoom].price}
              </p>

              <p className="text-base md:text-lg text-[var(--text)] leading-relaxed">
                {rooms[activeRoom].description}
              </p>

              <ul className="space-y-2 mt-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>Wi-Fi gratuito ad alta velocità</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>Aria condizionata con controllo individuale</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>TV a schermo piatto con canali internazionali</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary)]"></span>
                  <span>Colazione mediterranea inclusa</span>
                </li>
              </ul>
            </div>

            <Link href={`/camere#${rooms[activeRoom].id}`} className="btn-primary btn-hover-effect group mt-8">
              Scopri di più
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(RoomsSection)
