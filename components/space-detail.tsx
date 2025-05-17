"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, Ship, Coffee, Wifi, Tv, MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"

// Define the interface for the component props
export interface SpaceDetailProps {
  isOpen: boolean
  onClose: () => void
  space: {
    id: number | string
    name: string
    title?: string
    description: string
    longDescription?: string
    image: string
    features: Array<{ icon: string; text: string }> | string[]
    icon: any
  }
}

export function SpaceDetail({ isOpen, onClose, space }: SpaceDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Icone per le caratteristiche
  const featureIcons = {
    "Vista Laguna": Ship,
    "Area Relax": Coffee,
    "Wi-Fi Gratuito": Wifi,
    "Smart TV": Tv,
    "Posizione Centrale": MapPin,
  }

  // Funzione per ottenere l'icona corretta
  const getFeatureIcon = (feature: string | { icon: string; text: string }) => {
    const featureText = typeof feature === 'string' ? feature : feature.text
    return featureIcons[featureText] || Coffee
  }

  // Funzione per ottenere il testo della feature
  const getFeatureText = (feature: string | { icon: string; text: string }) => {
    return typeof feature === 'string' ? feature : feature.text
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white/95 backdrop-blur-md border-[#decebe] rounded-2xl">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative h-64 md:h-80 overflow-hidden">
              <Image 
                src={space.image || "/placeholder.svg"} 
                alt={space.name} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
              <div className="absolute inset-0 bg-pattern-waves opacity-10 mix-blend-overlay"></div>

              <div className="absolute top-4 right-4 z-10">
                <DialogClose className="rounded-full bg-black/20 backdrop-blur-sm p-2 text-white hover:bg-black/40 transition-colors">
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </DialogClose>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white text-shadow-md mb-2">
                  {space.name}
                </h2>
                <p className="text-white/90 text-lg font-body max-w-2xl text-shadow-sm">{space.description}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex border-b border-[#decebe]/30 mb-6">
                <button
                  className={`px-4 py-2 font-medium font-body text-base transition-colors relative ${
                    activeTab === "overview"
                      ? "text-[#b06939] border-b-2 border-[#b06939]"
                      : "text-[#942e2f]/60 hover:text-[#942e2f]"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Panoramica
                </button>
                <button
                  className={`px-4 py-2 font-medium font-body text-base transition-colors relative ${
                    activeTab === "features"
                      ? "text-[#b06939] border-b-2 border-[#b06939]"
                      : "text-[#942e2f]/60 hover:text-[#942e2f]"
                  }`}
                  onClick={() => setActiveTab("features")}
                >
                  Caratteristiche
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-[#942e2f]/80 font-body leading-relaxed">
                      {space.longDescription || space.description}
                    </p>

                    <div className="mt-6 flex justify-center">
                      <Button
                        className="bg-[#b06939] hover:bg-[#9e3432] text-white rounded-full group overflow-hidden"
                        onClick={() => setActiveTab("features")}
                      >
                        <span className="relative z-10">Scopri le caratteristiche</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "features" && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {space.features.map((feature, index) => {
                        const Icon = getFeatureIcon(feature)
                        const featureText = getFeatureText(feature)
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-[#decebe]/10 p-4 rounded-xl flex items-start gap-3"
                          >
                            <div className="bg-[#b06939]/10 p-2 rounded-full">
                              <Icon className="h-5 w-5 text-[#b06939]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-[#942e2f] font-display">{featureText}</h4>
                              <p className="text-sm text-[#942e2f]/70 font-body">{getFeatureDescription(featureText)}</p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

// Funzione per ottenere descrizioni delle caratteristiche
function getFeatureDescription(feature: string): string {
  const descriptions = {
    "Vista Laguna": "Goditi una vista mozzafiato sulla laguna veneziana direttamente dalla finestra.",
    "Area Relax": "Uno spazio dedicato al relax con comode sedute e un'atmosfera tranquilla.",
    "Wi-Fi Gratuito": "Connessione Wi-Fi ad alta velocità disponibile gratuitamente in tutto lo spazio.",
    "Smart TV": "TV a schermo piatto con accesso a canali internazionali e servizi di streaming.",
    "Posizione Centrale": "Facilmente accessibile e in posizione strategica per esplorare Venezia.",
    "Aria Condizionata": "Sistema di climatizzazione per garantire il massimo comfort in ogni stagione.",
    "Arredamento Veneziano": "Elementi di design che richiamano la tradizione veneziana con un tocco moderno.",
    "Illuminazione Naturale": "Ampie finestre che garantiscono un'ottima illuminazione naturale durante il giorno.",
    "Materiali Pregiati": "Finiture di alta qualità e materiali selezionati per garantire eleganza e durabilità.",
    "Accessibilità": "Spazio progettato per essere accessibile a tutti gli ospiti, con particolare attenzione alle esigenze speciali.",
  }

  return descriptions[feature] || "Caratteristica che migliora il tuo soggiorno presso Dolce Laguna."
}
