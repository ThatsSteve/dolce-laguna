import React, { useState } from 'react';
import { useI18n } from '../../context/i18n-context';
import Image from 'next/image';
import { SpaceDetail } from '@/components/space-detail';

interface Space {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
  features: {
    icon: string;
    text: string;
  }[];
}

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { t } = useI18n();

  const slides = [
    {
      image: '/images/homepage/carosello/1.jpg',
      title: t('welcomeTo'),
      description: t('luxuryAndComfort')
    },
    {
      image: '/images/homepage/carosello/2.jpg',
      title: t('breathtakingView'),
      description: t('enjoyThePanorama')
    },
    {
      image: '/images/homepage/carosello/3.jpg',
      title: t('unforgettableExperience'),
      description: t('liveTheMagic')
    },
    {
      image: '/images/homepage/carosello/4.jpg',
      title: t('luxuryAndComfortTitle'),
      description: t('enjoyTheComfort')
    },
    {
      image: '/images/homepage/carosello/5.jpg',
      title: t('uniqueAtmosphere'),
      description: t('liveAnUnforgettableExperience')
    }
  ];

  const spaces = [
    {
      id: 1,
      name: "Reception",
      description: "La nostra accogliente reception è il punto di partenza per il vostro soggiorno indimenticabile.",
      image: "/images/homepage/spazi/reception.jpg",
      icon: "reception",
      features: [
        { icon: "clock", text: "Accoglienza 24/7" },
        { icon: "concierge", text: "Concierge" },
        { icon: "luggage", text: "Servizio bagagli" }
      ]
    },
    {
      id: 2,
      name: "Lounge",
      description: "Un elegante spazio dove rilassarsi e godere di un momento di tranquillità.",
      image: "/images/homepage/spazi/lounge.jpg",
      icon: "lounge",
      features: [
        { icon: "sofa", text: "Area relax" },
        { icon: "coffee", text: "Bevande e snack" },
        { icon: "wifi", text: "WiFi gratuito" }
      ]
    },
    {
      id: 3,
      name: "Zona Colazioni",
      description: "Iniziate la giornata con una deliziosa colazione servita nella nostra luminosa sala.",
      image: "/images/homepage/spazi/zona_colazioni.jpg",
      icon: "colazione",
      features: [
        { icon: "breakfast", text: "Colazione a buffet" },
        { icon: "local", text: "Prodotti locali" },
        { icon: "coffee", text: "Caffetteria" }
      ]
    },
    {
      id: 4,
      name: "Relax Area",
      description: "Un'oasi di pace dove rigenerarsi dopo una giornata di esplorazioni.",
      image: "/images/homepage/spazi/relax_area.jpg",
      icon: "relax",
      features: [
        { icon: "sofa", text: "Sedute confortevoli" },
        { icon: "peace", text: "Ambiente tranquillo" },
        { icon: "view", text: "Vista panoramica" }
      ]
    },
    {
      id: 5,
      name: "Zona Relax Esterna",
      description: "Godetevi il sole e l'aria fresca nel nostro giardino privato.",
      image: "/images/homepage/spazi/zona_relax_esterna.jpg",
      icon: "relax",
      features: [
        { icon: "sunbed", text: "Lettini" },
        { icon: "umbrella", text: "Ombrelloni" },
        { icon: "bar", text: "Bar esterno" }
      ]
    },
    {
      id: 6,
      name: "Entrata",
      description: "Un ingresso elegante che vi darà il benvenuto nel nostro mondo di comfort.",
      image: "/images/homepage/spazi/entrata.jpg",
      icon: "entrata",
      features: [
        { icon: "parking", text: "Parcheggio privato" },
        { icon: "door", text: "Portineria" },
        { icon: "security", text: "Sicurezza 24/7" }
      ]
    }
  ];

  const rooms = [
    {
      id: 1,
      name: 'Suite',
      description: 'Camera spaziosa con vista sulla laguna e servizi esclusivi.',
      image: '/images/homepage/DL2/suite.jpg',
      price: '€350',
      features: ['Vista laguna', 'Terrazza privata', 'Servizio in camera']
    },
    {
      id: 2,
      name: 'Camera Doppia',
      description: 'Camera confortevole con atmosfera accogliente.',
      image: '/images/homepage/DL2/blu.jpg',
      price: '€220',
      features: ['Vista cortile', 'Bagno con doccia', 'TV Smart']
    },
    {
      id: 3,
      name: 'Camera Singola',
      description: 'Camera luminosa con design contemporaneo.',
      image: '/images/homepage/DL2/azzurra.jpg',
      price: '€200',
      features: ['Vista giardino', 'Bagno privato', 'WiFi gratuito']
    },
    {
      id: 4,
      name: 'Camera Blu Deluxe',
      description: 'Camera elegante con arredi moderni e comfort premium.',
      image: '/images/homepage/DL1/Bludeluxe.jpg',
      price: '€280',
      features: ['Vista città', 'Bagno con vasca', 'Minibar']
    },
    {
      id: 5,
      name: 'Camera Pavone',
      description: 'Camera elegante con arredi moderni e comfort premium.',
      image: '/images/homepage/DL1/Pavone.jpg',
      price: '€280',
      features: ['Vista città', 'Bagno con vasca', 'Minibar']
    },
    {
      id: 6,
      name: 'Camera Verdetende',
      description: 'Camera elegante con arredi moderni e comfort premium.',
      image: '/images/homepage/DL1/Verdetende.jpg',
      price: '€280',
      features: ['Vista città', 'Bagno con vasca', 'Minibar']
    },
    {
      id: 7,
      name: 'Camera Marrone',
      description: 'Camera elegante con arredi moderni e comfort premium.',
      image: '/images/homepage/DL1/Marrone.jpg',
      price: '€280',
      features: ['Vista città', 'Bagno con vasca', 'Minibar']
    }
  ];

  const SpaceModal = ({ space, onClose }: { space: Space; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-4 max-w-xs w-full mx-4 relative">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">{space.name}</h3>
            <p className="text-gray-600 text-sm">{space.description}</p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {space.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <span className="text-sm">
                      {feature.icon === 'sun' && '☀️'}
                      {feature.icon === 'wine' && '🍷'}
                      {feature.icon === 'sunset' && '🌅'}
                      {feature.icon === 'coffee' && '☕'}
                      {feature.icon === 'croissant' && '🥐'}
                      {feature.icon === 'view' && '🏞️'}
                      {feature.icon === 'tree' && '🌳'}
                      {feature.icon === 'bench' && '🪑'}
                      {feature.icon === 'book' && '📚'}
                      {feature.icon === 'cocktail' && '🍸'}
                      {feature.icon === 'music' && '🎵'}
                      {feature.icon === 'clock' && '🕒'}
                      {feature.icon === 'concierge' && '👨‍💼'}
                      {feature.icon === 'luggage' && '🧳'}
                      {feature.icon === 'sofa' && '🛋️'}
                      {feature.icon === 'wifi' && '📶'}
                      {feature.icon === 'breakfast' && '🍳'}
                      {feature.icon === 'local' && '🏠'}
                      {feature.icon === 'peace' && '✨'}
                      {feature.icon === 'sunbed' && '🛌'}
                      {feature.icon === 'umbrella' && '☂️'}
                      {feature.icon === 'bar' && '🍹'}
                      {feature.icon === 'parking' && '🅿️'}
                      {feature.icon === 'door' && '🚪'}
                      {feature.icon === 'security' && '🔒'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Carosello */}
      <div className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sezione Spazi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {spaces.map((space) => (
          <div
            key={space.id}
            className="relative group cursor-pointer"
            onClick={() => {
              setSelectedSpace(space);
              setIsSpaceModalOpen(true);
            }}
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
              <Image
                src={space.image}
                alt={space.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{space.name}</h3>
              <p className="text-gray-600 mt-2">{space.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sezione Camere */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-gray-600 mt-2">{room.description}</p>
              <p className="text-primary font-bold mt-2">{room.price}</p>
              <ul className="mt-4 space-y-2">
                {room.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {isSpaceModalOpen && selectedSpace && (
        <SpaceDetail
          isOpen={isSpaceModalOpen}
          onClose={() => setIsSpaceModalOpen(false)}
          space={selectedSpace}
        />
      )}
    </div>
  );
};

export default Home; 