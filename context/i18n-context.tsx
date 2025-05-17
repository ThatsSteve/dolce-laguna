"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'

// Define the structure of our translations
export type Translations = {
  [key: string]: string;
}

// Define available languages
export const languageOptions = [
  { id: 'it', label: 'Italiano', short: 'IT', flag: '/images/flags/it.svg' },
  { id: 'en', label: 'English', short: 'EN', flag: '/images/flags/gb.svg' },
  { id: 'de', label: 'Deutsch', short: 'DE', flag: '/images/flags/de.svg' },
  { id: 'fr', label: 'Français', short: 'FR', flag: '/images/flags/fr.svg' }
];

// Define translations structure
interface TranslationsData {
  [language: string]: Translations;
}

// Default translations - only navigation items for now, will be extended later
const defaultTranslations: TranslationsData = {
  it: {
    home: "Home",
    rooms: "Camere",
    services: "Servizi",
    contacts: "Contatti",
    information: "Informazioni",
    bookNow: "Prenota Ora",
    whoWeAre: "Chi Siamo",
    whyChooseUs: "Perché Sceglierci",
    ourRooms: "Le Nostre Camere",
    contactUs: "Contattaci",
    descriptionShort: "Un'esperienza di soggiorno unica che unisce il fascino veneziano al comfort moderno, in posizione strategica vicino a Venezia e all'aeroporto",
    descriptionIntro: "Dolce Laguna nasce dalla trasformazione di due eleganti complessi residenziali in accoglienti bed & breakfast, dove l'ospitalità si fonde con il comfort moderno. La nostra posizione strategica, a soli 5 minuti dall'aeroporto Marco Polo e a 15 minuti dal centro storico di Venezia, ci rende il punto di partenza ideale per esplorare la città lagunare e le meraviglie della terraferma.",
    descriptionDetails: "Il nostro staff multilingue garantisce un'esperienza di soggiorno personalizzata, con flessibilità negli orari di check-in e check-out. Gli ambienti, arredati in stile mediterraneo-veneziano, combinano eleganza e calore per offrirvi un perfetto equilibrio tra comodità, comfort e accessibilità, sia per viaggi d'affari che per vacanze.",
    welcomeTo: "Benvenuti al Dolce Laguna",
    luxuryAndComfort: "Un'oasi di lusso e comfort nel cuore di Venezia",
    breathtakingView: "Vista mozzafiato",
    enjoyThePanorama: "Goditi il panorama unico sulla laguna veneziana",
    unforgettableExperience: "Esperienza indimenticabile",
    liveTheMagic: "Vivi la magia di Venezia in un ambiente esclusivo",
    luxuryAndComfortTitle: "Lusso e Comfort",
    enjoyTheComfort: "Goditi il massimo del comfort in un ambiente raffinato",
    uniqueAtmosphere: "Atmosfera Unica",
    liveAnUnforgettableExperience: "Vivi un'esperienza indimenticabile nel cuore di Venezia",
    readyToBook: "Pronto a prenotare il tuo soggiorno?",
    contactUsForBooking: "Contattaci direttamente per prenotare la tipologia di camera ideale o per richiedere ulteriori informazioni. Il nostro staff sarà felice di aiutarti a pianificare il tuo soggiorno perfetto.",
    links: "Collegamenti",
    requestInfo: "Richiedi Informazioni",
    infoServicesRequest: "Per qualsiasi informazione sui nostri servizi, non esitate a contattarci. Saremo lieti di rispondere a tutte le vostre domande.",
    usefulLinks: "Link Utili",
    privacyPolicy: "Privacy Policy",
    siteTitle: "Dolce Laguna - Alloggio Mediterraneo",
    siteDescription: "Scopri l'eleganza mediterranea nel cuore di Venezia",
    roomsPageTitle: "Camere - Dolce Laguna",
    roomsPageDescription: "Le nostre eleganti camere per un soggiorno indimenticabile vicino a Venezia",
    servicesPageTitle: "Servizi - Dolce Laguna",
    servicesPageDescription: "Scopri tutti i servizi offerti per rendere il tuo soggiorno eccezionale",
    contactsPageTitle: "Contatti - Dolce Laguna",
    contactsPageDescription: "Contattaci per informazioni e prenotazioni",
    infoPageTitle: "Informazioni - Dolce Laguna",
    infoPageDescription: "Informazioni utili sul tuo soggiorno al Dolce Laguna"
  },
  en: {
    home: "Home",
    rooms: "Rooms",
    services: "Services",
    contacts: "Contacts",
    information: "Information",
    bookNow: "Book Now",
    whoWeAre: "Who We Are",
    whyChooseUs: "Why Choose Us",
    ourRooms: "Our Rooms",
    contactUs: "Contact Us",
    descriptionShort: "A unique accommodation experience that combines Venetian charm with modern comfort, in a strategic location near Venice and the airport",
    descriptionIntro: "Dolce Laguna was born from the transformation of two elegant residential complexes into welcoming bed & breakfasts, where hospitality merges with modern comfort. Our strategic location, just 5 minutes from Marco Polo Airport and 15 minutes from the historic center of Venice, makes us the ideal starting point to explore the lagoon city and the wonders of the mainland.",
    descriptionDetails: "Our multilingual staff ensures a personalized stay experience, with flexibility in check-in and check-out times. The environments, furnished in Mediterranean-Venetian style, combine elegance and warmth to offer you a perfect balance between convenience, comfort and accessibility, both for business trips and holidays.",
    welcomeTo: "Welcome to Dolce Laguna",
    luxuryAndComfort: "An oasis of luxury and comfort in the heart of Venice",
    breathtakingView: "Breathtaking View",
    enjoyThePanorama: "Enjoy the unique panorama of the Venetian lagoon",
    unforgettableExperience: "Unforgettable Experience",
    liveTheMagic: "Experience the magic of Venice in an exclusive environment",
    luxuryAndComfortTitle: "Luxury and Comfort",
    enjoyTheComfort: "Enjoy maximum comfort in a refined environment",
    uniqueAtmosphere: "Unique Atmosphere",
    liveAnUnforgettableExperience: "Live an unforgettable experience in the heart of Venice",
    readyToBook: "Ready to book your stay?",
    contactUsForBooking: "Contact us directly to book the ideal room type or to request more information. Our staff will be happy to help you plan your perfect stay.",
    links: "Links",
    requestInfo: "Request Information",
    infoServicesRequest: "For any information about our services, do not hesitate to contact us. We will be happy to answer all your questions.",
    usefulLinks: "Useful Links",
    privacyPolicy: "Privacy Policy",
    siteTitle: "Dolce Laguna - Mediterranean Accommodation",
    siteDescription: "Discover Mediterranean elegance in the heart of Venice",
    roomsPageTitle: "Rooms - Dolce Laguna",
    roomsPageDescription: "Our elegant rooms for an unforgettable stay near Venice",
    servicesPageTitle: "Services - Dolce Laguna",
    servicesPageDescription: "Discover all the services offered to make your stay exceptional",
    contactsPageTitle: "Contacts - Dolce Laguna",
    contactsPageDescription: "Contact us for information and reservations",
    infoPageTitle: "Information - Dolce Laguna",
    infoPageDescription: "Useful information about your stay at Dolce Laguna"
  },
  de: {
    home: "Startseite",
    rooms: "Zimmer",
    services: "Dienstleistungen",
    contacts: "Kontakt",
    information: "Informationen",
    bookNow: "Jetzt Buchen",
    whoWeAre: "Wer Wir Sind",
    whyChooseUs: "Warum Uns Wählen",
    ourRooms: "Unsere Zimmer",
    contactUs: "Kontaktieren Sie Uns",
    descriptionShort: "Eine einzigartige Unterkunftserfahrung, die venezianischen Charme mit modernem Komfort verbindet, an einem strategischen Standort in der Nähe von Venedig und dem Flughafen",
    descriptionIntro: "Dolce Laguna entstand aus der Umwandlung von zwei eleganten Wohnkomplexen in einladende Bed & Breakfasts, wo Gastfreundschaft auf modernen Komfort trifft. Unsere strategische Lage, nur 5 Minuten vom Flughafen Marco Polo und 15 Minuten vom historischen Zentrum Venedigs entfernt, macht uns zum idealen Ausgangspunkt, um die Lagunenstadt und die Wunder des Festlandes zu erkunden.",
    descriptionDetails: "Unser mehrsprachiges Personal sorgt für ein personalisiertes Aufenthaltserlebnis mit flexiblen Check-in- und Check-out-Zeiten. Die im mediterranen-venezianischen Stil eingerichteten Räumlichkeiten verbinden Eleganz und Wärme, um Ihnen ein perfektes Gleichgewicht zwischen Komfort, Bequemlichkeit und Zugänglichkeit zu bieten, sowohl für Geschäftsreisen als auch für Urlaub.",
    welcomeTo: "Willkommen bei Dolce Laguna",
    luxuryAndComfort: "Eine Oase des Luxus und Komforts im Herzen Venedigs",
    breathtakingView: "Atemberaubende Aussicht",
    enjoyThePanorama: "Genießen Sie das einzigartige Panorama der venezianischen Lagune",
    unforgettableExperience: "Unvergessliches Erlebnis",
    liveTheMagic: "Erleben Sie den Zauber Venedigs in einer exklusiven Umgebung",
    luxuryAndComfortTitle: "Luxus und Komfort",
    enjoyTheComfort: "Genießen Sie maximalen Komfort in einer raffinierten Umgebung",
    uniqueAtmosphere: "Einzigartige Atmosphäre",
    liveAnUnforgettableExperience: "Erleben Sie ein unvergessliches Erlebnis im Herzen Venedigs",
    readyToBook: "Bereit, Ihren Aufenthalt zu buchen?",
    contactUsForBooking: "Kontaktieren Sie uns direkt, um den idealen Zimmertyp zu buchen oder weitere Informationen anzufordern. Unser Personal hilft Ihnen gerne bei der Planung Ihres perfekten Aufenthalts.",
    links: "Links",
    requestInfo: "Informationen Anfordern",
    infoServicesRequest: "Für Informationen über unsere Dienstleistungen zögern Sie bitte nicht, uns zu kontaktieren. Wir beantworten gerne alle Ihre Fragen.",
    usefulLinks: "Nützliche Links",
    privacyPolicy: "Datenschutzrichtlinie",
    siteTitle: "Dolce Laguna - Mediterrane Unterkunft",
    siteDescription: "Entdecken Sie mediterrane Eleganz im Herzen von Venedig",
    roomsPageTitle: "Zimmer - Dolce Laguna",
    roomsPageDescription: "Unsere eleganten Zimmer für einen unvergesslichen Aufenthalt in der Nähe von Venedig",
    servicesPageTitle: "Dienstleistungen - Dolce Laguna",
    servicesPageDescription: "Entdecken Sie alle Dienstleistungen, die angeboten werden, um Ihren Aufenthalt außergewöhnlich zu gestalten",
    contactsPageTitle: "Kontakt - Dolce Laguna",
    contactsPageDescription: "Kontaktieren Sie uns für Informationen und Reservierungen",
    infoPageTitle: "Informationen - Dolce Laguna",
    infoPageDescription: "Nützliche Informationen zu Ihrem Aufenthalt im Dolce Laguna"
  },
  fr: {
    home: "Accueil",
    rooms: "Chambres",
    services: "Services",
    contacts: "Contacts",
    information: "Informations",
    bookNow: "Réserver",
    whoWeAre: "Qui Sommes-Nous",
    whyChooseUs: "Pourquoi Nous Choisir",
    ourRooms: "Nos Chambres",
    contactUs: "Contactez-Nous",
    descriptionShort: "Une expérience d'hébergement unique qui allie le charme vénitien au confort moderne, dans un emplacement stratégique près de Venise et de l'aéroport",
    descriptionIntro: "Dolce Laguna est né de la transformation de deux élégants complexes résidentiels en chambres d'hôtes accueillantes, où l'hospitalité se fond avec le confort moderne. Notre emplacement stratégique, à seulement 5 minutes de l'aéroport Marco Polo et à 15 minutes du centre historique de Venise, fait de nous le point de départ idéal pour explorer la ville lagunaire et les merveilles du continent.",
    descriptionDetails: "Notre personnel multilingue assure une expérience de séjour personnalisée, avec flexibilité dans les horaires d'arrivée et de départ. Les environnements, meublés dans un style méditerranéen-vénitien, combinent élégance et chaleur pour vous offrir un équilibre parfait entre commodité, confort et accessibilité, tant pour les voyages d'affaires que pour les vacances.",
    welcomeTo: "Bienvenue à Dolce Laguna",
    luxuryAndComfort: "Une oasis de luxe et de confort au cœur de Venise",
    breathtakingView: "Vue à couper le souffle",
    enjoyThePanorama: "Profitez du panorama unique sur la lagune vénitienne",
    unforgettableExperience: "Expérience inoubliable",
    liveTheMagic: "Vivez la magie de Venise dans un environnement exclusif",
    luxuryAndComfortTitle: "Luxe et Confort",
    enjoyTheComfort: "Profitez d'un confort maximal dans un environnement raffiné",
    uniqueAtmosphere: "Atmosphère Unique",
    liveAnUnforgettableExperience: "Vivez une expérience inoubliable au cœur de Venise",
    readyToBook: "Prêt à réserver votre séjour ?",
    contactUsForBooking: "Contactez-nous directement pour réserver le type de chambre idéal ou pour demander plus d'informations. Notre personnel sera heureux de vous aider à planifier votre séjour parfait.",
    links: "Liens",
    requestInfo: "Demande d'Informations",
    infoServicesRequest: "Pour toute information sur nos services, n'hésitez pas à nous contacter. Nous serons heureux de répondre à toutes vos questions.",
    usefulLinks: "Liens Utiles",
    privacyPolicy: "Politique de Confidentialité",
    siteTitle: "Dolce Laguna - Hébergement Méditerranéen",
    siteDescription: "Découvrez l'élégance méditerranéenne au cœur de Venise",
    roomsPageTitle: "Chambres - Dolce Laguna",
    roomsPageDescription: "Nos élégantes chambres pour un séjour inoubliable près de Venise",
    servicesPageTitle: "Services - Dolce Laguna",
    servicesPageDescription: "Découvrez tous les services proposés pour rendre votre séjour exceptionnel",
    contactsPageTitle: "Contacts - Dolce Laguna",
    contactsPageDescription: "Contactez-nous pour des informations et des réservations",
    infoPageTitle: "Informations - Dolce Laguna",
    infoPageDescription: "Informations utiles sur votre séjour à Dolce Laguna"
  }
};

// Define the shape of our context
interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  isChangingLanguage: boolean;
  translations: TranslationsData;
}

// Create the context
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Context Provider props
interface I18nProviderProps {
  children: ReactNode;
}

// Provider component
export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguageState] = useState('it');
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [translations, setTranslations] = useState<TranslationsData>(defaultTranslations);

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && languageOptions.some(opt => opt.id === savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  // Function to change the language
  const setLanguage = (lang: string) => {
    if (language === lang) return;
    
    setIsChangingLanguage(true);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
    
    // Visual feedback before changing language state
    setTimeout(() => {
      setLanguageState(lang);
      setIsChangingLanguage(false);
    }, 300);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isChangingLanguage, translations }}>
      {isChangingLanguage ? (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="text-center">
            <Image 
              src="/images/logo-dolcelaguna.png"
              alt="Dolce Laguna"
              width={180}
              height={72}
              className="mx-auto mb-4"
            />
            <p className="text-[#942e2f] text-lg">Cambiando lingua...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </I18nContext.Provider>
  );
};

// Custom hook to use the context
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}; 