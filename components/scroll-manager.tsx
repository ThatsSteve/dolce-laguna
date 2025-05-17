"use client"

import { useEffect, useRef, useCallback } from "react"

interface ScrollManagerProps {
  children: React.ReactNode;
}

export default function ScrollManager({ children }: ScrollManagerProps) {
  // Riferimento all'ultimo timeout di scroll
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Riferimento per tracciare la direzione dello scroll
  const lastScrollTop = useRef<number>(0);
  // Riferimento per tracciare se si sta scrollando
  const isScrolling = useRef<boolean>(false);
  
  // Funzione per gestire lo scroll event
  const handleScroll = useCallback(() => {
    // Registra che stiamo scrollando
    isScrolling.current = true;
    
    // Imposta un flag sulla classe body durante lo scroll
    document.body.classList.add('is-scrolling');
    
    // Cancella il timeout precedente se esiste
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Imposta un nuovo timeout
    scrollTimeoutRef.current = setTimeout(() => {
      // Rimuovi il flag quando lo scroll è terminato
      document.body.classList.remove('is-scrolling');
      isScrolling.current = false;
    }, 150);
  }, []);
  
  // Aggiungi l'event listener dello scroll
  useEffect(() => {
    // Usa un event listener passivo per migliori performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      document.body.classList.remove('is-scrolling');
    };
  }, [handleScroll]);
  
  return <>{children}</>;
} 