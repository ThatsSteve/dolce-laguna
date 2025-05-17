"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Info,
  ArrowRight,
  Building,
  ExternalLink,
  MessageCircle,
  HelpCircle
} from "lucide-react"
import { Button } from "../../components/ui/button"
import ScrollManager from "../../components/scroll-manager"

export default function PrenotaPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoEnding, setIsVideoEnding] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
    
    // Assicuriamoci che il video si avvii correttamente
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error)
      })
      
      // Aggiungiamo l'event listener per il timeupdate
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate)
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [])
  
  // Funzione per controllare quando il video sta per finire
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const timeLeft = videoRef.current.duration - videoRef.current.currentTime
      
      // Se manca meno di 0.5 secondi alla fine, iniziamo la dissolvenza
      if (timeLeft < 0.5) {
        setIsVideoEnding(true)
      } else if (timeLeft > 1 && isVideoEnding) {
        setIsVideoEnding(false)
      }
    }
  }

  return (
    <ScrollManager>
      <div className="flex min-h-screen flex-col bg-white">
        <main className="flex-1">
          {/* Hero Section con Video Background */}
          <section className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoEnding ? 'opacity-70' : 'opacity-100'}`}
                autoPlay
                muted
                loop
                playsInline
                poster="/images/Homepage/DL1/Bludeluxe.jpg" // Fallback image durante il caricamento
              >
                <source src="/images/Dolce Laguna Video Prenota.mp4" type="video/mp4" />
              </video>
              
              {/* Overlay scuro per migliorare la leggibilità del testo */}
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              
              {/* Pattern decorativo sovrapposto */}
              <div
                className="absolute inset-0 z-20 opacity-10 mix-blend-overlay"
                style={{
                  backgroundImage: "url('/images/venetian-pattern.svg')",
                  backgroundSize: "120px",
                }}
              ></div>
            </div>

            {/* Contenuto Hero */}
            <div className="container mx-auto px-4 relative z-30">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="relative">
                  Prenota il Tuo Soggiorno
                    <motion.span 
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-[rgba(232,151,0,1)]"
                      initial={{ width: 0, left: "50%" }}
                      animate={{ width: "100%", left: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    ></motion.span>
                  </span>
                </motion.h1>
                <motion.p
                  className="mt-4 text-lg md:text-xl text-white/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Scegli la struttura e prenota al miglior prezzo
                </motion.p>
              </div>
            </div>
          </section>

          {/* Sezione Promozioni Esclusive - Da inserire tra Hero e Strutture */}
          <section className="py-6 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <motion.div 
                  className="bg-[#f9f7f4] rounded-xl border-l-4 border border-[#942e2f] overflow-hidden shadow-md w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div 
                        className="w-10 h-10 rounded-full bg-[#942e2f]/10 flex items-center justify-center flex-shrink-0"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          borderColor: ["rgba(148, 46, 47, 0.2)", "rgba(148, 46, 47, 0.5)", "rgba(148, 46, 47, 0.2)"]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{ border: "2px solid rgba(148, 46, 47, 0.2)" }}
                      >
                        <motion.span 
                          className="text-[#942e2f] text-xl font-bold"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          !
                        </motion.span>
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-[#942e2f]">Offerte Esclusive</h3>
                    </div>
                    
                    <p className="text-[#942e2f]/80 mb-3 ml-0 md:ml-12">
                      Siamo lieti di proporre ai nostri ospiti tariffe e promozioni speciali. Per informazioni su disponibilità last-minute, offerte in occasione di festività o promozioni recenti, contattaci direttamente.
                    </p>
                    
                    <div className="ml-0 md:ml-12">
                      <motion.a 
                        href="tel:+393341817894"
                        className="inline-block"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="bg-[#942e2f] hover:bg-[#b06939] text-white py-2 px-4 rounded-lg font-medium relative overflow-hidden group shadow-md hover:shadow-lg transition-colors">
                          <span className="relative z-10 flex items-center justify-center">
                            <Phone className="h-4 w-4 mr-2" />
                            Chiama
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
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Strutture Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  className="text-center mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-[#942e2f] mb-4">Le Nostre Strutture</h2>
                  <p className="text-[#942e2f]/80">
                    Consigliamo di verificare la disponibilità in entrambe le strutture, potrebbero esserci camere disponibili in una quando l'altra è completa.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  {/* Dolce Laguna 1 */}
                  <motion.div 
                    className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-[#9e3432] hover:border-[rgba(232,151,0,1)] relative"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    whileHover={{ 
                      y: -8, 
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src="/images/Homepage/DL1/Bludeluxe.jpg" 
                        alt="Dolce Laguna 1" 
                        fill 
                        className="object-cover transition-transform duration-700 hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-[#9e3432] text-white text-sm font-medium rounded-full mb-2">
                          Dolce Laguna 1
                        </span>
                        <h3 className="text-xl font-bold text-white">Via Alessandria 41/b</h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#f9f7f4] flex items-center justify-center flex-shrink-0">
                            <Building className="h-4 w-4 text-[#b06939]" />
                      </div>
                      <div>
                            <p className="text-[#942e2f]/80">
                              Soggiorno moderno ed elegante a pochi passi dall'aeroporto Marco Polo. Camere spaziose con finiture di pregio.
                            </p>
                      </div>
                      </div>
                    </div>
                    
                      <motion.a 
                        href="https://book.octorate.com/octobook/site/ota/result.xhtml?id=1552&property=496902"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full bg-gradient-to-r from-[rgba(232,151,0,1)] to-[#b06939] text-white py-4 rounded-lg font-medium relative overflow-hidden group shadow-md hover:shadow-lg">
                          <span className="relative z-10 flex items-center justify-center text-lg">
                            Prenota Dolce Laguna 1
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
                      </motion.a>
                    </div>
                </motion.div>
                
                  {/* Dolce Laguna 2 */}
                  <motion.div
                    className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-[#9e3432] hover:border-[rgba(232,151,0,1)] relative"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ 
                      y: -8, 
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src="/images/Homepage/DL2/suite.jpg" 
                        alt="Dolce Laguna 2" 
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-[#9e3432] text-white text-sm font-medium rounded-full mb-2">
                          Dolce Laguna 2
                        </span>
                        <h3 className="text-xl font-bold text-white">Via Alessandria 43/a</h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#f9f7f4] flex items-center justify-center flex-shrink-0">
                            <Building className="h-4 w-4 text-[#b06939]" />
                          </div>
                          <div>
                            <p className="text-[#942e2f]/80">
                              Struttura con ambienti raffinati e tranquilli, ideale per viaggiatori in cerca di comfort e silenzio. Suite per famiglie.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <motion.a 
                        href="https://book.octorate.com/octobook/site/ota/result.xhtml?id=1552&property=274253"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full bg-gradient-to-r from-[#9e3432] to-[#b06939] text-white py-4 rounded-lg font-medium relative overflow-hidden group shadow-md hover:shadow-lg">
                          <span className="relative z-10 flex items-center justify-center text-lg">
                            Prenota Dolce Laguna 2
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
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Assistenza e altre opzioni di prenotazione - versione integrata */}
          <section className="py-16 bg-[#f9f7f4]">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {/* Titolo sezione */}
                <motion.div 
                  className="text-center mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-[#942e2f] mb-4">Assistenza alla Prenotazione</h2>
                  <p className="text-[#942e2f]/80">
                    Il nostro staff è a tua disposizione per risolvere qualsiasi dubbio sul processo di prenotazione o per fornirti maggiori informazioni.
                  </p>
                </motion.div>

                {/* Contatti */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.a 
                    href="tel:+393341817894"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white shadow text-[#942e2f] rounded-lg hover:bg-[#9ccce4]/10 transition-colors border border-[#decebe]/30"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Phone className="h-5 w-5 text-[#9e3432]" />
                    <span className="font-medium">+39 334 181 7894</span>
                  </motion.a>
                  <motion.a 
                    href="mailto:info@dolcelaguna.com"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white shadow text-[#942e2f] rounded-lg hover:bg-[#9ccce4]/10 transition-colors border border-[#decebe]/30"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Mail className="h-5 w-5 text-[#9e3432]" />
                    <span className="font-medium">info@dolcelaguna.com</span>
                  </motion.a>
                  <motion.a 
                    href="https://wa.me/+393341817894"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white shadow text-[#942e2f] rounded-lg hover:bg-[#25D366]/10 transition-colors border border-[#decebe]/30"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="font-medium">WhatsApp</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </section>

          {/* Prenota anche tramite - separata con sfondo bianco */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-[#942e2f] mb-10 text-center">Prenota anche tramite</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Booking */}
                  <motion.div 
                    className="bg-[#f9f7f4] rounded-xl overflow-hidden shadow-md border border-[#003580]/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,53,128,0.15)" }}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#003580] mb-4">Booking.com</h3>
                      <p className="text-[#942e2f]/80 mb-6">
                        Consulta le recensioni e prenota attraverso la piattaforma Booking.com.
                      </p>
                      <motion.a 
                        href="https://www.booking.com/hotel/it/dolce-laguna.it.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="outline" className="w-full border-[#003580] text-[#003580] hover:bg-[#003580]/5 py-3 rounded-lg font-medium relative overflow-hidden flex items-center justify-center gap-2">
                          Visita Booking.com
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </motion.a>
                    </div>
                  </motion.div>
                  
                  {/* Airbnb */}
                  <motion.div 
                    className="bg-[#f9f7f4] rounded-xl overflow-hidden shadow-md border border-[#FF5A5F]/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(255,90,95,0.15)" }}
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#FF5A5F] mb-4">Airbnb</h3>
                      <p className="text-[#942e2f]/80 mb-6">
                        Scopri i nostri annunci e prenota attraverso la piattaforma Airbnb.
                      </p>
                      <motion.a 
                        href="https://www.airbnb.it/users/show/110584405"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button variant="outline" className="w-full border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F]/5 py-3 rounded-lg font-medium relative overflow-hidden flex items-center justify-center gap-2">
                          Visita Airbnb
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-[#942e2f]/70 italic">
                    Ricorda: prenotando direttamente otterrai sempre il miglior prezzo disponibile!
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Direct Booking Benefits */}
          <section className="py-16 bg-[#fcf8f3] relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <motion.div 
                  className="h-1 bg-[rgba(232,151,0,1)] mb-6 mx-auto w-[100px]"
                  initial={{ width: 0 }}
                  whileInView={{ width: 100 }}
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
                  Perché prenotare direttamente
                </motion.h2>
                <motion.p 
                  className="mt-4 text-lg text-[#942e2f]/70"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Scopri i vantaggi esclusivi della prenotazione diretta con Dolce Laguna
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    title: "Miglior Prezzo Garantito",
                    description: "Prenotando direttamente con noi avrai sempre la tariffa migliore, senza commissioni aggiuntive.",
                    icon: "💰",
                    color: "#b06939",
                    delay: 0.1
                  },
                  {
                    title: "Flessibilità Massima",
                    description: "Politiche di cancellazione più flessibili e possibilità di modificare la prenotazione.",
                    icon: "🗓️",
                    color: "#9e3432",
                    delay: 0.2
                  },
                  {
                    title: "Maggiore Personalizzazione",
                    description: "Prenotando direttamente è più facile soddisfare le tue esigenze specifiche e richieste particolari per un soggiorno su misura.",
                    icon: "⭐",
                    color: "rgba(232,151,0,1)",
                    delay: 0.3
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: benefit.delay }}
                  >
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: benefit.color }}>{benefit.title}</h3>
                    <p className="text-[#942e2f]/70">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/images/wave-pattern.svg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              ></div>
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
                    <a href="mailto:info@dolcelaguna.com" className="text-white/80 hover:text-white transition-colors">
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