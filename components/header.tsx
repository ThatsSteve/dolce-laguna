"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useI18n, languageOptions } from "../context/i18n-context"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const languageMenuRef = useRef(null)
  
  const { language, setLanguage, t, isChangingLanguage } = useI18n()

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])
  const toggleLanguage = useCallback(() => setIsLanguageOpen(prev => !prev), [])

  // Optimize scroll handler with useCallback
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsScrolled(currentScrollY > 50);
  }, []);

  // Optimize resize handler with useCallback
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Handler per gestire il click fuori dal menu lingua
  const handleOutsideClick = useCallback((event) => {
    if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
      setIsLanguageOpen(false);
    }
  }, []);

  // Gestisce il cambio lingua
  const handleLanguageChange = useCallback((langId) => {
    if (language === langId) {
      setIsLanguageOpen(false);
      return;
    }
    
    setLanguage(langId);
    setIsLanguageOpen(false);
  }, [language, setLanguage]);

  useEffect(() => {
    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile, { passive: true });
    
    // Aggiungi event listener per gestire il click fuori dal menu
    if (isLanguageOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    
    // Initial check
    checkMobile();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleScroll, checkMobile, handleOutsideClick, isLanguageOpen]);

  // Trova la lingua corrente
  const currentLanguage = useMemo(() => 
    languageOptions.find(lang => lang.id === language) || languageOptions[0], 
    [language]
  );

  // Memoize animation variants
  const menuVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      x: "100%" 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 16,
        mass: 0.6
      }
    },
    exit: { 
      opacity: 0,
      x: "100%",
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }), []);

  const languageMenuVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      y: -5,
      scaleY: 0.8,
      transformOrigin: "top"
    },
    visible: { 
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15,
        mass: 0.4
      }
    },
    exit: { 
      opacity: 0,
      y: -5,
      scaleY: 0.8,
      transition: { 
        duration: 0.15
      }
    }
  }), []);

  const menuItemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.05,
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    })
  }), []);

  if (isChangingLanguage) {
    return null; // Il loading viene già mostrato dal provider I18n
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm header-shadow py-2" : "bg-transparent py-4 header-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - con migliore spaziatura e dimensioni */}
        <Link href="/" className="relative z-10 mr-6">
          <Image
            src="/images/logo-dolcelaguna.png"
            alt="Dolce Laguna"
            width={180}
            height={72}
            className="h-14 md:h-16 w-auto object-contain"
            priority
            style={{ 
              filter: isScrolled ? 'none' : 'brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex items-center gap-8`}>
          <Link href="/" className={`nav-link transition-colors font-medium ${isScrolled ? "text-[#333333]" : "text-white"}`}>
            {t('home')}
          </Link>
          <Link href="/camere" className={`nav-link transition-colors font-medium ${isScrolled ? "text-[#333333]" : "text-white"}`}>
            {t('rooms')}
          </Link>
          <Link href="/servizi" className={`nav-link transition-colors font-medium ${isScrolled ? "text-[#333333]" : "text-white"}`}>
            {t('services')}
          </Link>
          <Link href="/contatti" className={`nav-link transition-colors font-medium ${isScrolled ? "text-[#333333]" : "text-white"}`}>
            {t('contacts')}
          </Link>
          <Link href="/informazioni" className={`nav-link transition-colors font-medium ${isScrolled ? "text-[#333333]" : "text-white"}`}>
            {t('information')}
          </Link>

          {/* Language Selector */}
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={toggleLanguage}
              className="language-selector flex items-center gap-2 px-3 py-2"
              aria-expanded={isLanguageOpen}
              aria-haspopup="true"
            >
              <Image src={currentLanguage.flag} alt={currentLanguage.label} width={20} height={15} />
              <span className={isScrolled ? "text-[#333333]" : "text-white"}>{currentLanguage.short}</span>
              <motion.div
                animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown
                  size={16}
                  className={isScrolled ? "text-[#333333]" : "text-white"}
                />
              </motion.div>
            </button>

            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-1 bg-white rounded-sm shadow-lg overflow-hidden z-20 min-w-[120px]"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={languageMenuVariants}
                >
                  {languageOptions.map((langOption, index) => (
                    <motion.button 
                      key={langOption.id}
                      className={`language-option w-full ${langOption.id === language ? 'active' : ''}`}
                      variants={menuItemVariants}
                      custom={index}
                      onClick={() => handleLanguageChange(langOption.id)}
                    >
                      <Image src={langOption.flag} alt={langOption.label} width={20} height={15} />
                      <span>{langOption.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Navigation pulsante prenota */}
          <Link href="/prenota" className="inline-block">
            <Button className="bg-[rgba(232,151,0,1)] hover:bg-[#b06939] text-white relative overflow-hidden group rounded-sm">
              <span className="relative z-10">{t('bookNow')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[rgba(232,151,0,1)] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <motion.span
                className="absolute -inset-full transform rotate-45 bg-white opacity-20"
                animate={{
                  x: ["0%", "200%"],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                }}
              ></motion.span>
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Language Selector Mobile */}
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={toggleLanguage}
              className="language-selector flex items-center gap-1 px-2 py-1.5"
              aria-expanded={isLanguageOpen}
              aria-haspopup="true"
            >
              <Image src={currentLanguage.flag} alt={currentLanguage.label} width={16} height={12} />
              <motion.div
                animate={{ rotate: isLanguageOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ChevronDown
                  size={14}
                  className={isScrolled ? "text-[#333333]" : "text-white"}
                />
              </motion.div>
            </button>

            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-1 bg-white/95 backdrop-blur-sm rounded-sm shadow-lg overflow-hidden z-50 min-w-[100px]"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={languageMenuVariants}
                >
                  {languageOptions.map((langOption, index) => (
                    <motion.button 
                      key={langOption.id}
                      className={`language-option w-full text-sm ${langOption.id === language ? 'active' : ''}`}
                      variants={menuItemVariants}
                      custom={index}
                      onClick={() => handleLanguageChange(langOption.id)}
                    >
                      <Image src={langOption.flag} alt={langOption.label} width={16} height={12} />
                      <span>{langOption.short}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={toggleMenu}
            className={`p-1 focus:outline-none ${isScrolled ? "text-[#333333]" : "text-white"}`}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 flex flex-col md:hidden overflow-y-auto h-[100vh]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            <div className="pt-20 px-6 pb-10 flex-grow flex flex-col bg-white min-h-screen">
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-50"
                aria-label="Chiudi menu"
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 180, transition: { duration: 0.3 } }}
              >
                <X size={24} className="text-[#333333]" />
              </motion.button>
              
              <nav className="flex flex-col gap-6 items-center text-center">
                {/* Logo nel menu mobile */}
                <motion.div
                  variants={menuItemVariants}
                  custom={-1}
                  className="mb-4"
                >
                  <Image
                    src="/images/logo-dolcelaguna.png"
                    alt="Dolce Laguna"
                    width={180}
                    height={70}
                    className="h-16 w-auto object-contain"
                  />
                </motion.div>
                
                <motion.div
                  variants={menuItemVariants}
                  custom={0}
                >
                  <Link
                    href="/"
                    className="text-xl font-medium text-[#333333] hover:text-[#b06939] transition-colors py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('home')}
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={menuItemVariants}
                  custom={1}
                >
                  <Link
                    href="/camere"
                    className="text-xl font-medium text-[#333333] hover:text-[#b06939] transition-colors py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('rooms')}
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={menuItemVariants}
                  custom={2}
                >
                  <Link
                    href="/servizi"
                    className="text-xl font-medium text-[#333333] hover:text-[#b06939] transition-colors py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('services')}
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={menuItemVariants}
                  custom={3}
                >
                  <Link
                    href="/contatti"
                    className="text-xl font-medium text-[#333333] hover:text-[#b06939] transition-colors py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('contacts')}
                  </Link>
                </motion.div>
                
                <motion.div
                  variants={menuItemVariants}
                  custom={4}
                >
                  <Link
                    href="/informazioni"
                    className="text-xl font-medium text-[#333333] hover:text-[#b06939] transition-colors py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('information')}
                  </Link>
                </motion.div>

                {/* Mobile Menu pulsante prenota */}
                <motion.div
                  variants={menuItemVariants}
                  custom={5}
                  className="w-full max-w-xs mt-4"
                >
                  <Link href="/prenota" onClick={() => setIsMenuOpen(false)} className="block w-full">
                    <Button className="w-full bg-[rgba(232,151,0,1)] hover:bg-[#b06939] text-white relative overflow-hidden group rounded-lg">
                      <span className="relative z-10">{t('bookNow')}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-[rgba(232,151,0,1)] to-[#b06939] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
