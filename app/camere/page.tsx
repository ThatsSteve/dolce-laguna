"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Wifi,
  Coffee,
  Snowflake,
  Tv,
  Bath,
  Users,
  Check,
  ArrowRight,
  MapPin,
  Phone,
  Mail
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogTrigger } from "../../components/ui/dialog"
import OptimizedImage from "../../components/optimized-image"
import ScrollManager from "../../components/scroll-manager"
import { useI18n } from "../../context/i18n-context"

// Tipologie di camera raggruppate per tipo
const roomTypes = [
  // Camera Doppia
  {
    id: "doppia",
    name: "Camera Doppia",
    description: "Tipologia di camera spaziosa restaurata di recente, con stile mediterraneo e di classe.",
    longDescription: "Tipologia di camera doppia con arredi eleganti e atmosfera rilassante. Ideale per chi cerca comfort e tranquillità a pochi passi dall'aeroporto.",
    capacity: "2 persone",
    bed: "1 letto matrimoniale o 2 letti singoli su richiesta",
    rooms: [
      {
        id: "doppia-marrone",
        name: "Camera Doppia Marrone",
        structure: "Dolce Laguna 1",
        images: [
          "/images/Homepage/DL1/Marrone.jpg",
          "/images/Camera Marrone/744.jpg",
          "/images/Camera Marrone/748.jpg",
          "/images/Camera Marrone/766.jpg",
          "/images/Camera Marrone/796.jpg",
          "/images/Camera Marrone/791.jpg",
          "/images/Camera Marrone/759.jpg",
          "/images/Camera Marrone/752.jpg",
          "/images/Camera Marrone/741.jpg"
        ]
      },
      {
        id: "doppia-pavone",
        name: "Camera Doppia Pavone",
        structure: "Dolce Laguna 1",
        images: [
          "/images/Homepage/DL1/Pavone.jpg",
          "/images/Camera Pavone/WhatsApp Image 2025-04-28 at 15.59.58_6f2c2438.jpg",
          "/images/Camera Pavone/WhatsApp Image 2025-04-28 at 15.55.29_8d6dc86e.jpg"
        ]
      },
      {
        id: "doppia-verdetende",
        name: "Camera Doppia Verde Tende",
        structure: "Dolce Laguna 1",
        images: [
          "/images/Homepage/DL1/Verdetende.jpg"
        ]
      },
      {
        id: "doppia-nuova",
        name: "Camera Doppia Blu Deluxe",
        structure: "Dolce Laguna 1",
        images: [
          "/images/Camera Blu Deluxe/830.jpg",
          "/images/Camera Blu Deluxe/840.jpg",
          "/images/Camera Blu Deluxe/859.jpg",
          "/images/Camera Blu Deluxe/867.jpg",
          "/images/Camera Blu Deluxe/865.jpg",
          "/images/Camera Blu Deluxe/852.jpg",
          "/images/Camera Blu Deluxe/835.jpg"
        ]
      },
      {
        id: "doppia-blu",
        name: "Camera Doppia Blu",
        structure: "Dolce Laguna 2",
        images: [
          "/images/Homepage/DL2/blu.jpg",
          "/images/Camera Blu/203.jpg",
          "/images/Camera Blu/225.jpg",
          "/images/Camera Blu/240.jpg",
          "/images/Camera Blu/188.jpg",
          "/images/Camera Blu/192.jpg"
        ]
      }
    ],
    structure: "Entrambe"
  },
  // Camera Tripla
  {
    id: "tripla",
    name: "Camera Tripla",
    description: "Tipologia di camera ampia e luminosa, ideale per famiglie o piccoli gruppi, con tutti i comfort moderni.",
    longDescription: "Tipologia di camera tripla con letto matrimoniale e letto singolo, bagno privato e arredi di qualità. Perfetta per chi desidera spazio aggiuntivo.",
    capacity: "3 persone",
    bed: "1 letto matrimoniale + 1 letto singolo",
    rooms: [
      {
        id: "tripla-dl1",
        name: "Camera Tripla",
        structure: "Dolce Laguna 1",
        images: [
          "/images/Tripla DL1/WhatsApp Image 2025-05-06 at 18.47.42_da45b3f3.jpg",
          "/images/Tripla DL1/89481331.jpg",
          "/images/Tripla DL1/79865951.jpg",
          "/images/Tripla DL1/79785909.jpg"
        ]
      }
    ],
    structure: "Dolce Laguna 1"
  },
  // Camera Singola
  {
    id: "singola",
    name: "Camera Singola",
    description: "Tipologia di camera singola moderna e funzionale, ideale per viaggiatori solitari.",
    longDescription: "Tipologia di camera singola con letto comodo, bagno privato e tutti i comfort essenziali.",
    capacity: "1 persona",
    bed: "1 letto singolo",
    rooms: [
      {
        id: "singola-azzurra",
        name: "Camera Singola Azzurra",
        structure: "Dolce Laguna 2",
        images: [
          "/images/Homepage/DL2/azzurra.jpg",
          "/images/Camera Azzurra 3/305.jpg",
          "/images/Camera Azzurra 3/308.jpg",
          "/images/Camera Azzurra 3/322.jpg",
          "/images/Camera Azzurra 3/294.jpg",
          "/images/Camera Azzurra 3/314.jpg",
          "/images/Camera Azzurra 3/311.jpg",
          "/images/Camera Azzurra 3/301.jpg",
          "/images/Camera Azzurra 3/297.jpg"
        ]
      }
    ],
    structure: "Dolce Laguna 2"
  },
  // Camera Quadrupla
  {
    id: "quadrupla",
    name: "Camera Quadrupla",
    description: "Tipologia di camera quadrupla ampia e luminosa, ideale per famiglie, con terrazza privata e tutti i comfort.",
    longDescription: "Tipologia di camera quadrupla con due letti matrimoniali, bagno privato, terrazza privata e arredi di alta qualità. Perfetta per soggiorni in famiglia o gruppi di amici.",
    capacity: "4 persone",
    bed: "2 letti matrimoniali",
    rooms: [
      {
        id: "quadrupla-suite105",
        name: "Camera Quadrupla Suite 105",
        structure: "Dolce Laguna 2",
        images: [
          "/images/Suite 105/IMG_8148.jpg",
          "/images/Suite 105/IMG_8136.jpg",
          "/images/Suite 105/IMG_8123.jpg",
          "/images/Suite 105/163.jpg",
          "/images/Suite 105/159.jpg",
          "/images/Suite 105/149.jpg",
          "/images/Suite 105/144.jpg",
          "/images/Suite 105/109.jpg",
          "/images/Suite 105/102.jpg"
        ]
      }
    ],
    structure: "Dolce Laguna 2"
  }
]

// Servizi comuni (visualizzati una sola volta)
const serviziComuni = [
  { name: "Bagno privato con doccia e phon", icon: Bath },
  { name: "Aria climatizzata/riscaldamento", icon: Snowflake },
  { name: "Minibar", icon: Coffee },
  { name: "Wi-Fi gratuito", icon: Wifi },
  { name: "Scrivania", icon: Users },
  { name: "Possibilità di letti singoli su richiesta", icon: Users },
  { name: "Accesso al giardino", icon: Users },
]

export default function CamerePage() {
  const [currentRoomType, setCurrentRoomType] = useState("doppia")
  const [currentStructure, setCurrentStructure] = useState("Dolce Laguna 1")
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({})
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { t } = useI18n()
  
  // Filtra le tipologie di camera in base alla struttura selezionata
  const filteredRoomTypes = useMemo(() => {
    return roomTypes.filter(roomType => 
      roomType.structure === "Entrambe" || 
      roomType.structure === currentStructure ||
      roomType.rooms.some(room => room.structure === currentStructure)
    );
  }, [currentStructure]);

  // Assicurati che currentRoomType sia valido per la struttura selezionata
  useEffect(() => {
    const validRoomIds = filteredRoomTypes.map(r => r.id);
    if (validRoomIds.length > 0 && !validRoomIds.includes(currentRoomType)) {
      setCurrentRoomType(validRoomIds[0]);
    }
    
    // Inizializza gli indici delle immagini per tutte le stanze
    const initialIndices: Record<string, number> = {};
    roomTypes.forEach(roomType => {
      roomType.rooms.forEach(room => {
        initialIndices[room.id] = 0;
      });
    });
    setCurrentImageIndices(initialIndices);
    
  }, [currentStructure, filteredRoomTypes, currentRoomType]);

  // Funzioni per la navigazione delle immagini
  const nextImage = (roomId: string) => {
    const roomType = roomTypes.find((r) => r.id === currentRoomType);
    if (!roomType) return;
    
    const room = roomType.rooms.find((r) => r.id === roomId);
    if (!room) return;

    setCurrentImageIndices((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] + 1) % room.images.length,
    }));
  }

  const prevImage = (roomId: string) => {
    const roomType = roomTypes.find((r) => r.id === currentRoomType);
    if (!roomType) return;
    
    const room = roomType.rooms.find((r) => r.id === roomId);
    if (!room) return;

    setCurrentImageIndices((prev) => ({
      ...prev,
      [roomId]: (prev[roomId] - 1 + room.images.length) % room.images.length,
    }));
  }
  
  // Seleziona la prima stanza disponibile quando cambia il tipo di camera
  useEffect(() => {
    const roomType = roomTypes.find(r => r.id === currentRoomType);
    if (roomType) {
      const rooms = roomType.rooms.filter(room => room.structure === currentStructure);
      if (rooms.length > 0) {
        setSelectedRoom(rooms[0].id);
      } else {
        setSelectedRoom(null);
      }
    }
  }, [currentRoomType, currentStructure]);
  
  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  return (
    <ScrollManager>
    <div className="flex min-h-screen flex-col bg-white">
        {/* Il componente Header viene importato automaticamente dal layout */}

      <main className="flex-1">
        {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
            {/* Immagine di sfondo */}
            <div className="absolute inset-0">
              <OptimizedImage
                src="/images/385.jpg"
                alt="Le Nostre Camere"
                fill
                className="object-cover brightness-[0.8]"
                priority
                sizes="100vw"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/32 to-black/50"></div>
            </div>

            {/* Contenuto sovrapposto */}
            <div className="container mx-auto px-4 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-cinzel font-semibold text-white mb-6 relative">
                  <span className="relative">
                    Le Nostre Camere
                    <motion.span 
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-[#b06939]"
                      initial={{ width: 0, left: "50%" }}
                      animate={isLoaded ? { width: "100%", left: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    ></motion.span>
                  </span>
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Scopri il comfort e l'eleganza delle nostre tipologie di camere, progettate per offrire 
                un soggiorno indimenticabile a Venezia
              </motion.p>
            </div>
          </section>

          {/* Sezione dedicata ai bottoni di selezione struttura */}
          <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.p
                  className="text-lg text-[#942e2f]/80 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Scegli la struttura per visualizzare le tipologie di camere disponibili
                </motion.p>
                
                {/* Selettore struttura */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="inline-flex rounded-md p-1 bg-[#decebe]/30 backdrop-blur-sm shadow-inner">
                    <button
                      onClick={() => setCurrentStructure("Dolce Laguna 1")}
                      className={`px-6 py-3 rounded-lg transition-all duration-300 relative text-lg ${
                        currentStructure === "Dolce Laguna 1"
                          ? "bg-[#b06939] text-white shadow-md"
                          : "bg-transparent text-[#942e2f]/70 hover:text-[#942e2f]"
                      }`}
                    >
                      <span className="relative z-10 font-serif">Dolce Laguna 1</span>
                      {currentStructure === "Dolce Laguna 1" && (
                        <motion.div 
                          className="absolute inset-0 bg-[#b06939] rounded-lg" 
                          layoutId="structure-indicator"
                          style={{ zIndex: 0 }} 
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setCurrentStructure("Dolce Laguna 2")}
                      className={`px-6 py-3 rounded-lg transition-all duration-300 relative text-lg ${
                        currentStructure === "Dolce Laguna 2"
                          ? "bg-[#9e3432] text-white shadow-md"
                          : "bg-transparent text-[#942e2f]/70 hover:text-[#942e2f]"
                      }`}
                    >
                      <span className="relative z-10 font-serif">Dolce Laguna 2</span>
                      {currentStructure === "Dolce Laguna 2" && (
                        <motion.div 
                          className="absolute inset-0 bg-[#9e3432] rounded-lg" 
                          layoutId="structure-indicator"
                          style={{ zIndex: 0 }} 
                        />
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

        {/* Room Types Tabs Section */}
        <section className="py-8 bg-[#f9f7f4]">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center">
                {/* Bottoni per le tipologie di camera */}
                <div className="w-full max-w-5xl mb-10 text-center">
                  <h3 className="text-lg text-[#942e2f] font-medium mb-6 text-center">Seleziona la tipologia di camera:</h3>
                  <div className="flex justify-center">
                    <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                      {filteredRoomTypes.map((roomType) => {
                        // Per ogni tipologia, prendi la prima camera della struttura corrente per l'anteprima
                        const roomsInCurrentStructure = roomType.rooms.filter(room => 
                          room.structure === currentStructure
                        );
                        
                        const previewRoom = roomsInCurrentStructure.length > 0 
                          ? roomsInCurrentStructure[0] 
                          : roomType.rooms[0];
                        
                        if (!previewRoom) return null;
                        
                        return (
                          <motion.button
                            key={roomType.id}
                            onClick={() => setCurrentRoomType(roomType.id)}
                            className={`group relative overflow-hidden rounded-xl transition-all duration-500 min-w-[180px] max-w-[180px] flex-shrink-0 ${
                              currentRoomType === roomType.id 
                              ? 'ring-2 ring-offset-2 ring-[#b06939] shadow-lg' 
                              : 'shadow-md hover:shadow-xl'
                            }`}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="aspect-[3/2] w-full overflow-hidden bg-[#decebe]/10">
                              <div className="absolute inset-0 z-10">
                                <OptimizedImage
                                  src={previewRoom.images[0]}
                                  alt={roomType.name}
                                  fill
                                  className={`object-cover transition-all duration-700 ${
                                    currentRoomType === roomType.id 
                                    ? 'brightness-100 scale-105' 
                                    : 'brightness-[0.9] group-hover:brightness-95 group-hover:scale-105'
                                  }`}
                                />
                              </div>
                              <div className={`absolute inset-0 bg-gradient-to-t ${
                                currentRoomType === roomType.id 
                                ? 'from-[#b06939]/70 to-transparent' 
                                : 'from-[#942e2f]/60 to-transparent/20 group-hover:from-[#b06939]/50'
                              } transition-colors duration-500 z-20`}></div>
                              
                              <div className="absolute bottom-0 left-0 right-0 p-3 z-30 text-white">
                                <div>
                                  <p className="text-sm font-medium leading-tight">{roomType.name}</p>
                                  <p className="text-xs text-white/80 mt-0.5">{roomType.capacity}</p>
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              
                {/* Visualizzazione della tipologia di camera selezionata */}
                <div className="w-full max-w-5xl mx-auto">
                  {filteredRoomTypes.map((roomType) => (
                    currentRoomType === roomType.id && (
                      <motion.div
                        key={roomType.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-[#decebe]/20"
                      >
                        {/* Intestazione con informazioni sulla tipologia di camera */}
                        <div className="mb-10">
                          <motion.div 
                            className="h-1 mb-4 w-[60px]"
                            style={{ backgroundColor: "#b06939" }}
                            initial={{ width: 0 }}
                            whileInView={{ width: 60 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                          />
                          <h2 className="text-3xl font-bold text-[#942e2f] mb-4">{roomType.name}</h2>
                          <p className="text-lg text-[#942e2f]/80 mb-6">{roomType.description}</p>
                          
                          {/* Dettagli della tipologia di camera */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-[#942e2f]/90">
                              <div className="w-8 h-8 rounded-full bg-[#decebe]/50 flex items-center justify-center">
                                <Users className="h-4 w-4 text-[#b06939]" />
                              </div>
                              <span>{roomType.capacity}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#942e2f]/90">
                              <div className="w-8 h-8 rounded-full bg-[#decebe]/50 flex items-center justify-center">
                                <Check className="h-4 w-4 text-[#b06939]" />
                              </div>
                              <span>{roomType.bed}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#942e2f]/90">
                              <div className="w-8 h-8 rounded-full bg-[#decebe]/50 flex items-center justify-center">
                                <Bath className="h-4 w-4 text-[#b06939]" />
                              </div>
                              <span>Bagno privato</span>
                            </div>
                          </div>
                          
                          {/* Servizi inclusi */}
                          <h3 className="text-xl font-semibold text-[#b06939] mb-4">Servizi inclusi nella tipologia</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                            {serviziComuni.map((amenity, index) => (
                              <div key={index} className="flex items-center gap-2 text-[#942e2f]/90">
                                <div className="w-8 h-8 rounded-full bg-[#decebe]/30 flex items-center justify-center">
                                  <amenity.icon className="h-4 w-4 text-[#b06939]" />
                                </div>
                                <span className="text-sm">{amenity.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Filtro per mostrare solo le camere della struttura selezionata */}
                        {roomType.rooms.filter(room => room.structure === currentStructure).length > 0 ? (
                          <>
                            {/* Titolo sezione camere */}
                            <div className="mt-12 mb-6">
                              <h3 className="text-2xl font-semibold text-[#942e2f] mb-2">
                                Le nostre {roomType.name === "Camera Doppia" ? "camere doppie" : 
                                          roomType.name === "Camera Tripla" ? "camere triple" : 
                                          roomType.name === "Camera Singola" ? "camere singole" : 
                                          roomType.name === "Camera Quadrupla" ? "camere quadruple" : 
                                          roomType.name.toLowerCase()} disponibili in {currentStructure}
                              </h3>
                              <p className="text-[#942e2f]/70">
                                Esplora le diverse {roomType.name === "Camera Doppia" ? "camere doppie" : 
                                          roomType.name === "Camera Tripla" ? "camere triple" : 
                                          roomType.name === "Camera Singola" ? "camere singole" : 
                                          roomType.name === "Camera Quadrupla" ? "camere quadruple" : 
                                          roomType.name.toLowerCase()} disponibili nella struttura selezionata
                              </p>
                            </div>
                            
                            {/* Visualizzazione gallerie di ogni camera di questa tipologia */}
                            <div className="space-y-12">
                              {roomType.rooms
                                .filter(room => room.structure === currentStructure)
                                .map((room) => (
                                <div key={room.id} className="border-t border-[#decebe]/30 pt-8">
                                  {/* Galleria immagini */}
                                  <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg mb-6">
                              {room.images.map((imageSrc, index) => (
                                <div
                                  key={index}
                                  className={`absolute inset-0 transition-opacity duration-700 ${
                                    index === currentImageIndices[room.id] ? "opacity-100 z-10" : "opacity-0 z-0"
                                  }`}
                                >
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                                  <OptimizedImage
                                    src={imageSrc}
                                          alt={`${roomType.name} - Immagine ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                              
                              {/* Controlli carousel */}
                              <div className="absolute inset-0 flex items-center justify-between z-20 px-4">
                                <motion.button
                                  onClick={() => prevImage(room.id)}
                                  className="bg-white/80 hover:bg-white text-[#942e2f] rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <ChevronLeft className="h-5 w-5" />
                                </motion.button>
                                <motion.button
                                  onClick={() => nextImage(room.id)}
                                  className="bg-white/80 hover:bg-white text-[#942e2f] rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-300"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <ChevronRight className="h-5 w-5" />
                                </motion.button>
                              </div>

                              {/* Indicatori */}
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                                {room.images.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentImageIndices(prev => ({ ...prev, [room.id]: index }))}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                      index === currentImageIndices[room.id]
                                        ? "bg-white w-6"
                                        : "bg-white/50 hover:bg-white/80"
                                    }`}
                                    aria-label={`Vai all'immagine ${index + 1}`}
                                  />
                                ))}
                              </div>
                                  </div>
                                  </div>
                                ))}
                            </div>
                          </>
                        ) : (
                          <div className="text-center p-8 bg-[#decebe]/10 rounded-lg">
                            <p className="text-[#942e2f]">
                              Non ci sono {roomType.name === "Camera Doppia" ? "camere doppie" : 
                                          roomType.name === "Camera Tripla" ? "camere triple" : 
                                          roomType.name === "Camera Singola" ? "camere singole" : 
                                          roomType.name === "Camera Quadrupla" ? "camere quadruple" : 
                                          roomType.name.toLowerCase()} disponibili in {currentStructure}.
                              Prova a selezionare un'altra struttura o tipologia di camera.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )
                  ))}
                </div>
              </div>
            </div>
        </section>

          {/* Call to Action */}
          <section className="py-16 bg-[#fcf8f3]">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-[#b06939] mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {t('readyToBook')}
                </motion.h2>
                <motion.p 
                  className="text-lg text-[#942e2f]/80 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {t('contactUsForBooking')}
                </motion.p>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Link href="/prenota">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="bg-gradient-to-r from-[#9e3432] to-[#b06939] text-white px-10 py-6 text-xl font-semibold relative overflow-hidden group rounded-lg shadow-lg">
                        <span className="relative z-10 flex items-center justify-center">
                          Prenota Ora
                          <motion.div 
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="ml-2"
                          >
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                          </motion.div>
                        </span>
                        <motion.span
                          className="absolute -inset-full transform rotate-45 bg-white opacity-20"
                          animate={{
                            x: ["0%", "200%"],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "linear",
                          }}
                        ></motion.span>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
          </div>
        </section>
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
                <h3 className="text-lg font-semibold mb-4 text-white">{t('contacts')}</h3>
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
                    <a 
                      href="mailto:info@dolcelaguna.com"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      info@dolcelaguna.com
                  </a>
                </li>
              </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-white">{t('links')}</h3>
              <ul className="space-y-2">
                <li>
                    <Link href="/" className="text-white/80 hover:text-white transition-colors">
                      {t('home')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/camere" className="text-white/80 hover:text-white transition-colors">
                    {t('rooms')}
                  </Link>
                </li>
                <li>
                    <Link href="/servizi" className="text-white/80 hover:text-white transition-colors">
                    {t('services')}
                  </Link>
                </li>
                <li>
                    <Link href="/contatti" className="text-white/80 hover:text-white transition-colors">
                    {t('contacts')}
                  </Link>
                </li>
                <li>
                    <Link href="/informazioni" className="text-white/80 hover:text-white transition-colors">
                    {t('information')}
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
