"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin, Copy, Check, X } from "lucide-react"
import { Button } from "../../components/ui/button"
import { motion } from "framer-motion"
import { useToast } from "../../components/ui/use-toast"
import { Dialog, DialogContent, DialogClose, DialogTrigger } from "../../components/ui/dialog"

export default function Contatti() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const [hasCopied, setHasCopied] = useState(false)
  const [hasCopied2, setHasCopied2] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setHasCopied(true);
    toast({
      title: "Indirizzo copiato!",
      description: "L'indirizzo è stato copiato negli appunti.",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleCopyAddress2 = (address) => {
    navigator.clipboard.writeText(address);
    setHasCopied2(true);
    toast({
      title: "Indirizzo copiato!",
      description: "L'indirizzo è stato copiato negli appunti.",
    });
    setTimeout(() => setHasCopied2(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section con immagine di sfondo */}
        <section
          ref={heroRef}
          className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
        >
          {/* Immagine di sfondo */}
          <div className="absolute inset-0">
            <Image
              src="/images/IMG_8223.jpg"
              alt="Contatti Dolce Laguna"
              fill
              className="object-cover brightness-[0.8]"
              priority
              sizes="100vw"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-black/5"></div>
            
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10 mix-blend-overlay"
              style={{
                backgroundImage: "url('/images/venetian-pattern.svg')",
                backgroundSize: "120px",
              }}
            ></div>
            
            {/* Overlay aggiuntivo per oscuramento */}
            <div className="absolute inset-0 bg-black/30"></div>
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
                  Contatti
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
              Siamo qui per aiutarti a pianificare il tuo soggiorno perfetto a Venezia. 
              Non esitare a contattarci per qualsiasi informazione o richiesta.
            </motion.p>
          </div>
        </section>

        {/* Sezione Informazioni di Contatto */}
        <section className="py-16 bg-[#f9f7f4]">
          <div className="container mx-auto px-4">
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#942e2f] mb-12"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <h2 className="text-2xl md:text-3xl font-cinzel text-[#942e2f] mb-6 relative">
                    Come Contattarci
                    <span className="absolute bottom-0 left-0 w-1/4 h-0.5 bg-[#b06939]"></span>
                  </h2>
                  
                  <motion.ul 
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.li 
                      className="flex items-start gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Phone className="text-[#b06939] h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-medium text-[#942e2f]">Telefono</h3>
                        <motion.a 
                          href="tel:+393341817894" 
                          className="text-[#942e2f]/80 hover:text-[#b06939] transition-colors"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          +39 334 181 7894
                        </motion.a>
                      </div>
                    </motion.li>
                    
                    <motion.li 
                      className="flex items-start gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Mail className="text-[#b06939] h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-medium text-[#942e2f]">Email</h3>
                        <motion.a 
                          href="mailto:info@dolcelaguna.com"
                          className="text-[#942e2f]/80 hover:text-[#b06939] transition-colors"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          info@dolcelaguna.com
                        </motion.a>
                      </div>
                    </motion.li>
                  </motion.ul>
                </div>

                <div className="lg:col-span-2">
                  <motion.div 
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-start gap-4"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="text-[#b06939] h-5 w-5 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-medium text-[#942e2f]">Indirizzo</h3>
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <p className="text-[#942e2f]/80 mb-1">Via Alessandria 43/a - 30173 Venezia</p>
                            <button 
                              onClick={() => handleCopyAddress("Via Alessandria 43/a - 30173 Venezia")}
                              className="inline-flex items-center text-sm text-[#b06939] hover:text-[#942e2f] mt-1 transition-colors"
                            >
                              {hasCopied ? (
                                <>
                                  <Check size={14} className="mr-1" />
                                  <span className="font-medium">Copiato!</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={14} className="mr-1" />
                                  <span className="border-b border-dashed border-[#b06939]/50">Copia indirizzo</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <div className="aspect-video rounded-lg overflow-hidden border border-[#decebe]/20 shadow-md">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.3442782456584!2d12.327831376889761!3d45.50332197107633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb4c7a6b55555%3A0x8d87f65f4d94d894!2sDolce%20Laguna%20Affittacamere!5e0!3m2!1sit!2sit"
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen={true}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start gap-4 border-t border-gray-100 pt-5"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className="text-[#b06939] h-5 w-5 mt-1" />
                      <div>
                        <h3 className="font-medium text-[#942e2f]">Orari</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-[#942e2f]/80">
                              <strong>Check-in:</strong> dalle 15:00 alle 10:00 del giorno successivo
                            </p>
                            <p className="text-[#942e2f]/80">
                              <strong>Check-out:</strong> entro le 10:00
                            </p>
                            <p className="text-[#942e2f]/80">Reception disponibile h24</p>
                            <p className="text-[#942e2f]/80">Check-in notturni consentiti</p>
                          </div>
                          <div>
                            <p className="text-[#942e2f]/80 font-medium">Deposito Bagagli</p>
                            <p className="text-[#942e2f]/80">Servizio gratuito disponibile per gli ospiti</p>
                            <p className="text-[#942e2f]/80 mt-2 font-semibold text-[#b06939]">Importante:</p>
                            <p className="text-[#942e2f]/80">La struttura si esonera totalmente dalla responsabilità dei bagagli depositati. Si consiglia di non lasciare oggetti di valore.</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Sezione Referenti */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-cinzel text-[#942e2f] inline-block relative">
                  I Nostri Referenti
                  <motion.span 
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-[#b06939]"
                    initial={{ width: 0, left: "50%" }}
                    whileInView={{ width: "100%", left: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  ></motion.span>
                </h2>
              </motion.div>
              
              <div className="grid grid-cols-1 gap-8">
                {/* Responsabile Customer Care */}
                <motion.div 
                  className="bg-white shadow-md rounded-lg overflow-hidden border-t-4 border-[rgba(232,151,0,1)]"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <div className="absolute inset-0 bg-[#decebe]/20"></div>
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <div className="w-28 h-28 rounded-full bg-[#942e2f]/10 flex items-center justify-center">
                          <span className="text-4xl font-bold text-[#942e2f]">S</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-medium text-[#942e2f] mb-1">Sem</h3>
                      <p className="text-[#b06939] mb-4">Responsabile Customer Care</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Phone className="text-[#b06939] h-4 w-4" />
                          <span className="text-[#942e2f]/80">+39 334 181 7894</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="text-[#b06939] h-4 w-4" />
                          <span className="text-[#942e2f]/80">Orari di reperibilità: h24</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[#942e2f]/80 font-medium">Lingue parlate:</p>
                          <div className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <Image src="/images/flags/it.svg" alt="Italiano" width={24} height={18} className="rounded-sm shadow-sm" />
                              <span className="text-xs text-[#942e2f]/70 mt-1">Italiano</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image src="/images/flags/gb.svg" alt="English" width={24} height={18} className="rounded-sm shadow-sm" />
                              <span className="text-xs text-[#942e2f]/70 mt-1">English</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image src="/images/flags/fr.svg" alt="Français" width={24} height={18} className="rounded-sm shadow-sm" />
                              <span className="text-xs text-[#942e2f]/70 mt-1">Français</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <Image src="/images/flags/sa.svg" alt="العربية" width={24} height={18} className="rounded-sm shadow-sm" />
                              <span className="text-xs text-[#942e2f]/70 mt-1">العربية</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button 
                            className="w-full bg-gradient-to-r from-[#942e2f] to-[#b06939] hover:from-[#b06939] hover:to-[#942e2f] text-white font-medium py-6 text-lg relative overflow-hidden group transition-all duration-500 transform hover:scale-105 hover:shadow-xl"
                            onClick={() => window.location.href = 'tel:+393341817894'}
                          >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <Phone className="h-5 w-5" />
                              Contatta Ora
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#b06939] to-[#942e2f] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Sezione Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-10 rounded-lg shadow-md text-center border-b-4 border-[#9e3432]"
            >
              <h2 className="text-2xl font-cinzel text-[#942e2f] mb-6 inline-block relative">
                Seguici sui Social
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-[#b06939]"
                  initial={{ width: 0, left: "50%" }}
                  whileInView={{ width: "100%", left: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.span>
              </h2>
              <p className="text-[#942e2f]/80 mb-8 max-w-2xl mx-auto">
                Resta aggiornato sulle nostre offerte speciali e scopri gli eventi nella magnifica Venezia seguendoci sui nostri canali social.
              </p>
              
              <div className="flex justify-center items-center gap-6">
                <motion.a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center text-[#942e2f] hover:bg-[#942e2f] hover:text-white transition-colors duration-300"
                >
                  <Facebook size={24} />
                </motion.a>
                
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center text-[#942e2f] hover:bg-[#942e2f] hover:text-white transition-colors duration-300"
                >
                  <Instagram size={24} />
                </motion.a>
                
                <motion.a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center text-[#942e2f] hover:bg-[#942e2f] hover:text-white transition-colors duration-300"
                >
                  <Twitter size={24} />
                </motion.a>
                
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 rounded-full bg-[#f9f7f4] flex items-center justify-center text-[#942e2f] hover:bg-[#942e2f] hover:text-white transition-colors duration-300"
                >
                  <Linkedin size={24} />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-[rgba(232,151,0,1)] hover:bg-[#b06939] text-white px-8 py-6 text-lg relative overflow-hidden group rounded-lg">
                      <span className="relative z-10">Prenota Ora</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[rgba(232,151,0,1)] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-0 rounded-2xl overflow-hidden border-none shadow-2xl bg-gradient-to-b from-white to-[#f8f6f2]">
                  <div className="p-8">
                    <div className="mb-8 text-center">
                      <h2 className="text-2xl font-bold text-[#b06939] mb-2">Prenota il tuo soggiorno</h2>
                      <p className="text-[#942e2f]/70 text-sm">Scegli il canale preferito per la tua prenotazione</p>
                    </div>

                    {/* Primary booking option */}
                    <div className="mb-8">
                      <Button
                        className="w-full bg-gradient-to-r from-[rgba(232,151,0,1)] to-[#b06939] text-white py-5 text-lg relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
                        onClick={() => window.open("https://dolcelaguna.it/prenota", "_blank")}
                      >
                        <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          Prenota qui per il miglior prezzo
                        </span>
                      </Button>
                    </div>

                    {/* Divider with text */}
                    <div className="relative flex items-center justify-center mb-6">
                      <div className="flex-grow border-t border-gray-200"></div>
                      <span className="flex-shrink mx-4 text-gray-500">Oppure</span>
                      <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Secondary booking options */}
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="w-full border-[#003580] text-[#003580] hover:bg-[#003580]/5 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md"
                        onClick={() =>
                          window.open("https://www.booking.com/hotel/it/dolce-laguna.it.html", "_blank")
                        }
                      >
                        <span>Booking.com</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F]/5 py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-md"
                        onClick={() => window.open("https://www.airbnb.it/users/show/110584405", "_blank")}
                      >
                        <span>Airbnb</span>
                      </Button>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <DialogClose className="text-[#942e2f]/60 hover:text-[#942e2f] text-sm underline">
                        Chiudi
                      </DialogClose>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer - Esattamente come nella homepage ma con animazioni migliorate */}
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
              <h3 className="text-lg font-semibold mb-4 text-white">Link Utili</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/camere" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Camere
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/servizi" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Servizi
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/contatti" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Contatti
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/informazioni" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Informazioni
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link href="/privacy" className="text-white/80 hover:text-[#decebe] transition-colors">
                    Privacy Policy
                  </Link>
                </motion.li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">La nostra posizione</h3>
              <motion.div 
                className="aspect-video rounded-lg overflow-hidden border border-white/20 shadow-sm"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.3442782456584!2d12.327831376889761!3d45.50332197107633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb4c7a6b55555%3A0x8d87f65f4d94d894!2sDolce%20Laguna%20Affittacamere!5e0!3m2!1sit!2sit"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/70"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p>DOLCE LAGUNA di FF Hospitality s.r.l. - Tutti i diritti riservati</p>
          </motion.div>
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

      <style jsx global>{`
        .button-container .shiny-overlay {
          background: linear-gradient(
            90deg, 
            rgba(255,255,255,0) 0%, 
            rgba(255,255,255,0.2) 50%, 
            rgba(255,255,255,0) 100%
          );
          transform: translateX(-100%);
          animation: shine 3s infinite linear;
        }

        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
} 