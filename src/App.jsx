


import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Menu from './components/Menu'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import { CartProvider } from "./context/CartContext";


function App() {
  return (
     <>
      

     <CartProvider>
    <NavBar/>
    <Hero/>
    <Categories/>
    <Menu/>
    <Testimonials/>
    <Contact/>
      
     
     
     </CartProvider>

     </>
  )
}

export default App