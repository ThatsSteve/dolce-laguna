export const siteConfig = {
  name: "Dolce Laguna",
  description: "Il tuo soggiorno di lusso a Venezia",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/dolcelaguna",
    facebook: "https://facebook.com/dolcelaguna",
    instagram: "https://instagram.com/dolcelaguna",
  },
  images: {
    placeholder: "/images/placeholder.jpg",
    logo: "/images/logo-dolcelaguna.png",
    carousel: {
      base: "/images/homepage/carosello",
      slides: [
        "/1.jpg",
        "/2.jpg",
        "/3.jpg",
        "/4.jpg",
        "/5.jpg",
      ],
    },
    spaces: {
      base: "/images/homepage/spazi",
      items: [
        "/reception.jpg",
        "/lounge.jpg",
        "/zona_colazioni.jpg",
        "/relax_area.jpg",
        "/zona_relax_esterna.jpg",
        "/entrata.jpg",
      ],
    },
    rooms: {
      base: "/images/homepage/rooms",
      items: [
        "/suite.jpg",
        "/doppia.jpg",
        "/singola.jpg",
        "/blu-deluxe.jpg",
        "/pavone.jpg",
        "/verdetende.jpg",
        "/marrone.jpg",
      ],
    },
  },
  contact: {
    email: "info@dolcelaguna.com",
    phone: "+39 041 1234567",
    address: "Calle del Dose, 1234, 30123 Venezia VE, Italia",
  },
  social: {
    facebook: "https://facebook.com/dolcelaguna",
    instagram: "https://instagram.com/dolcelaguna",
    twitter: "https://twitter.com/dolcelaguna",
  },
  booking: {
    url: "https://booking.com/dolcelaguna",
    phone: "+39 041 1234567",
  },
} 