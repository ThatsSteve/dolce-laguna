"use client"
import { MapPin, Utensils, Sofa, Bath, Bed, Home } from "lucide-react"

// Dati degli spazi
const spacesData = [
  {
    id: "entrance",
    title: "Entrata",
    description: "L'elegante entrata di Dolce Laguna accoglie gli ospiti con un'atmosfera calda e raffinata.",
    longDescription: "L'entrata di Dolce Laguna è stata progettata per offrire un'accoglienza calorosa e sofisticata fin dal primo istante. Gli elementi architettonici veneziani si fondono con un design contemporaneo, creando un ambiente che richiama immediatamente l'eleganza della laguna. I toni caldi delle pareti, le finiture in legno pregiato e i dettagli decorativi ispirati alla tradizione veneziana creano un'atmosfera avvolgente. L'illuminazione soffusa e strategicamente posizionata esalta gli elementi di design e crea un ambiente rilassante. Nell'area di ingresso troverete anche informazioni utili sul soggiorno, mappe della città e suggerimenti per esplorare Venezia come un locale.",
    image: "/images/hotel1.jpg",
    features: ["Arredamento Veneziano", "Illuminazione Naturale", "Materiali Pregiati", "Accessibilità"],
    icon: Home
  },
  {
    id: "reception",
    title: "Reception",
    description: "La nostra reception è il cuore pulsante della struttura, dove il nostro staff è sempre pronto ad accogliervi.",
    longDescription: "La reception di Dolce Laguna rappresenta il cuore pulsante della nostra struttura, un punto di riferimento costante per tutti i nostri ospiti. Il bancone in legno veneziano, realizzato da artigiani locali, è il fulcro di questo spazio accogliente. Il nostro staff multilingue è sempre disponibile per assistervi con check-in e check-out, informazioni turistiche, prenotazioni di tour ed escursioni, consigli sui migliori ristoranti locali e qualsiasi altra necessità possiate avere durante il vostro soggiorno. La reception è arricchita da elementi decorativi che richiamano la tradizione veneziana, come maschere artigianali, vetri di Murano e stampe d'epoca che raccontano la storia della Serenissima.",
    image: "/images/hotel2.jpg",
    features: ["Posizione Centrale", "Wi-Fi Gratuito", "Arredamento Veneziano", "Accessibilità"],
    icon: MapPin
  },
  {
    id: "breakfast",
    title: "Zona Colazioni",
    description: "Iniziate la giornata nel migliore dei modi nella nostra luminosa zona colazioni con vista sulla laguna.",
    longDescription: "La zona colazioni di Dolce Laguna è stata progettata per offrire un'esperienza gastronomica indimenticabile in un ambiente luminoso e accogliente. Le ampie vetrate permettono alla luce naturale di inondare lo spazio e offrono una vista incantevole sulla laguna veneziana. Ogni mattina, dalle 7:00 alle 10:30, serviamo una ricca colazione a buffet che include prodotti freschi e locali: pasticceria artigianale, pane appena sfornato, frutta fresca di stagione, yogurt, cereali, salumi e formaggi tipici veneti, oltre a uova preparate secondo le vostre preferenze. Non mancano opzioni per chi segue diete speciali, come prodotti senza glutine, vegani e vegetariani. Il caffè espresso italiano e il cappuccino vengono preparati al momento dal nostro barista.",
    image: "/images/hotel3.jpg",
    features: ["Vista Laguna", "Wi-Fi Gratuito", "Aria Condizionata", "Accessibilità"],
    icon: Utensils
  },
  {
    id: "lounge",
    title: "Lounge",
    description: "La lounge di Dolce Laguna è lo spazio ideale per rilassarsi dopo una giornata di esplorazione.",
    longDescription: "La lounge di Dolce Laguna è stata concepita come un'oasi di tranquillità dove i nostri ospiti possono rilassarsi dopo una giornata di esplorazione. L'ambiente è caratterizzato da comode sedute, divani e poltrone in tessuti pregiati, disposti in modo da creare sia spazi conviviali che angoli più riservati per chi desidera maggiore privacy. La palette di colori richiama le tonalità della laguna veneziana, con sfumature di blu, turchese e sabbia, creando un'atmosfera rilassante e armoniosa. La lounge è dotata di una piccola biblioteca con libri su Venezia e la sua storia, riviste internazionali e guide turistiche che potrete consultare liberamente. È disponibile anche un servizio di bevande e piccoli snack durante tutto il giorno.",
    image: "/images/hotel4.jpg",
    features: ["Area Relax", "Wi-Fi Gratuito", "Smart TV", "Aria Condizionata"],
    icon: Sofa
  },
  {
    id: "bathrooms",
    title: "Bagni Accessibili",
    description: "I nostri bagni sono progettati pensando all'accessibilità di tutti gli ospiti, con ampi spazi e dotazioni.",
    longDescription: "I bagni di Dolce Laguna sono stati progettati con particolare attenzione all'accessibilità, garantendo comfort e praticità a tutti i nostri ospiti. Gli spazi sono ampi e ben organizzati, con pavimenti antiscivolo e supporti strategicamente posizionati. L'illuminazione è stata studiata per essere efficace ma non aggressiva, con la possibilità di regolarne l'intensità. I sanitari sono di design contemporaneo e di alta qualità, selezionati per coniugare estetica e funzionalità. Tutti i bagni sono dotati di docce spaziose con sedute integrate e sistemi termostatici per regolare facilmente la temperatura dell'acqua. I prodotti da bagno offerti sono di origine naturale, con fragranze ispirate alla tradizione veneziana, e sono disponibili in confezioni eco-sostenibili.",
    image: "/images/hotel5.jpg",
    features: ["Accessibilità", "Materiali Pregiati", "Illuminazione Naturale", "Aria Condizionata"],
    icon: Bath
  },
  {
    id: "relax",
    title: "Area Relax",
    description: "Al primo piano, la nostra area relax offre un'oasi di pace dove potrete godervi momenti di tranquillità.",
    longDescription: "L'area relax di Dolce Laguna, situata al primo piano della struttura, è stata concepita come un rifugio di pace e tranquillità per i nostri ospiti. Questo spazio accogliente è caratterizzato da un'atmosfera intima e rilassante, con un'illuminazione soffusa e una palette di colori neutri e caldi che invitano al riposo. Comode chaise longue e poltrone ergonomiche sono disposte in modo da creare piccoli angoli di privacy, ideali per leggere un libro, pianificare le vostre escursioni o semplicemente godervi un momento di tranquillità. L'area è dotata di una piccola biblioteca con una selezione di libri in diverse lingue, riviste internazionali e guide su Venezia e dintorni. È disponibile anche un servizio di tisane e infusi, perfetti per un momento di relax.",
    image: "/images/room1.jpg",
    features: ["Area Relax", "Vista Laguna", "Wi-Fi Gratuito", "Aria Condizionata"],
    icon: Bed
  },
  {
    id: "water-taxi",
    title: "Pontile Taxi Acqueo",
    description: "Il nostro pontile privato permette di raggiungere facilmente Venezia e le isole della laguna via acqua.",
    longDescription: \"Il pontile per taxi acqueo di Dolce Laguna rappresenta un valore aggiunto significativo per i nostri ospiti, offrendo un accesso privilegiato alla laguna veneziana. Questa struttura privata consente di raggiungere comodamente Venezia e le sue isole direttamente via acqua, evitando il traffico stradale e godendo di panor
