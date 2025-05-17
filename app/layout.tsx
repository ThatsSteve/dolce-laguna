"use client"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/globals.css"
import { playfair, cinzel, lora, montserrat } from "./fonts"
import Header from "../components/header"
import { Toaster } from "../components/ui/toaster"
import ScrollOptimizer from "../components/scroll-optimizer"
import NavigationHandler from "../components/navigation-handler"
import { ThemeProvider } from "../components/theme-provider"
import { I18nProvider, useI18n } from "../context/i18n-context"
import { useEffect } from "react"

// Componente per aggiornare l'attributo lang dell'elemento html
function LanguageAttrUpdater({ children }: { children: React.ReactNode }) {
  const { language, t } = useI18n();
  
  useEffect(() => {
    if (document.documentElement) {
      document.documentElement.lang = language;
      
      // Aggiorna il titolo e la meta description
      document.title = t('siteTitle');
      
      // Trova e aggiorna la meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', t('siteDescription'));
      }
    }
  }, [language, t]);
  
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${cinzel.variable} ${lora.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <title>Dolce Laguna - Alloggio Mediterraneo</title>
        <meta name="description" content="Scopri l'eleganza mediterranea nel cuore di Venezia" />
        <meta name="generator" content="v0.dev" />
      </head>
      <body className="bg-[#f9f7f4] text-[#333333]">
        <I18nProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <NavigationHandler>
              <LanguageAttrUpdater>
                <Header />
                <ScrollOptimizer>
                  {children}
                </ScrollOptimizer>
              </LanguageAttrUpdater>
              <Toaster />
            </NavigationHandler>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
