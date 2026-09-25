import React, { useState, useRef, useEffect } from 'react'
import assets from '../assets/assets'
import { useCart } from '../context/CartContext'

function NavBar() {
  const navLinks = [
    { name: 'Home', href: '#', active: true },
    { name: 'Menu', href: '#', active: false },
    { name: 'About', href: '#', active: false },
    { name: 'Contact', href: '#', active: false },
  ]

  const { cart, totalCount, totalPrice, removeFromCart, updateQty } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [bump, setBump] = useState(false)
  const cartRef = useRef(null)

  // 1. Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 2. Close dropdown on window scroll (UX Improvement)
  useEffect(() => {
    const handleScroll = () => {
      if (cartOpen) {
        setCartOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cartOpen])

  // 3. Briefly "bump" the badge whenever totalCount changes
  useEffect(() => {
    if (totalCount === 0) return
    setBump(true)
    const timer = setTimeout(() => setBump(false), 250)
    return () => clearTimeout(timer)
  }, [totalCount])

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex items-center justify-between px-4 sm:px-6 py-2">
        
        {/* Brand Logo */}
        <a href="#">
          <img src={assets.logo_azoukeny} alt="Azoukeny Logo" className="w-32 md:w-36 object-contain" />
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-semibold mx-4 border-b-2 transition-all duration-300 ease-in-out w-fit ${
                link.active
                  ? 'border-[var(--pimary-color)] text-[var(--pimary-color)]'
                  : 'border-transparent text-[var(--black)] hover:text-[var(--pimary-color)] hover:border-[var(--pimary-color)]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Cart Icon + Dropdown */}
        <div className="relative inline-flex items-center" ref={cartRef}>
          <button
            type="button"
            onClick={() => setCartOpen((v) => !v)}
            aria-label="Shopping Cart"
            aria-expanded={cartOpen}
            className="relative text-2xl text-[var(--black)] hover:opacity-80 transition-opacity p-2"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {totalCount > 0 && (
              <span
                className={`absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 ${
                  bump ? 'scale-125' : 'scale-100'
                }`}
              >
                {totalCount}
              </span>
            )}
          </button>

          {/* Cart Dropdown - Responsive & Accessible */}
          <div
            className={`absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] sm:w-96 origin-top-right rounded-2xl border border-neutral-100 bg-white p-4 text-[var(--black)] shadow-2xl transition-all duration-200 ease-out ${
              cartOpen
                ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
            }`}
          >
            <div className="flex items-center justify-between mb-3 border-b border-neutral-100 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider  text-[var(--black)]">
                Your Cart
              </h4>
              <span className="text-xs font-medium  text-[var(--black)]">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-8 text-center text-sm text-neutral-400">
                <i className="fa-solid fa-basket-shopping text-3xl mb-2 block opacity-40"></i>
                Your cart is empty.
              </div>
            ) : (
              <>
                {/* Items List */}
                <ul className="max-h-72 space-y-3 overflow-y-auto pr-1">
                  {cart.map((product) => (
                    <li key={product.id} className="flex items-center gap-3  p-2 rounded-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-12 w-12"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{product.name}</p>
                        <p className="text-xs text-[var(--pimary-color)] font-bold">
                          ${product.price.toFixed(2)} × {product.qty}
                        </p>
                      </div>

                      {/* Quantity Control Buttons (Better Touch Targets) */}
                      <div className="flex items-center gap-1 bg-[var(--pimary-color)] rounded-lg p-1 border border-neutral-200">
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, product.qty - 1)}
                          className=" text-white flex h-7 w-7 items-center justify-center rounded-md "
                          aria-label={`Decrease ${product.name} quantity`}
                        >
                          {product.qty === 1 ? (
                            <i className="fa-regular fa-trash-can text-xs text-white"></i>
                          ) : (
                            '−'
                          )}
                        </button>
                        <span className="w-5 text-center text-xs text-white font-semibold">{product.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(product.id, product.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-md text-white"
                          aria-label={`Increase ${product.name} quantity`}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="p-1 text-xl"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Subtotal & Action Buttons */}
                <div className="mt-4 border-t border-neutral-100 pt-3">
                  <div className="flex items-center justify-between text-sm font-bold">
                    <span>Total</span>
                    <span className="text-base text-[var(--pimary-color)]">${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="w-full rounded-xl border  py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      View Cart
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-xl bg-[var(--pimary-color)] py-2.5 text-xs font-bold text-white hover:opacity-90 transition-opacity shadow-md"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  )
}

export default NavBar