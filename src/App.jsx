import React, { useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Menu from './components/Menu'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Checkout from './components/Checkout'
import { CartProvider } from "./context/CartContext"

function App() {
  const [page, setPage] = useState('home') // 'home' | 'checkout'

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