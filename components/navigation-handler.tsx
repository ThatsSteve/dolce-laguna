"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

interface NavigationHandlerProps {
  children: React.ReactNode
}

export default function NavigationHandler({ children }: NavigationHandlerProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Questa funzione viene eseguita ogni volta che cambia l'URL
    // Memorizza la posizione di scorrimento corrente prima della navigazione
    if (typeof window !== 'undefined') {
      // Salva la posizione di scorrimento per la pagina attuale
      sessionStorage.setItem(
        `scrollPos-${window.location.pathname}`,
        window.scrollY.toString()
      )
    }
  }, [pathname, searchParams])

  useEffect(() => {
    // Questa funzione viene eseguita dopo che la navigazione è completata
    if (typeof window !== 'undefined') {
      // Ottimizzazione per evitare calcoli inutili durante il caricamento iniziale
      const handleRouteChangeComplete = () => {
        // Controllo se dobbiamo ripristinare la posizione di scorrimento
        const savedScrollPos = sessionStorage.getItem(`scrollPos-${pathname}`)
        
        // Se stiamo tornando a una pagina già visitata, ripristina la posizione di scorrimento
        if (savedScrollPos && window.history.state?.idx !== undefined) {
          window.scrollTo(0, parseInt(savedScrollPos))
        } else {
          // Per le nuove pagine, scorri all'inizio
          window.scrollTo(0, 0)
        }
      }
      
      // Esegui dopo che la pagina è stata renderizzata completamente
      requestAnimationFrame(() => {
        handleRouteChangeComplete()
      })
      
      // Precarica i link visibili per una navigazione più veloce
      const prefetchVisibleLinks = () => {
        const links = document.querySelectorAll('a[href^="/"]')
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const link = entry.target as HTMLAnchorElement
              const href = link.getAttribute('href')
              if (href && href.startsWith('/') && href !== pathname) {
                // Simula il prefetching di Next.js (che dovrebbe già avvenire, ma questo è un backup)
                const prefetcher = document.createElement('link')
                prefetcher.rel = 'prefetch'
                prefetcher.href = href
                document.head.appendChild(prefetcher)
                observer.unobserve(link) // Smetti di osservare dopo il prefetch
              }
            }
          })
        }, { rootMargin: '200px' }) // Inizia il prefetch quando i link sono a 200px dalla viewport
        
        links.forEach(link => observer.observe(link))
        
        return () => observer.disconnect()
      }
      
      // Inizia a osservare i link dopo un breve ritardo per dare priorità al rendering
      const prefetchTimeout = setTimeout(prefetchVisibleLinks, 300)
      
      return () => {
        clearTimeout(prefetchTimeout)
      }
    }
  }, [pathname])

  return <>{children}</>
}