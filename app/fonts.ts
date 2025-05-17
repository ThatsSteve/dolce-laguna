import { Playfair_Display, Lora, Cinzel, Montserrat } from "next/font/google"

// Font elegante per titoli principali
export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

// Font serif elegante per sottotitoli
export const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700", "900"],
})

// Font leggibile per il corpo del testo
export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
})

// Font sans-serif moderno per elementi UI
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
})
