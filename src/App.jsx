import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Menu from './components/Menu'

import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Checkout from './components/Checkout'
import { CartProvider } from "./context/CartContext"

// Scroll animations: run once, and skip them if the user prefers reduced motion
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80,
  disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
})

function App() {
  const [page, setPage] = useState('home') // 'home' | 'checkout'

  // Sections are mounted again when we come back from checkout: scan them
  useEffect(() => {
    const t = setTimeout(() => AOS.refreshHard(), 100)
    return () => clearTimeout(t)
  }, [page])

  const goCheckout = () => {
    setPage('checkout')
    window.scrollTo({ top: 0 })
  }

  // Go back to the home page, then scroll to a section (e.g. "#menu")
  const goHome = (target) => {
    setPage('home')
    setTimeout(() => {
      const el = typeof target === 'string' && target !== '#' ? document.querySelector(target) : null
      if (el) el.scrollIntoView()
      else window.scrollTo({ top: 0 })
    }, 50)
  }

  return (
    <CartProvider>
      <NavBar
        onCheckout={goCheckout}
        onNavigate={goHome}
        isCheckout={page === 'checkout'}
      />

      {page === 'checkout' ? (
        <Checkout onBack={goHome} />
      ) : (
        <>
          <Hero />
          <Categories />
          <Menu />
        
          <Testimonials />
          <Contact />
        </>
      )}
    </CartProvider>
  )
}

export default App