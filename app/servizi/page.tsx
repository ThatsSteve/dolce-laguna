"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Coffee,
  Wifi,
  Car,
  Ship,
  Utensils,
  MapPin,
  Phone,
  Mail,
  Sun,
  Clock,
  Plane,
  Bus,
  Bike,
  Compass,
  ChevronRight,
  Heart,
  Info
} from "lucide-react"
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import OptimizedImage from "../../components/optimized-image"
import ScrollManager from "../../components/scroll-manager"
import useIntersectionObserver from "../../hooks/use-intersection-observer"
import { useI18n } from '../../context/i18n-context'

// Componente per le sezioni con effetto lazy
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

// Dati dei servizi offerti
const servicesData = [
  {
    id: "transfers",
    name: "Trasferimenti",
    icon: Car,
    color: "#b06939",
    description: "Vi aiutiamo a prenotare i trasferimenti con i servizi di trasporto locali. I prezzi indicati sono quelli generalmente applicati dai servizi di trasporto della zona per queste tratte. Non siamo affiliati con nessun servizio di trasporto, ma possiamo aiutarvi a contattare i servizi disponibili.",
    items: [
      { name: "Trasferimento dall'aeroporto Marco Polo", price: "da €25", icon: Plane },
      { name: "Trasferimento da Piazzale Roma", price: "da €20", icon: Bus },
      { name: "Trasferimento dalla stazione ferroviaria", price: "da €20", icon: Bus },
      { name: "Servizio NCC (auto con conducente)", price: "su richiesta", icon: Car }
    ],
    image: "/images/Homepage/Gli_spazi/reception.jpg"
  },
  {
    id: "dining",
    name: "Area Ristoro",
    icon: Coffee,
    color: "#9e3432",
    description: "La nostra area ristoro è a disposizione degli ospiti per momenti di relax e colazione. Offriamo una selezione di bevande calde e fredde, snack e prodotti confezionati per iniziare la giornata con energia.",
    items: [
      { name: "Colazione", price: "snack e bevande disponibili", icon: Coffee },
      { name: "Prodotti confezionati", price: "snack dolci e salati", icon: Coffee },
      { name: "Bevande calde", price: "caffè espresso, americano, tè e tisane", icon: Coffee },
      { name: "Area relax", price: "lounge con divanetti e poltrone", icon: Sun }
    ],
    image: "/images/Homepage/Gli_spazi/zona_colazioni.jpg"
  },
  {
    id: "internet",
    name: "Internet",
    icon: Wifi,
    color: "#9ccce4",
    description: "Connessione Wi-Fi ad alta velocità e sicura in tutta la struttura. La password è disponibile in camera e presso la reception.",
    items: [
      { name: "Wi-Fi ad alta velocità", price: "gratuito", icon: Wifi },
      { name: "Connessione sicura", price: "in tutta la struttura", icon: Wifi },
      { name: "Password Wi-Fi", price: "disponibile in camera e in reception", icon: Wifi }
    ],
    image: "/images/Homepage/Gli_spazi/lounge.jpg"
  },
  {
    id: "partner-restaurant",
    name: "Ristorante consigliato",
    icon: Utensils,
    color: "#b06939",
    description: "Abbiamo selezionato per voi un ristorante consigliato di qualità, dove potrete gustare l'autentica cucina italiana con uno sconto speciale riservato ai nostri ospiti.",
    items: [
      { name: "Pizzeria Al Quadrante", price: "Via Orlanda, 258, 30173 Venezia VE", icon: Utensils }
    ],
    image: "/images/Homepage/Gli_spazi/entrata.jpg"
  }
];

export default function ServiziPage() {
  const [activeTab, setActiveTab] = useState(servicesData[0].id);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useI18n();

  // Set isLoaded dopo il mount del componente
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
          {/* Hero Image */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            <OptimizedImage 
              src="/images/Homepage/383.jpg"
              alt="Servizi di Dolce Laguna"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  I Nostri Servizi
                </motion.h1>
                <motion.div 
                  className="h-1 bg-white w-[100px] mx-auto mb-6"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 100, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative py-4 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div 
                  className="h-1 bg-[#9e3432] mb-4 mx-auto w-[100px]"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 100, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.p
                  className="mt-4 text-lg md:text-xl text-[#942e2f]/80 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Scoprite tutti i servizi che Dolce Laguna mette a disposizione per rendere il vostro soggiorno 
                  un'esperienza indimenticabile. Dal trasferimento dall'aeroporto alla colazione, dai consigli sui 
                  ristoranti alle escursioni: ci prendiamo cura di ogni aspetto del vostro viaggio.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Services Tabs Section */}
          <section className="py-4 bg-white relative z-10">
            <div className="container mx-auto px-4">
              {/* Tabs Navigation - Implementazione manuale */}
              <div className="w-full max-w-3xl mx-auto mb-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                  {servicesData.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveTab(service.id)}
                      className={`flex items-center gap-2 py-3 px-3 border rounded-lg transition-all duration-300 ${
                        activeTab === service.id 
                          ? 'bg-white text-[#b06939] shadow-md border-[#decebe]' 
                          : 'border-[#decebe]/30 bg-[#decebe]/10'
                      }`}
                    >
                      <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: `${service.color}15` }}>
                        <service.icon className="h-4 w-4" style={{ color: service.color }} />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-left">{service.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Separatore */}
              <div className="h-4"></div>
              
              {/* Contenuto del servizio attivo */}
              <div className="w-full max-w-3xl mx-auto">
                {servicesData.map((service) => (
                  activeTab === service.id && (
                    <motion.div 
                      key={service.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white p-6 rounded-lg shadow-md border border-[#decebe]/20"
                    >
                      {/* Dettagli del servizio */}
                      <div>
                        <motion.div 
                          className="h-1 mb-3 w-[60px]"
                          style={{ backgroundColor: service.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: 60 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                        />
                        <h2 className="text-3xl font-bold mb-3" style={{ color: service.color }}>{service.name}</h2>
                        <p className="text-lg text-[#942e2f]/80 mb-5">{service.description}</p>
                        
                        {/* Lista servizi */}
                        <div className="space-y-5 mb-6">
                          <h3 className="text-xl font-semibold text-[#b06939] mb-3">Dettagli servizio</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.items.map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center p-3 bg-[#f9f7f4] rounded-lg"
                                whileHover={{ y: -3, boxShadow: "0 3px 10px rgba(0,0,0,0.08)" }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: `${service.color}20` }}>
                                  <item.icon className="h-4 w-4" style={{ color: service.color }} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-[#942e2f] font-medium text-sm">{item.name}</h4>
                                  <p className="text-xs text-[#942e2f]/70">{item.price}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        {/* CTA button */}
                        <div className="mt-5">
                          <Link href="/informazioni">
                            <Button 
                              className="bg-[#9e3432] hover:bg-[#b06939] text-white relative overflow-hidden group"
                              style={{ backgroundColor: service.color }}
                            >
                              <span className="relative z-10">Maggiori Informazioni</span>
                              <span className="absolute inset-0 bg-[#942e2f] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                            </Button>
                          </Link>
                        </div>
                        
                        {/* Disclaimer per i trasferimenti */}
                        {service.id === "transfers" && (
                          <div className="mt-4 p-4 bg-[#f9f7f4] rounded-lg border border-[#decebe]/30">
                            <h3 className="text-xl font-bold text-[#942e2f] mb-4">Note Importanti</h3>
                            <ul className="space-y-2 text-[#942e2f]/80">
                              <li className="flex items-start gap-2">
                                <Info className="h-5 w-5 text-[#b06939] mt-0.5 flex-shrink-0" />
                                <span>I prezzi indicati sono una media delle tariffe generalmente applicate dai servizi di trasporto della zona e potrebbero variare in base alla stagione, all'orario e alla disponibilità.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Info className="h-5 w-5 text-[#b06939] mt-0.5 flex-shrink-0" />
                                <span>Dolce Laguna non garantisce i prezzi dei trasferimenti in quanto non è affiliata a nessuno dei servizi di trasporto locali.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <Info className="h-5 w-5 text-[#b06939] mt-0.5 flex-shrink-0" />
                                <span>Consigliamo di prenotare i trasferimenti con anticipo, specialmente durante l'alta stagione.</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
              
              {/* Separatore */}
              <div className="h-4"></div>
            </div>
          </section>
          
          {/* Additional Services */}
          <LazySection id="additional-services" className="py-16 bg-[#fcf8f3] relative overflow-hidden">
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
                  Servizi su Richiesta
                </motion.h2>
                <motion.p 
                  className="mt-4 text-lg text-[#942e2f]/70 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Oltre ai servizi standard, offriamo una serie di servizi personalizzati su richiesta per 
                  rendere il vostro soggiorno ancora più speciale. Non esitate a contattarci per qualsiasi esigenza.
                </motion.p>
              </div>

              <motion.div 
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
              >
                {[
                  { 
                    title: "Biglietti Musei", 
                    description: "Prenotazione biglietti per musei e attrazioni senza fare code.", 
                    icon: Compass,
                    color: "#9ccce4" 
                  },
                  { 
                    title: "Prenotazione Taxi", 
                    description: "Assistenza nella prenotazione di taxi per trasferimenti da e per l'aeroporto.", 
                    icon: Car,
                    color: "#9e3432" 
                  },
                  { 
                    title: "Prenotazioni Ristoranti", 
                    description: "Prenotazioni presso i migliori ristoranti di Venezia con sconti esclusivi.", 
                    icon: Utensils,
                    color: "#b06939" 
                  },
                  { 
                    title: "Late Check-out", 
                    description: "Possibilità di late check-out su richiesta e in base alla disponibilità.", 
                    icon: Clock,
                    color: "#9e3432" 
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUpVariants}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6 relative overflow-hidden h-full flex flex-col">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon className="h-8 w-8" style={{ color: item.color }} />
                      </div>
                      <h3 className="text-xl font-semibold mb-4" style={{ color: item.color }}>
                        {item.title}
                      </h3>
                      <p className="text-[#942e2f]/70 mb-6 flex-grow">{item.description}</p>
                      
                      <div className="flex items-center text-sm text-[#942e2f]/50 hover:text-[#942e2f] transition-colors duration-300 mt-auto">
                        <Link href="/contatti" className="inline-flex items-center">
                          <span className="mr-1">Maggiori informazioni</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Decorative wave pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/images/wave-pattern.svg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              ></div>
            </div>
          </LazySection>

          {/* Contact Section */}
          <LazySection id="contact" className="py-16 md:py-24 bg-white relative overflow-hidden">
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
                    {t('requestInfo')}
                  </motion.h2>
                  <motion.p 
                    className="mt-4 text-lg text-[#942e2f]/70"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {t('infoServicesRequest')}
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-[#942e2f] mb-4">Contatti</h3>
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
                          <p className="text-[#942e2f]/80">Via Alessandria 41/b - 30173 - CIN: IT027042B4CSA6DFBW</p>
                        </motion.div>
                      </motion.li>
                      <motion.li 
                        className="flex items-start gap-2"
                        variants={fadeInUpVariants}
                      >
                        <motion.div 
                          whileHover={{ scale: 1.1, color: "#b06939" }}
                          transition={{ duration: 0.2 }}
                        >
                          <MapPin className="h-5 w-5 text-[#b06939] mt-0.5 flex-shrink-0" />
                        </motion.div>
                        <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                          <p className="text-[#942e2f]/80">Via Alessandria 43/a - 30173 - CIN: IT027042B4TDP8CF3K</p>
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
                        <motion.a
                          href="mailto:info@dolcelaguna.com"
                          className="text-[#942e2f]/80 hover:text-[#b06939] transition-colors"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          info@dolcelaguna.com
                        </motion.a>
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
                      <p className="text-[#942e2f]/80">
                        <strong>Check-in:</strong> dalle 15:00 alle 10:00 del giorno successivo
                      </p>
                      <p className="text-[#942e2f]/80">
                        <strong>Check-out:</strong> entro le 10:00
                      </p>
                      <p className="text-[#942e2f]/80">Reception disponibile h24</p>
                      <p className="text-[#942e2f]/80">Check-in notturni consentiti</p>
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
                  <Link href="/contatti" className="inline-block">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-[#9ccce4] hover:bg-[#9e3432] text-white px-8 py-6 text-lg relative overflow-hidden group rounded-lg">
                        <span className="relative z-10">{t('contactUs')}</span>
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