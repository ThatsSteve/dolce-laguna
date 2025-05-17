"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Info, CheckCircle2, Calendar, Bed, Utensils, Bus, Car, Bath, Tv, Wifi, LockKeyhole, KeyRound, X, Download, FileText, Luggage } from "lucide-react"
import { Button } from "../../components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { useToast } from "../../components/ui/use-toast"
import { Dialog, DialogContent, DialogClose, DialogTrigger } from "../../components/ui/dialog"

export default function Informazioni() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const { toast } = useToast()
  const [scrolled, setScrolled] = useState(false)
  
  // Riferimenti per le sezioni
  const checkinRef = useRef(null)
  const serviziRef = useRef(null)
  const parcheggioRef = useRef(null)
  const colazioneRef = useRef(null)
  const interessiRef = useRef(null)
  
  // Riferimento per il titolo dell'indice
  const indexTitleRef = useRef(null)
  
  // Funzione per lo scorrimento animato
  const scrollToSection = (elementRef) => {
    if (elementRef && elementRef.current) {
      // Offset per mostrare anche il titolo
      const yOffset = -100; 
      const y = elementRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    setIsLoaded(true)
    
    // Gestione del click sui link dell'indice dalla URL
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#checkin" && checkinRef.current) {
        scrollToSection(checkinRef);
      } else if (hash === "#servizi" && serviziRef.current) {
        scrollToSection(serviziRef);
      } else if (hash === "#parcheggio" && parcheggioRef.current) {
        scrollToSection(parcheggioRef);
      } else if (hash === "#colazione" && colazioneRef.current) {
        scrollToSection(colazioneRef);
      } else if (hash === "#interessi" && interessiRef.current) {
        scrollToSection(interessiRef);
      }
    };
    
    // Controlla l'hash all'avvio
    if (window.location.hash) {
      setTimeout(handleHashChange, 500);
    }
    
    // Listener per i cambiamenti di hash
    window.addEventListener("hashchange", handleHashChange);
    
    // Listener per controllare lo scroll e nascondere il titolo dell'indice
    const handleScroll = () => {
      if (indexTitleRef.current) {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 200) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              src="/images/Esterni/003.jpg"
              alt="Informazioni Dolce Laguna"
              fill
              className="object-cover brightness-[0.8]"
              priority
              sizes="100vw"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
            
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
                  Informazioni
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
              Tutto ciò che devi sapere per rendere il tuo soggiorno al Dolce Laguna
              un'esperienza indimenticabile.
            </motion.p>
          </div>
        </section>

        {/* Nuova sezione per scaricare l'informativa completa */}
        <section className="py-6 bg-gradient-to-r from-[#f9f7f4] to-[#f6ece2]">
          <div className="container mx-auto px-4">
             <motion.div 
               className="bg-white rounded-xl shadow-md overflow-hidden"
               initial={{ opacity: 0, y: 10, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
               whileInView={{ 
                 opacity: 1, 
                 y: 0,
                 boxShadow: "0 10px 25px -5px rgba(148, 46, 47, 0.1), 0 8px 10px -6px rgba(176, 105, 57, 0.1)"
               }}
               transition={{ duration: 0.5 }}
               viewport={{ once: true }}
             >
               <div className="p-6 md:p-8">
                 <div className="md:flex md:items-center md:justify-between">
                   <div className="flex-1">
                     <h2 className="text-2xl font-cinzel text-[#942e2f] mb-3">Informativa Completa</h2>
                     <p className="text-[#942e2f]/80 mb-4 md:mb-0 md:pr-6">
                       Scarica il documento PDF con tutte le informazioni dettagliate sul nostro albergo,
                       le politiche di soggiorno, servizi e molto altro. Un riferimento pratico per il tuo soggiorno.
                     </p>
                   </div>
                   <div className="mt-4 md:mt-0 md:flex-shrink-0">
                     <motion.div
                       whileHover={{ scale: 1.05 }}
                       transition={{ type: "spring", stiffness: 400, damping: 10 }}
                     >
                       <Button className="bg-[#942e2f] hover:bg-[#7a2421] text-white px-5 py-2 flex items-center gap-2 whitespace-nowrap" asChild>
                         <Link href="/images/informativaITA_DolceLaguna.pdf" download>
                           <Download className="h-4 w-4" />
                           <span>Scarica PDF</span>
                         </Link>
                       </Button>
                     </motion.div>
                   </div>
                 </div>
               </div>
             </motion.div>
           </div>
         </section>

        {/* Sezione Indice con navigazione */}
        <section className="py-0 bg-[#f9f7f4]">
          <div className="container mx-auto px-4">
            {/* Indice universale (orizzontale e sticky) */}
            <div className="sticky top-24 z-30 -mx-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-md py-2 px-2 relative rounded-xl mx-4 transition-all duration-300"
              >
                {/* Linea decorativa che copre l'intera larghezza */}
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#942e2f]/30 via-[#b06939]/50 to-[#942e2f]/30 rounded-full"></div>
                
                <div className="flex justify-between items-center px-4 pb-1">
                  <h3 className="text-sm font-medium text-[#942e2f]">Indice</h3>
                  <span className="text-xs text-[#942e2f]/60 lg:hidden">scorrere →</span>
                </div>
                
                <div className="overflow-x-auto scrollbar-hide px-4">
                  <div className="flex space-x-7 pb-1 min-w-max lg:justify-center">
                    <button 
                      onClick={() => scrollToSection(checkinRef)}
                      className="flex flex-col items-center justify-center transition-all duration-300 min-w-[55px] lg:min-w-[65px] group"
                    >
                      <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#942e2f]/10 flex items-center justify-center group-hover:bg-[#942e2f]/20 group-hover:scale-110 transition-all duration-300">
                        <Clock className="h-5 w-5 lg:h-5 lg:w-5 text-[#942e2f]" />
                      </div>
                      <span className="text-xs text-[#942e2f]/80 mt-1 whitespace-nowrap group-hover:text-[#942e2f] transition-colors">Check-in</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection(serviziRef)}
                      className="flex flex-col items-center justify-center transition-all duration-300 min-w-[55px] lg:min-w-[65px] group"
                    >
                      <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#b06939]/10 flex items-center justify-center group-hover:bg-[#b06939]/20 group-hover:scale-110 transition-all duration-300">
                        <Bed className="h-5 w-5 lg:h-5 lg:w-5 text-[#b06939]" />
                      </div>
                      <span className="text-xs text-[#942e2f]/80 mt-1 whitespace-nowrap group-hover:text-[#942e2f] transition-colors">Servizi</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection(parcheggioRef)}
                      className="flex flex-col items-center justify-center transition-all duration-300 min-w-[55px] lg:min-w-[65px] group"
                    >
                      <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[rgba(232,151,0,0.1)] flex items-center justify-center group-hover:bg-[rgba(232,151,0,0.2)] group-hover:scale-110 transition-all duration-300">
                        <Car className="h-5 w-5 lg:h-5 lg:w-5 text-[rgba(232,151,0,1)]" />
                      </div>
                      <span className="text-xs text-[#942e2f]/80 mt-1 whitespace-nowrap group-hover:text-[#942e2f] transition-colors">Trasporti</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection(colazioneRef)}
                      className="flex flex-col items-center justify-center transition-all duration-300 min-w-[55px] lg:min-w-[65px] group"
                    >
                      <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#9ccce4]/10 flex items-center justify-center group-hover:bg-[#9ccce4]/20 group-hover:scale-110 transition-all duration-300">
                        <Utensils className="h-5 w-5 lg:h-5 lg:w-5 text-[#9ccce4]" />
                      </div>
                      <span className="text-xs text-[#942e2f]/80 mt-1 whitespace-nowrap group-hover:text-[#942e2f] transition-colors">Ristoro</span>
                    </button>
                    
                    <button 
                      onClick={() => scrollToSection(interessiRef)}
                      className="flex flex-col items-center justify-center transition-all duration-300 min-w-[55px] lg:min-w-[65px] group"
                    >
                      <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#decebe]/20 flex items-center justify-center group-hover:bg-[#decebe]/30 group-hover:scale-110 transition-all duration-300">
                        <MapPin className="h-5 w-5 lg:h-5 lg:w-5 text-[#b06939]" />
                      </div>
                      <span className="text-xs text-[#942e2f]/80 mt-1 whitespace-nowrap group-hover:text-[#942e2f] transition-colors">Interessi</span>
                    </button>
                    
                    <Link
                      href="/contatti" 
                      className="flex flex-col items-center justify-center transition-all duration-300 min-w-[55px] lg:min-w-[65px] group"
                    >
                      <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#9e3432] flex items-center justify-center group-hover:bg-[#9e3432]/90 group-hover:scale-110 transition-all duration-300">
                        <Phone className="h-5 w-5 lg:h-5 lg:w-5 text-white" />
                      </div>
                      <span className="text-xs text-[#942e2f] font-medium mt-1 whitespace-nowrap group-hover:text-[#9e3432] transition-colors">Contatti</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Aggiungo uno spazio maggiore tra l'indice e il contenuto del check-in */}
            <div className="h-8"></div>

            <div className="grid grid-cols-1 gap-8">
              {/* Contenuto principale */}
              <div>
                {/* Check-in e Check-out */}
                <motion.div 
                  ref={checkinRef}
                  id="checkin"
                  className="bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-[#942e2f] scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#942e2f]/10">
                      <Clock className="h-6 w-6 text-[#942e2f]" />
                    </div>
                    <h3 className="text-2xl font-cinzel text-[#942e2f]">Check-in e Check-out</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Clock className="text-[#b06939] h-4 w-4" />
                          <div>
                            <p className="text-[#942e2f]/80">
                              <strong>Check-in:</strong> dalle 15:00 alle 10:00 del giorno successivo
                            </p>
                            <p className="text-[#942e2f]/80">
                              <strong>Check-out:</strong> entro le 10:00
                            </p>
                            <p className="text-[#942e2f]/80">Reception disponibile 24/7</p>
                            <p className="text-[#942e2f]/80">Check-in notturni consentiti</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Luggage className="text-[#b06939] h-4 w-4 mt-1" />
                          <div>
                            <p className="text-[#942e2f]/80 font-medium">Deposito Bagagli</p>
                            <p className="text-[#942e2f]/80">Servizio gratuito disponibile per gli ospiti</p>
                            <p className="text-[#942e2f]/80 mt-2 font-semibold text-[#b06939]">Importante:</p>
                            <p className="text-[#942e2f]/80">La struttura si esonera totalmente dalla responsabilità dei bagagli depositati. Si consiglia di non lasciare oggetti di valore.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <LockKeyhole className="h-5 w-5 text-[#b06939]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#942e2f]">Self Check-in</h4>
                          <p className="mt-1 text-[#942e2f]/80">
                            Self check-in disponibile, chiedere per ulteriori informazioni.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-lg bg-[#decebe]/20 border-l-4 border-[#b06939]">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-[#b06939] mt-1" />
                      </div>
                      <div>
                        <p className="text-[#942e2f]/90 italic">
                          Per richieste speciali relative agli orari di check-in e check-out, 
                          contattaci in anticipo. Faremo del nostro meglio per venire incontro 
                          alle tue esigenze.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Servizi in struttura e dotazioni camere */}
                <motion.div 
                  ref={serviziRef}
                  id="servizi"
                  className="bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-[#b06939] scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#b06939]/10">
                      <Bed className="h-6 w-6 text-[#b06939]" />
                    </div>
                    <h3 className="text-2xl font-cinzel text-[#942e2f]">Servizi in struttura e dotazioni camere</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Bagno */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Bath className="h-5 w-5 text-[#b06939]" />
                        <h4 className="text-lg font-medium text-[#942e2f]">Bagno</h4>
                      </div>
                      <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                        <li className="list-disc">Bagno privato con doccia</li>
                        <li className="list-disc">Asciugacapelli</li>
                        <li className="list-disc">Shampoo</li>
                        <li className="list-disc">Acqua calda</li>
                      </ul>
                    </div>

                    {/* Camera da letto e lavanderia */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-[#b06939]" />
                        <h4 className="text-lg font-medium text-[#942e2f]">Camera da letto e lavanderia</h4>
                      </div>
                      <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                        <li className="list-disc">Lenzuola e asciugamani forniti</li>
                        <li className="list-disc">Carta igienica, sapone, essenziali da bagno</li>
                        <li className="list-disc">Grucce appendiabiti</li>
                        <li className="list-disc">Culla disponibile per famiglie</li>
                        <li className="list-disc">Lavatrice non disponibile</li>
                        <li className="list-disc">Ferro da stiro non disponibile</li>
                        <li className="list-disc">Servizio lavanderia self-service a 20 minuti in autobus</li>
                      </ul>
                    </div>

                    {/* Intrattenimento e soggiorno */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Tv className="h-5 w-5 text-[#b06939]" />
                        <h4 className="text-lg font-medium text-[#942e2f]">Intrattenimento e soggiorno</h4>
                      </div>
                      <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                        <li className="list-disc">TV</li>
                        <li className="list-disc">Sala comune con divani</li>
                        <li className="list-disc">Giardino e terrazza arredati</li>
                      </ul>
                    </div>

                    {/* Comfort e climatizzazione */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                          <path d="M9.5 21V16.5H7c-.9 0-1.3-1.1-.7-1.7l9-8.9c.6-.6 1.7-.2 1.7.7V11"></path>
                          <path d="M7 3h11a1 1 0 0 1 1 1v7"></path>
                        </svg>
                        <h4 className="text-lg font-medium text-[#942e2f]">Comfort e climatizzazione</h4>
                      </div>
                      <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                        <li className="list-disc">Aria condizionata</li>
                        <li className="list-disc">Riscaldamento</li>
                        <li className="list-disc">Ascensore</li>
                        <li className="list-disc">Area fumatori designata</li>
                      </ul>
                    </div>

                    {/* Sicurezza */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <LockKeyhole className="h-5 w-5 text-[#b06939]" />
                        <h4 className="text-lg font-medium text-[#942e2f]">Sicurezza</h4>
                      </div>
                      <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                        <li className="list-disc">Estintore</li>
                        <li className="list-disc">Kit di pronto soccorso</li>
                        <li className="list-disc">La struttura è videosorvegliata nelle parti comuni</li>
                      </ul>
                    </div>

                    {/* Internet e lavoro */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-[#b06939]" />
                        <h4 className="text-lg font-medium text-[#942e2f]">Internet e lavoro</h4>
                      </div>
                      <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                        <li className="list-disc">Wi-Fi gratuito in tutta la struttura</li>
                      </ul>
                    </div>

                    {/* Accesso e ingresso */}
                    <div className="space-y-4 md:col-span-2 lg:col-span-3">
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-5 w-5 text-[#b06939]" />
                        <h4 className="text-lg font-medium text-[#942e2f]">Accesso e ingresso</h4>
                      </div>
                      <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                        <li className="list-disc">Ingresso indipendente e privato su strada o edificio</li>
                        <li className="list-disc">Self check-in disponibile, chiedere per ulteriori informazioni</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Parcheggio e Trasporti */}
                <motion.div 
                  ref={parcheggioRef}
                  id="parcheggio"
                  className="bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-[rgba(232,151,0,1)] scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(232,151,0,0.1)]">
                      <Car className="h-6 w-6 text-[rgba(232,151,0,1)]" />
                    </div>
                    <h3 className="text-2xl font-cinzel text-[#942e2f]">Parcheggio e Trasporti</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Parcheggio */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-[#942e2f] flex items-center gap-2 mb-3">
                          <Car className="h-5 w-5 text-[#b06939]" />
                          <span>Parcheggio interno</span>
                        </h4>
                        <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                          <li className="list-disc">Gratuito</li>
                          <li className="list-disc">Scoperto</li>
                          <li className="list-disc">All'interno della proprietà</li>
                          <li className="list-disc">Disponibile solo durante il soggiorno (non è possibile lasciare l'auto dopo il check-out)</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-[#942e2f] flex items-center gap-2 mb-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                            <path d="M14.5 18V16.5L12 13H7V18"></path>
                            <path d="M18 18V16.5c0-.8-.7-1.5-1.5-1.5h-9c-.8 0-1.5.7-1.5 1.5V18"></path>
                            <path d="M2 6h20v12H2z"></path>
                          </svg>
                          <span>Collegamenti aeroportuali</span>
                        </h4>
                        <div className="text-[#942e2f]/80 mb-4">
                          <p>Aeroporto Venezia Marco Polo a 900 metri: raggiungibile a piedi o in taxi</p>
                        </div>
                        
                        <div className="text-[#942e2f]/80">
                          <p className="mb-2">Nessun servizio navetta, ma:</p>
                          <ul className="space-y-2 pl-7">
                            <li className="list-disc">Servizi di trasporto prenotabili in anticipo tramite la struttura (tariffa fissa: €20)</li>
                            <li className="list-disc">Possibilità di prenotazione anche per partenze all'alba (es. 4:30)</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Trasporto pubblico */}
                    <div>
                      <h4 className="text-lg font-medium text-[#942e2f] flex items-center gap-2 mb-3">
                        <Bus className="h-5 w-5 text-[#b06939]" />
                        <span>Trasporto pubblico</span>
                      </h4>

                      <div className="space-y-6">
                        <div>
                          <h5 className="font-medium text-[#942e2f]/90 mb-2">Autobus:</h5>
                          <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                            <li className="list-disc">Tessera – 350 m</li>
                            <li className="list-disc">Tessera Centro – 400 m</li>
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-medium text-[#942e2f]/90 mb-2">Treno:</h5>
                          <ul className="space-y-2 pl-7 text-[#942e2f]/80">
                            <li className="list-disc">Gaggio Porta Est – 8 km</li>
                            <li className="list-disc">Gaggio – 9 km</li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 relative overflow-hidden rounded-lg h-[220px]">
                        <div className="absolute inset-0 bg-[rgba(232,151,0,0.1)] flex items-center justify-center">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.3442782456584!2d12.327831376889761!3d45.50332197107633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb4c7a6b55555%3A0x8d87f65f4d94d894!2sDolce%20Laguna%20Affittacamere!5e0!3m2!1sit!2sit"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mappa Dolce Laguna"
                            className="absolute inset-0"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Colazione e Ristorazione */}
                <motion.div 
                  ref={colazioneRef}
                  id="colazione"
                  className="bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-[#9ccce4] scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#9ccce4]/10">
                      <Utensils className="h-6 w-6 text-[#9ccce4]" />
                    </div>
                    <h3 className="text-2xl font-cinzel text-[#942e2f]">Ristoro</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <p className="text-[#942e2f]/80 mb-4">
                        Area ristoro aperta h24 con possibilità di fare colazione con snack dolci e salati confezionati, caffè, tè, tisane e altre bevande e cibi.
                      </p>
                      
                      <ul className="space-y-3 pl-0">
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#decebe]/30 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                              <path d="m11.5 11.5 2-2"></path>
                              <path d="M19 5c-1.5-1.5-3.8-1.4-5.4.3L8.8 10l5.4 5.3 4.7-4.7c1.8-1.8 1.8-4.3.2-5.9"></path>
                              <path d="M13.1 6.1 5.4 13.8A1 1 0 0 0 5 14.5v1.9l2.3.5L13 11.2"></path>
                              <path d="M5 18h14"></path>
                            </svg>
                          </div>
                          <span className="text-[#942e2f]/80">Snack confezionati</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#decebe]/30 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                              <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                              <line x1="6" y1="2" x2="6" y2="4"></line>
                              <line x1="10" y1="2" x2="10" y2="4"></line>
                              <line x1="14" y1="2" x2="14" y2="4"></line>
                            </svg>
                          </div>
                          <span className="text-[#942e2f]/80">Caffè</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#decebe]/30 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                              <path d="M3 7h5.2a2 2 0 0 1 1.9 1.4L12 21"></path>
                              <path d="M18 21h3"></path>
                              <path d="M9 12h9.2a2 2 0 0 0 1.9-1.4l.9-2.8a2 2 0 0 0-1.9-2.8H12"></path>
                              <path d="M8 7V5c0-1 .5-2 2-2h3.9"></path>
                            </svg>
                          </div>
                          <span className="text-[#942e2f]/80">Tè e tisane</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="relative h-full">
                      <div className="rounded-lg overflow-hidden shadow-md h-[280px] relative">
                        <Image
                          src="/images/Homepage/Gli_spazi/zona_colazioni.jpg"
                          alt="Area colazioni Dolce Laguna"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <span className="text-lg font-medium">La nostra area colazioni</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Punti di Interesse nelle Vicinanze */}
                <motion.div 
                  ref={interessiRef}
                  id="interessi"
                  className="bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-[#decebe] scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#decebe]/20">
                      <MapPin className="h-6 w-6 text-[#b06939]" />
                    </div>
                    <h3 className="text-2xl font-cinzel text-[#942e2f]">Punti di Interesse nelle Vicinanze</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-7 space-y-6">
                      <div>
                        <h4 className="text-lg font-medium text-[#942e2f] flex items-center gap-2 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                            <path d="M20.9 9.5c.8 8.7-5.9 14.6-11.3 15.4"></path>
                            <path d="M6.3 10a9 9 0 0 0 13.2 0"></path>
                            <circle cx="12" cy="6" r="3"></circle>
                          </svg>
                          <span>Attrazioni raggiungibili da Tessera/Venezia</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ul className="space-y-2 text-[#942e2f]/80">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Ca' d'Oro – 10 km</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Ponte della Costituzione – 10 km</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Ponte di Rialto – 10 km</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Giardino Papadopoli – 10 km</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Scuola Grande di San Rocco – 10 km</span>
                            </li>
                          </ul>
                          <ul className="space-y-2 text-[#942e2f]/80">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Procuratie Vecchie – 10 km</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Piazza San Marco – 10 km</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Palazzo Ducale – 10 km</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                              <span>Sestiere di San Polo – 11 km</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-medium text-[#942e2f] flex items-center gap-2 mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                            <path d="M14.5 18V16.5L12 13H7V18"></path>
                            <path d="M18 18V16.5c0-.8-.7-1.5-1.5-1.5h-9c-.8 0-1.5.7-1.5 1.5V18"></path>
                            <path d="M2 6h20v12H2z"></path>
                          </svg>
                          <span>Aeroporti</span>
                        </h4>
                        <ul className="space-y-2 text-[#942e2f]/80">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                            <span>Aeroporto di Venezia Marco Polo – 900 m</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                            <span>Aeroporto di Treviso – Antonio Canova – 25 km</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <div className="bg-[#f9f7f4] rounded-lg p-5 h-full">
                        <h4 className="text-lg font-medium text-[#942e2f] mb-4 flex items-center gap-2">
                          <Utensils className="h-5 w-5 text-[#b06939]" />
                          <span>Ristorante Consigliato</span>
                        </h4>
                        
                        <div className="space-y-4">
                          <div className="p-3 bg-white rounded-lg border border-[#decebe]/30 transition-all duration-300 hover:shadow-md">
                            <h5 className="font-medium text-[#942e2f]">Pizzeria Al Quadrante</h5>
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center gap-1 text-[#942e2f]/70 text-sm">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>Via Orlanda, 258, 30173 Venezia VE</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-[#942e2f] flex items-center gap-2 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#b06939]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                      <span>Centri di svago</span>
                    </h4>
                    <ul className="space-y-2 text-[#942e2f]/80">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                        <span>Casinò di Venezia Ca' Noghera – 800 m dalla struttura</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                        <span>Casinò di Venezia, Calle Seconda del Cristo – 10 km</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#b06939] mt-1" />
                        <span>Locali notturni</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Sezione Animali */}
                <motion.div 
                  className="bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-[#9ccce4] scroll-mt-24"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#9ccce4]/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#9ccce4]">
                        <path d="M10 5.172C10 3.386 8.214 2 6 2S2 3.386 2 5.172c0 1.786 1.786 3.172 4 3.172s4-1.386 4-3.172z"></path>
                        <path d="M14 5.172c0-1.786 1.786-3.172 4-3.172s4 1.386 4 3.172c0 1.786-1.786 3.172-4 3.172s-4-1.386-4-3.172z"></path>
                        <path d="M10 15.172c0-1.786 1.786-3.172 4-3.172s4 1.386 4 3.172c0 1.786-1.786 3.172-4 3.172s-4-1.386-4-3.172z"></path>
                        <path d="M6 8.172c-1.786 0-3.172 1.386-3.172 3.172 0 1.786 1.386 3.172 3.172 3.172"></path>
                        <path d="M14 8.172c1.786 0 3.172 1.386 3.172 3.172 0 1.786-1.386 3.172-3.172 3.172"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-cinzel text-[#942e2f]">Animali</h3>
                  </div>

                  <div className="bg-[#f9f7f4] rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Info className="h-6 w-6 text-[#b06939] mt-1" />
                      </div>
                      <div>
                        <p className="text-[#942e2f]/80 mb-4">
                          Per informazioni riguardo l'accesso con animali domestici, vi preghiamo di contattarci telefonicamente. 
                          Il nostro staff sarà lieto di fornirvi tutte le informazioni necessarie e le condizioni specifiche per il soggiorno con il vostro animale.
                        </p>
                        <a 
                          href="tel:+393341817894" 
                          className="inline-flex items-center gap-2 text-[#b06939] hover:text-[#942e2f] transition-colors"
                        >
                          <Phone className="h-4 w-4" />
                          <span>+39 334 181 7894</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer riassuntivo */}
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-md mb-8 border-t-4 border-[#942e2f] container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <Info className="h-6 w-6 text-[#942e2f]" />
            </div>
            <div>
              <h3 className="text-2xl font-cinzel text-[#942e2f] mb-4">Nota importante</h3>
              <div className="space-y-4 text-[#942e2f]/80">
                <p>
                  Per qualsiasi richiesta speciale relativa al tuo soggiorno, non esitare a contattarci in anticipo. 
                  Il nostro staff farà del proprio meglio per venire incontro alle tue esigenze.
                </p>
                <p>
                  Dolce Laguna si impegna a rendere il tuo soggiorno il più confortevole possibile. 
                  La nostra posizione strategica offre facile accesso all'aeroporto e alle principali attrazioni veneziane.
                </p>
                <p>
                  Per ulteriori dettagli su servizi, trasporti, o consigli su itinerari e ristoranti, 
                  il nostro personale è sempre a tua disposizione.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer - Esattamente come nella homepage con animazioni migliorate */}
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
    </div>
  )
} 