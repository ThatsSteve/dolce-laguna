"use client"

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, MapPin, Phone, Mail, Star, Clock, Users, Heart, X, Copy } from "lucide-react"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "../components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "../components/ui/use-toast"
import OptimizedImage from "../components/optimized-image"
import useIntersectionObserver from "../hooks/use-intersection-observer"
import ScrollManager from "../components/scroll-manager"
import { useI18n } from "../context/i18n-context"

// Componente memo per il carosello delle immagini principali
const CarouselImage = memo(({ image, defaultImage, isActive, index }: {
  image: string;
  defaultImage: string;
  isActive: boolean;
  index: number;
}) => {
  const imageSrc = useMemo(() => image || defaultImage, [image, defaultImage]);
  
  return (
    <div
      className="absolute inset-0"
      style={{ 
        opacity: isActive ? 1 : 0,
        transition: "opacity 1.2s ease-in-out",
        zIndex: isActive ? 1 : 0 
      }}
    >
      <OptimizedImage 
        src={imageSrc}
        alt={`Dolce Laguna - Immagine ${index + 1}`}
        fill
        priority={index === 0}
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay con effetto più sofisticato */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive && 
         prevProps.image === nextProps.image && 
         prevProps.index === nextProps.index;
});

CarouselImage.displayName = 'CarouselImage';

interface Review {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
  source: string;
}

// Ottimizzazione di ReviewCard per risolvere l'errore React
const ReviewCard = memo(({ review, isActive, expandedReview, toggleReviewExpansion }: {
  review: Review;
  isActive: boolean;
  expandedReview: string | null;
  toggleReviewExpansion: (reviewId: string) => void;
}) => {
  // Se non è attivo, ritorna null per evitare rendering non necessari
  if (!isActive) return null;
  
  // Utilizzo useRef per controllare l'altezza del testo
  const textRef = useRef<HTMLDivElement>(null);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  
  // Verifica se il testo necessita di espansione quando il componente viene montato
  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      // Se l'altezza del contenuto è maggiore dell'altezza visibile, allora serve espansione
      setNeedsExpansion(el.scrollHeight > el.clientHeight);
    }
  }, [review.id]);
  
  return (
    <motion.div
      key={review.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 p-6 flex flex-col"
    >
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-[#b06939]/20 flex items-center justify-center text-[#b06939] font-bold text-sm">
          {review.author_name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0 ml-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-[#942e2f] text-sm md:text-base truncate">{review.author_name}</h3>
            <span className="text-xs text-gray-500 flex items-center ml-2">
              <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs">
                {review.source}
              </span>
            </span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                viewBox="0 0 24 24" 
                width="14" 
                height="14" 
                fill={i < review.rating ? "#FABB05" : "#E0E0E0"}
                className="mr-0.5"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">{review.relative_time_description}</span>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-hidden pb-12">
        {/* Recensione con possibilità di espansione */}
        <div 
          ref={textRef}
          className={`text-[#942e2f]/80 leading-snug text-sm md:text-base ${expandedReview === review.id ? '' : 'line-clamp-5'} cursor-pointer`}
          onClick={() => toggleReviewExpansion(review.id)}
        >
          "{review.text}"
        </div>
        {needsExpansion && (
          <div className="text-center mt-2">
            <button 
              className="text-xs text-[#b06939] hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                toggleReviewExpansion(review.id);
              }}
            >
              {expandedReview === review.id ? "Mostra meno" : "Leggi tutto"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  // Implementazione di shouldComponentUpdate personalizzata
  if (prevProps.isActive !== nextProps.isActive) {
    return false; // Re-renderizza se isActive è cambiato
  }
  if (prevProps.isActive && nextProps.isActive) {
    // Solo se entrambi sono attivi, controlla anche altre prop
    return prevProps.expandedReview === nextProps.expandedReview;
  }
  return true; // Non re-renderizzare altri casi
});

ReviewCard.displayName = 'ReviewCard';

// Optimize section components with lazy loading
const LazySection = ({ children, id, className }: {
  children: React.ReactNode;
  id: string;
  className: string;
}) => {
  const [isVisible, ref] = useIntersectionObserver({
    rootMargin: '200px',
    freezeOnceVisible: true
  });
  
  return (
    <section ref={ref} id={id} className={className}>
      {isVisible && children}
    </section>
  );
};

LazySection.displayName = 'LazySection';

// Aggiungo un componente separato per il popup
const FeaturePopup = memo(({ feature, index }: { feature: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 } 
          }}
        >
          <div className="p-6">
            <div className="w-14 h-14 rounded-full bg-[#fcf8f3] flex items-center justify-center mb-5">
              <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
            </div>
            <h3 className="text-xl font-bold text-[#942e2f] mb-3">{feature.title}</h3>
            <p className="text-[#942e2f]/80 mb-4">{feature.description.substring(0, 100)}...</p>
            <div className="flex items-center text-[#b06939] mt-2">
              <span className="text-sm font-medium">Scopri di più</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 rounded-2xl overflow-hidden border-none shadow-2xl bg-gradient-to-b from-white to-[#f8f6f2]">
        <DialogHeader>
          <DialogTitle className="sr-only">{feature.title}</DialogTitle>
        </DialogHeader>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full" style={{ backgroundColor: `${feature.color}30` }}>
              <feature.icon className="h-6 w-6 m-3" style={{ color: feature.color }} />
            </div>
            <h2 className="text-2xl font-bold text-[#942e2f]">{feature.title}</h2>
          </div>
          
          <p className="text-[#942e2f]/80 mb-6 leading-relaxed">{feature.description}</p>
          
          <div className="mt-8">
            {feature.id === "location" && (
              <Link href="/contatti#mappa">
                <Button className="w-full bg-[#b06939] hover:bg-[#9e3432] text-white py-2 relative rounded-lg">
                  Visualizza la mappa
                </Button>
              </Link>
            )}
            
            {feature.id === "comfort" && (
              <Link href="/camere">
                <Button className="w-full bg-[#9e3432] hover:bg-[#b06939] text-white py-2 relative rounded-lg">
                  Scopri le nostre camere
                </Button>
              </Link>
            )}
            
            {feature.id === "breakfast" && (
              <Link href="/servizi#breakfast">
                <Button className="w-full bg-[rgba(232,151,0,1)] hover:bg-[#b06939] text-white py-2 relative rounded-lg">
                  Vedi i nostri servizi
                </Button>
              </Link>
            )}
            
            {feature.id === "service" && (
              <Link href="/servizi">
                <Button className="w-full bg-[#9ccce4] hover:bg-[#9e3432] text-white py-2 relative rounded-lg">
                  Esplora i nostri servizi
                </Button>
              </Link>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <DialogClose className="text-[#942e2f]/60 hover:text-[#942e2f] text-sm underline">
              Chiudi
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

FeaturePopup.displayName = 'FeaturePopup';

export default function Home() {
  // State for carousel
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState("dolcelaguna1")
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { toast } = useToast()
  
  // State for reviews carousel with auto-scroll
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Reference per heroRef
  const heroRef = useRef<HTMLElement>(null);
  
  // Use refs instead of state for scroll handling
  const scrollDirection = useRef('none');
  const lastScrollTop = useRef(0);
  
  // Definizione delle immagini per il carosello
  const images = useMemo(() => {
    return [
      "/images/Homepage/Carosello_inizio/Inizio (1).jpg",
      "/images/Homepage/Carosello_inizio/Inizio (2).jpg",
      "/images/Homepage/Carosello_inizio/Inizio (3).jpg",
      "/images/Homepage/Carosello_inizio/Inizio (4).jpg",
      "/images/Homepage/Carosello_inizio/Inizio (5).jpg",
    ].filter((img) => img && img.trim() !== "")
  }, []);
  
  // Nota: in produzione, questo dovrebbe essere sostituito con una vera chiamata API
  const reviews = useMemo(() => [
    {
      id: "review1",
      author_name: "Alberto151270",
      profile_photo_url: "",
      rating: 5,
      text: "Oltre a essere vicino all'aeroporto e ai collegamenti per Venezia ho trovato una struttura elegante attenta ai dettagli ma soprattutto voglio fare i complimenti per la pulizia delle camere ottimo lavoro davvero complimenti ci ritornerò sicuramente",
      relative_time_description: "2 mesi fa",
      source: "Google"
    },
    {
      id: "review2",
      author_name: "Marika P",
      profile_photo_url: "",
      rating: 5,
      text: "È stata una sorpresa. Non mi aspettavo tanta organizzazione con poco personale, camere pulitissime, ordinatissime. Arredamento da hotel 4 stelle super. Veramente complimenti ai gestori. Pensino in parcheggio auto a disposizione. Tutto impeccabile.",
      relative_time_description: "1 mese fa",
      source: "TripAdvisor"
    },
    {
      id: "review3",
      author_name: "Utente anonimo",
      profile_photo_url: "",
      rating: 4,
      text: "Abbiamo scelto Dolce Laguna per la sua vicinanza all'aeroporto Marco Polo e quale modo fantastico di terminare la nostra vacanza. Questo posto è un gioiello, arredato con gusto, moderno e perfettamente pulito. Uno spazio tranquillo e rilassante per distendersi, nonostante la vicinanza all'aeroporto. Bella fetta di vita locale, in una stradina tranquilla e circondata da campi verdi.",
      relative_time_description: "3 settimane fa",
      source: "Google"
    },
    {
      id: "review4",
      author_name: "Mark",
      profile_photo_url: "",
      rating: 5,
      text: "Durante un recente viaggio a Venezia, ho preso la decisione di dormire fuori città, ma molto vicino e proprio vicino all'aeroporto. Dal momento in cui ho effettuato la prenotazione e per tutta la durata del mio soggiorno, questa è stata una delle esperienze più piacevoli del viaggio. Lo staff, in particolare la signora Eugenia, era di prima classe, i giardini immacolati e il quartiere affascinante.",
      relative_time_description: "2 mesi fa",
      source: "TripAdvisor"
    },
  ], []);
  
  const totalReviews = reviews.length;
  
  // Fallback image
  const defaultImage = "/images/Homepage/Carosello_inizio/Inizio (1).jpg"
  
  // Optimize scroll handler with throttle
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine scroll direction without state updates
    if (currentScrollTop > lastScrollTop.current) {
      scrollDirection.current = 'down';
    } else {
      scrollDirection.current = 'up';
    }
    
    // Only update state if the header visibility should change
    if (currentScrollY > 100) {
      const shouldShowHeader = scrollDirection.current === 'up';
      if (isHeaderVisible !== shouldShowHeader) {
        setIsHeaderVisible(shouldShowHeader);
      }
    } else if (!isHeaderVisible) {
      setIsHeaderVisible(true);
    }
    
    lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
    setLastScrollY(currentScrollY);
  }, [isHeaderVisible]);

  // Check if device is mobile - optimized
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    
    const updateIsMobile = () => setIsMobile(mobileQuery.matches);
    updateIsMobile();
    
    mobileQuery.addEventListener('change', updateIsMobile);
    return () => mobileQuery.removeEventListener('change', updateIsMobile);
  }, []);

  // Optimize scroll listener
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    
    const throttledScroll = () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          handleScroll();
          scrollTimer = null;
        }, 100);
      }
    };
    
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  // Optimize image carousel to prevent unnecessary re-renders
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 8000);
    
    return () => clearInterval(timer);
  }, [isLoaded, images.length]);

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Auto-scroll effect for reviews
  useEffect(() => {
    if (!isLoaded || expandedReview !== null || isPaused) return;
    
    const timer = setInterval(() => {
      setCurrentReviewIndex(prev => (prev + 1) % totalReviews);
    }, 6000);
    
    return () => clearInterval(timer);
  }, [isLoaded, totalReviews, expandedReview, isPaused]);

  // Definizione dei features
  const features = useMemo(() => [
    {
      id: "location",
      title: "Posizione Strategica",
      icon: MapPin,
      description:
        "Situato in una posizione ideale, a soli 15 minuti da Piazzale Roma, l'entrata principale di Venezia, e facilmente raggiungibile con i mezzi pubblici. La nostra struttura offre un perfetto equilibrio tra la tranquillità di una zona residenziale e la vicinanza alle principali attrazioni turistiche.",
      color: "#b06939",
    },
    {
      id: "comfort",
      title: "Comfort Mediterraneo",
      icon: Star,
      description:
        "Le nostre camere sono arredate con gusto in stile mediterraneo-veneziano, combinando elementi tradizionali con comfort moderni. Ogni spazio è stato progettato per offrire un'esperienza di soggiorno rilassante e piacevole, con attenzione ai dettagli e materiali di qualità.",
      color: "#9e3432",
    },
    {
      id: "breakfast",
      title: "Area Ristoro",
      icon: Clock,
      description:
        "La nostra area ristoro è ben fornita con una selezione di prodotti confezionati dolci e salati, accompagnati da un'ampia scelta di bevande calde come tè, tisane e caffè. Un'area accogliente dove iniziare la giornata con gusto e comodità.",
      color: "rgba(232,151,0,255)",
    },
    {
      id: "service",
      title: "Servizio Personalizzato",
      icon: Heart,
      description:
        "Il nostro staff multilingue è sempre a disposizione per rendere il vostro soggiorno indimenticabile. Offriamo consigli personalizzati su itinerari, ristoranti e attrazioni locali, oltre a servizi su misura per soddisfare le vostre esigenze specifiche durante la permanenza.",
      color: "#9ccce4",
    },
  ], []);
  
  // Dati delle camere per Dolce Laguna 1
  const dolceLaguna1Rooms = useMemo(() => [
    {
      id: "bludeluxe",
      name: "Camera Tripla",
      description: "Comfort essenziale con vista sulla città in stile retrò elegante mediterraneo.",
      image: "/images/Homepage/DL1/Bludeluxe.jpg"
    },
    {
      id: "double",
      name: "Camere Doppie",
      description: "Spazi confortevoli con design mediterraneo, disponibili in diverse varianti.",
      image: "/images/Homepage/DL1/Marrone.jpg"
    }
  ].map((room) => ({
    ...room,
    image: room.image && room.image.trim() !== "" ? room.image : defaultImage,
  })), [defaultImage]);

  // Dati delle camere per Dolce Laguna 2
  const dolceLaguna2Rooms = useMemo(() => [
    {
      id: "azzurra",
      name: "Camera Singola",
      description: "Design contemporaneo con elementi eleganti e comfort moderni.",
      image: "/images/Homepage/DL2/Azzurra.jpg"
    },
    {
      id: "double",
      name: "Camere Doppie",
      description: "Spazi ampi con design moderno e finiture di pregio.",
      image: "/images/Homepage/DL2/Blu.jpg"
    },
    {
      id: "suite",
      name: "Camera Quadrupla",
      description: "Il massimo del comfort con design contemporaneo e tecnologia all'avanguardia.",
      image: "/images/Homepage/DL2/Suite.jpg"
    }
  ].map((room) => ({
    ...room,
    image: room.image && room.image.trim() !== "" ? room.image : defaultImage,
  })), [defaultImage]);
  
  // Funzioni per navigare manualmente tra le recensioni
  const goToNextReview = useCallback(() => {
    setExpandedReview(null);
    setCurrentReviewIndex((prev) => (prev + 1) % totalReviews);
    // Pausa temporanea dello scorrimento automatico dopo interazione manuale
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [totalReviews]);

  const goToPrevReview = useCallback(() => {
    setExpandedReview(null);
    setCurrentReviewIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
    // Pausa temporanea dello scorrimento automatico dopo interazione manuale
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  }, [totalReviews]);
  
  // Funzione per espandere/contrarre una recensione
  const toggleReviewExpansion = useCallback((reviewId: string) => {
    setExpandedReview(prev => prev === reviewId ? null : reviewId);
    // Pausa lo scorrimento automatico quando l'utente espande una recensione
    setIsPaused(true);
    if (expandedReview === reviewId) {
      // Se stiamo contraendo la recensione, riprendi lo scorrimento dopo un po'
      setTimeout(() => setIsPaused(false), 3000);
    }
  }, [expandedReview]);

  // Funzioni per copiare l'indirizzo negli appunti
  const copyAddressToClipboard = useCallback(() => {
    navigator.clipboard.writeText("Via Alessandria 41/b - 30173, Venezia, Italia").then(() => {
      toast({
        title: "Indirizzo copiato!",
        description: "L'indirizzo è stato copiato negli appunti",
        duration: 3000,
      });
    });
  }, [toast]);

  // Varianti di animazione per Framer Motion
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 } 
    }
  };
  
  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardHoverVariants = {
    initial: { y: 0, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
    hover: { 
      y: -5,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 } 
    }
  };

  // Memoize carousel indicators
  const carouselIndicators = useMemo(() => {
    return (
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className="h-2 rounded-full bg-white transition-all duration-500"
            style={{ 
              width: currentImageIndex % images.length === i ? "2rem" : "0.5rem",
              opacity: currentImageIndex % images.length === i ? 1 : 0.4
            }}
            onClick={() => setCurrentImageIndex(i)}
            aria-label={`Vai all'immagine ${i + 1}`}
          />
        ))}
      </div>
    );
  }, [images, currentImageIndex]);

  return (
    <ScrollManager>
      <div className="flex min-h-screen flex-col bg-white">
        {/* Header with wow effect */}
        {/* Nessun header qui, utilizziamo solo quello importato da components/header.tsx */}

        <main className="flex-1">
          {/* Hero Section with advanced effects - Ripristinato a tutto schermo con animazioni */}
          <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
            {/* Parallax Background Layers */}
            <div className="absolute inset-0 z-0">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <CarouselImage 
                    key={`carousel-${index}`}
                    image={image}
                    defaultImage={defaultImage}
                    isActive={index === currentImageIndex % images.length}
                    index={index}
                  />
                ))
              ) : (
                // Fallback se non ci sono immagini
                <div className="absolute inset-0 bg-gray-200">
                  <OptimizedImage
                    src={defaultImage}
                    alt="Dolce Laguna"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
                </div>
              )}

              {/* Indicators */}
              {images.length > 1 && carouselIndicators}
            </div>

            {/* Hero content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
              <div className="relative">
                {/* Decorative line - RIMOSSA come richiesto */}

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative text-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <span className="relative inline-block">
                    <span className="relative z-10">Dolce Laguna</span>
                    <motion.span 
                      className="absolute -bottom-2 left-0 h-1 bg-[rgba(232,151,0,1)] w-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    ></motion.span>
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-white max-wxl text-shadow-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Un'esperienza di soggiorno unica che unisce il fascino veneziano al comfort moderno, in posizione strategica vicino a Venezia e all'aeroporto
                </motion.p>

                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <Link href="/prenota" className="relative">
                        <div className="button-container relative inline-block overflow-hidden rounded-lg">
                          <Button className="bg-[rgba(232,151,0,1)] hover:bg-[#b06939] text-white px-8 py-6 text-lg relative z-10 rounded-lg shadow-lg">
                            <span>Prenota Ora</span>
                          </Button>
                          <div className="shiny-overlay absolute inset-0 pointer-events-none"></div>
                        </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Chi Siamo (About Us) Section - con animazioni */}
          <LazySection id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                <motion.div 
                  className="relative z-10"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div 
                    className="h-1 bg-[#9ccce4] mb-6 w-[100px]"
                    initial={{ width: 0 }}
                    whileInView={{ width: 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-[#b06939] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Chi Siamo
                  </motion.h2>
                  <motion.p 
                    className="text-lg text-[#942e2f]/80 mb-6 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Dolce Laguna nasce dalla trasformazione di due eleganti complessi residenziali in accoglienti bed & breakfast, dove l'ospitalità si fonde con il comfort moderno. La nostra posizione strategica, a soli 5 minuti dall'aeroporto Marco Polo e a 15 minuti dal centro storico di Venezia, ci rende il punto di partenza ideale per esplorare la città lagunare e le meraviglie della terraferma.
                  </motion.p>
                  <motion.p 
                    className="text-lg text-[#942e2f]/80 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Il nostro staff multilingue garantisce un'esperienza di soggiorno personalizzata, con flessibilità negli orari di check-in e check-out. Gli ambienti, arredati in stile mediterraneo-veneziano, combinano eleganza e calore per offrirvi un perfetto equilibrio tra comodità, comfort e accessibilità, sia per viaggi d'affari che per vacanze.
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {[
                      { icon: Users, text: "Staff multilingue" },
                      { icon: Star, text: "Eccellenza TripAdvisor" },
                      { icon: MapPin, text: "Posizione strategica" },
                    ].map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      >
                        <motion.div 
                          className="w-10 h-10 rounded-full bg-[#9ccce4]/20 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className="h-5 w-5 text-[#9ccce4]" />
                        </motion.div>
                        <span className="text-[#942e2f]">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-lg">
                    <OptimizedImage 
                      src="/images/Homepage/019.jpg"
                      alt="La nostra struttura"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </LazySection>

          {/* Perché Sceglierci Section - Sezione ripristinata con popup */}
          <LazySection id="why-us" className="py-16 md:py-24 bg-[#f9f7f4] relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.div 
                  className="h-1 bg-[#9ccce4] mb-6 mx-auto w-[100px]"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 100, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-[#942e2f]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Perché Sceglierci
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <FeaturePopup key={feature.id} feature={feature} index={index} />
                ))}
              </div>
            </div>
          </LazySection>

          {/* Quality Approved Section - Ottimizzata per mobile e più compatta */}
          <LazySection id="reviews" className="py-10 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-6">
                <motion.div 
                  className="h-1 bg-[#9e3432] mb-4 mx-auto w-[60px]"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 60, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-[#942e2f]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Qualità Approvata
                </motion.h2>
                <motion.p 
                  className="mt-2 text-base md:text-lg text-[#942e2f]/70"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Le opinioni dei nostri ospiti parlano da sole, come testimonia il nostro Certificato di Eccellenza TripAdvisor 2019
                </motion.p>
              </div>

              {/* Layout riprogettato - recensioni e certificato affiancati */}
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Certificato TripAdvisor */}
                  <motion.div 
                    className="relative h-[280px] md:h-[250px]"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Image
                      src="/images/Homepage/Certificato Tripadvisor 2019 DL.png"
                      alt="Certificato di Eccellenza TripAdvisor 2019"
                      fill
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Reviews carousel */}
                  <div className="relative h-[280px] md:h-[250px] rounded-lg bg-[#f9f7f4] shadow-md overflow-hidden mb-6"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => {
                      if (expandedReview === null) {
                        setIsPaused(false);
                      }
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {reviews.map((review, index) => (
                        <ReviewCard
                          key={review.id}
                          review={review}
                          isActive={index === currentReviewIndex}
                          expandedReview={expandedReview}
                          toggleReviewExpansion={toggleReviewExpansion}
                        />
                      ))}
                    </AnimatePresence>
                    
                    {/* Navigation controls */}
                    <div className="absolute left-0 right-0 bottom-2 flex justify-between px-4 z-20">
                      <div className="flex gap-1">
                        {reviews.map((_, i) => (
                          <button
                            key={`review-indicator-${i}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === currentReviewIndex ? "w-5 bg-[#b06939]" : "w-1.5 bg-[#b06939]/30"
                            }`}
                            onClick={() => {
                              setExpandedReview(null);
                              setCurrentReviewIndex(i);
                              setIsPaused(true);
                              setTimeout(() => setIsPaused(false), 10000);
                            }}
                            aria-label={`Vai alla recensione ${i + 1}`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={goToPrevReview}
                          className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                          aria-label="Recensione precedente"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#942e2f]">
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                        <button
                          onClick={goToNextReview}
                          className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                          aria-label="Recensione successiva"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#942e2f]">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Link per tutte le recensioni - Centrato sotto le recensioni */}
                <div className="text-center mt-6">
                  <a 
                    href="https://www.tripadvisor.it/Hotel_Review-g1095736-d11620676-Reviews-Dolce_Laguna-Tessera_Veneto.html" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#942e2f] hover:text-[#b06939] text-sm font-medium border-b border-[#942e2f] hover:border-[#b06939] pb-0.5 transition-colors inline-block"
                  >
                    Leggi tutte le recensioni
                  </a>
                </div>
              </div>
            </div>
          </LazySection>

          {/* Rooms Section - Modificata con due strutture */}
          <LazySection id="rooms" className="py-16 md:py-24 bg-[#f0e9e4] relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <motion.div 
                  className="h-1 bg-[#9ccce4] mb-6 mx-auto w-[100px]"
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 100, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-[#942e2f]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Le Nostre Camere
                </motion.h2>
                <motion.p 
                  className="mt-4 text-lg text-[#942e2f]/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Scopri le nostre due strutture, ognuna con il proprio stile distintivo
                </motion.p>
              </div>

              <div className="mb-12">
                <motion.div 
                  className="flex flex-col items-center justify-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="inline-flex rounded-md p-1 bg-[#decebe]/30 backdrop-blur-sm shadow-inner scale-120 transform">
                    <button
                      onClick={() => setActiveTab("dolcelaguna1")}
                      className={`px-8 py-4 rounded-lg transition-all duration-300 relative text-lg ${
                        activeTab === "dolcelaguna1"
                          ? "bg-[#b06939] text-white shadow-md"
                          : "bg-transparent text-[#942e2f]/70 hover:text-[#942e2f]"
                      }`}
                    >
                      <span className="relative z-10 font-serif">Dolce Laguna 1</span>
                      {activeTab === "dolcelaguna1" && (
                        <div className="absolute inset-0 bg-[#b06939] rounded-lg" style={{ zIndex: 0 }} />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("dolcelaguna2")}
                      className={`px-8 py-4 rounded-lg transition-all duration-300 relative text-lg ${
                        activeTab === "dolcelaguna2"
                          ? "bg-[#9e3432] text-white shadow-md"
                          : "bg-transparent text-[#942e2f]/70 hover:text-[#942e2f]"
                      }`}
                    >
                      <span className="relative z-10 font-serif">Dolce Laguna 2</span>
                      {activeTab === "dolcelaguna2" && (
                        <div className="absolute inset-0 bg-[#9e3432] rounded-lg" style={{ zIndex: 0 }} />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Camera tabs content */}
                <div className="mt-8">
                  {/* Dolce Laguna 1 */}
                  <div className={`${activeTab === "dolcelaguna1" ? "block" : "hidden"}`}>
                    <div className="flex flex-wrap justify-center gap-6">
                      {dolceLaguna1Rooms.map((room, index) => (
                        <motion.div
                          key={`dl1-${index}`}
                          className="w-full md:w-[45%] lg:w-[30%] bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300"
                          initial="initial"
                          whileInView={{
                            opacity: [0, 1],
                            y: [50, 0],
                            transition: { duration: 0.6, delay: 0.1 * index }
                          }}
                          viewport={{ once: true }}
                        >
                          <Link href={`/camere#${room.id}`}>
                            <div className="relative h-56 overflow-hidden">
                              <OptimizedImage
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                                <div className="flex items-end justify-between">
                                  <h3 className="text-xl font-bold text-white">{room.name}</h3>
                                </div>
                              </div>
                            </div>
                          </Link>
                          
                          <div className="p-4">
                            <p className="text-[#942e2f]/80 mb-3">{room.description}</p>
                            <Link href="/camere" className="text-[#b06939] hover:text-[#942e2f] text-sm underline inline-block">
                              Visita la camera
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dolce Laguna 2 */}
                  <div className={`${activeTab === "dolcelaguna2" ? "block" : "hidden"}`}>
                    <div className="flex flex-wrap justify-center gap-6">
                      {dolceLaguna2Rooms.map((room, index) => (
                        <motion.div
                          key={`dl2-${index}`}
                          className="w-full md:w-[45%] lg:w-[30%] bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300"
                          initial="initial"
                          whileInView={{
                            opacity: [0, 1],
                            y: [50, 0],
                            transition: { duration: 0.6, delay: 0.1 * index }
                          }}
                          viewport={{ once: true }}
                        >
                          <Link href={`/camere#${room.id}`}>
                            <div className="relative h-56 overflow-hidden">
                              <OptimizedImage
                                src={room.image}
                                alt={room.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                                <div className="flex items-end justify-between">
                                  <h3 className="text-xl font-bold text-white">{room.name}</h3>
                                </div>
                              </div>
                            </div>
                          </Link>
                          
                          <div className="p-4">
                            <p className="text-[#942e2f]/80 mb-3">{room.description}</p>
                            <Link href="/camere" className="text-[#b06939] hover:text-[#942e2f] text-sm underline inline-block">
                              Visita la camera
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 text-center">
                  <Link href="/camere">
                    <Button className="bg-[#942e2f] hover:bg-[#b06939] text-white px-8 py-6 text-lg relative overflow-hidden group rounded-lg">
                      <span className="relative z-10">Vedi tutte le camere</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </LazySection>

          {/* Contact Section - con animazioni */}
          <LazySection id="contact" className="py-16 md:py-24 bg-[#fcf8f3] relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <motion.div 
                    className="h-1 bg-[rgba(232,151,0,1)] mb-6 mx-auto w-[100px]"
                    initial={{ width: 0 }}
                    whileInView={{ width: 100, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-[#b06939]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Contattaci
                  </motion.h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-[#942e2f] mb-4">Informazioni</h3>
                    <motion.ul 
                      className="space-y-4"
                      variants={staggerContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <motion.li 
                        className="flex items-start gap-3"
                        variants={fadeInUpVariants}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1, color: "#b06939" }}
                          transition={{ duration: 0.2 }}
                        >
                          <MapPin className="h-5 w-5 text-[#b06939] mt-1" />
                        </motion.div>
                        <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                          <p className="text-[#942e2f]/80">Via Alessandria 41/b - 30173, Venezia, Italia</p>
                        </motion.div>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        variants={fadeInUpVariants}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Phone className="h-5 w-5 text-[#b06939]" />
                        </motion.div>
                        <motion.a 
                          href="tel:+393341817894" 
                          className="text-[#942e2f]/80 hover:text-[#b06939] transition-colors"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          +39 334 181 7894
                        </motion.a>
                      </motion.li>
                      <motion.li 
                        className="flex items-center gap-3"
                        variants={fadeInUpVariants}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail className="h-5 w-5 text-[#b06939]" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <a 
                            href="mailto:info@dolcelaguna.com"
                            className="text-white/80 hover:text-white transition-colors"
                          >
                            info@dolcelaguna.com
                          </a>
                        </motion.div>
                      </motion.li>
                    </motion.ul>
                    <motion.div 
                      className="mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <h4 className="text-lg font-medium text-[#942e2f] mb-3">Orari</h4>
                      <motion.p 
                        className="text-[#942e2f]/80">
                          <strong>Check-in:</strong> dalle 15:00 alle 10:00 del giorno successivo
                        </motion.p>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="h-64 md:h-auto rounded-lg overflow-hidden shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.3442782456584!2d12.327831376889761!3d45.50332197107633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb4c7a6b55555%3A0x8d87f65f4d94d894!2sDolce%20Laguna%20Affittacamere!5e0!3m2!1sit!2sit!4v1713633031123!5m2!1sit!2sit"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Mappa Dolce Laguna"
                    ></iframe>
                  </motion.div>
                </div>

                <motion.div 
                  className="text-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link href="/informazioni" className="inline-block">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-[#9ccce4] hover:bg-[#9e3432] text-white px-8 py-6 text-lg relative overflow-hidden group rounded-lg">
                        <span className="relative z-10">Maggiori Informazioni</span>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </LazySection>
        </main>

        {/* Footer */}
        <footer className="bg-[#9e3432] text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <motion.div whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}>
                    <Image
                      src="/images/logo-dolcelaguna.png"
                      alt="Dolce Laguna Logo"
                      width={50}
                      height={50}
                      priority
                      style={{ height: 'auto' }}
                      className="object-contain"
                    />
                  </motion.div>
                  <span className="text-xl font-semibold text-white">Dolce Laguna</span>
                </div>
                <p className="text-sm text-white/80 mt-4">
                  DOLCE LAGUNA di FF Hospitality s.r.l.
                  <br />
                  Sede legale: Strada Statale 113, km 335, Alcamo (TP)
                  <br />
                  P.IVA: 02912450810
                  <br />
                  REA: TP - 205823
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Contatti</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-white/70 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Via Alessandria 41/b - 30173 - CIN: IT027042B4CSA6DFBW</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-white/70 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80">Via Alessandria 43/a - 30173 - CIN: IT027042B4TDP8CF3K</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-white/70 flex-shrink-0" />
                    <a href="tel:+393341817894" className="text-white/80 hover:text-white transition-colors">
                      +39 334 181 7894
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-white/70 flex-shrink-0" />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a 
                        href="mailto:info@dolcelaguna.com"
                        className="text-white/80 hover:text-white transition-colors"
                      >
                        info@dolcelaguna.com
                      </a>
                    </motion.div>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Collegamenti</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/camere" className="text-white/80 hover:text-white transition-colors">
                      Camere
                    </Link>
                  </li>
                  <li>
                    <Link href="/servizi" className="text-white/80 hover:text-white transition-colors">
                      Servizi
                    </Link>
                  </li>
                  <li>
                    <Link href="/contatti" className="text-white/80 hover:text-white transition-colors">
                      Contatti
                    </Link>
                  </li>
                  <li>
                    <Link href="/informazioni" className="text-white/80 hover:text-white transition-colors">
                      Informazioni
                    </Link>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">La nostra posizione</h3>
                <div className="aspect-video rounded-lg overflow-hidden border border-white/20 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.3442782456584!2d12.327831376889761!3d45.50332197107633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb4c7a6b55555%3A0x8d87f65f4d94d894!2sDolce%20Laguna%20Affittacamere!5e0!3m2!1sit!2sit!4v1713633031123!5m2!1sit!2sit"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/70">
              <p>DOLCE LAGUNA di FF Hospitality s.r.l. - Tutti i diritti riservati</p>
            </div>
          </div>
          
          {/* Decorazione onda in fondo */}
          <motion.div 
            className="h-2 bg-gradient-to-r from-[#942e2f] via-[#b06939] to-[rgba(232,151,0,1)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.9 }}
          ></motion.div>
        </footer>
      </div>
    </ScrollManager>
  )
}
