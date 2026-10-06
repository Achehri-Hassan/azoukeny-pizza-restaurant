import React, { useState, useRef, useEffect } from 'react'
import assets from '../assets/assets'
import { useCart } from '../context/CartContext'

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Menu', href: '#menu' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

function NavBar({ onCheckout, onNavigate, isCheckout }) {
  const { cart, totalCount, totalPrice, removeFromCart, updateQty } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const [bump, setBump] = useState(false)
  const cartRef = useRef(null)

  // 1. Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 2. Close cart on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (cartOpen) setCartOpen(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cartOpen])

  // 3. Close cart and mobile menu with the Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setCartOpen(false)
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // 4. Close mobile menu when the screen becomes desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handleChange = (e) => {
      if (e.matches) setMenuOpen(false)
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  // 5. Briefly "bump" the badge whenever totalCount changes
  useEffect(() => {
    if (totalCount === 0) return
    setBump(true)
    const timer = setTimeout(() => setBump(false), 250)
    return () => clearTimeout(timer)
  }, [totalCount])

  const toggleMenu = () => {
    setCartOpen(false)
    setMenuOpen((v) => !v)
  }

  const toggleCart = () => {
    setMenuOpen(false)
    setCartOpen((v) => !v)
  }

  const handleLinkClick = (e, name, href) => {
    setActiveLink(name)
    setMenuOpen(false)
    // On the checkout page the sections are not mounted, so go home first
    if (isCheckout) {
      e.preventDefault()
      onNavigate?.(href)
    }
  }

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex items-center px-4 sm:px-6 py-2">
        {/* Brand Logo */}
        <a href="#" onClick={(e) => handleLinkClick(e, 'Home', '#')}>
          <img
            src={assets.logo_azoukeny}
            alt="Azoukeny Logo"
            className="w-32 md:w-36 object-contain"
          />
        </a>

        {/* Desktop links: pushed to the right, with space before the cart icon */}
        <nav className="ml-auto mr-8 hidden items-center gap-8 md:flex lg:mr-12 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.name, link.href)}
              className={`border-b-2 font-semibold transition-all duration-300 ease-in-out w-fit ${
                activeLink === link.name
                  ? 'border-[var(--pimary-color)] text-[var(--pimary-color)]'
                  : 'border-transparent text-[var(--black)] hover:text-[var(--pimary-color)] hover:border-[var(--pimary-color)]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Cart icon + hamburger (mobile) */}
        <div className="relative ml-auto flex items-center gap-1 md:ml-0" ref={cartRef}>
          <button
            type="button"
            onClick={toggleCart}
            aria-label="Shopping Cart"
            aria-expanded={cartOpen}
            className="relative p-2 text-2xl text-[var(--black)] transition-opacity hover:opacity-80"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {totalCount > 0 && (
              <span
                className={`absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm transition-transform duration-200 ${
                  bump ? 'scale-125' : 'scale-100'
                }`}
              >
                {totalCount}
              </span>
            )}
          </button>

          {/* Menu / close icon: mobile only */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center text-2xl text-[var(--black)] transition-opacity hover:opacity-80 md:hidden"
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>

          {/* Cart dropdown */}
          <div
            className={`absolute right-0 top-full mt-3 w-[calc(100vw-2rem)] sm:w-96 origin-top-right overflow-hidden rounded-2xl bg-white text-[var(--black)] shadow-2xl ring-1 ring-black/5 transition-all duration-200 ease-out ${
              cartOpen
                ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[var(--pimary-color)] px-4 py-3 text-white">
              <h4 className="text-base font-semibold">Your cart</h4>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl text-neutral-400">
                  <i className="fa-solid fa-basket-shopping"></i>
                </span>
                <p className="mt-4 text-base font-semibold">Your cart is empty</p>
                <p className="mt-1 text-sm text-neutral-500">Add a pizza from the menu.</p>
                <a
                  href="#menu"
                  onClick={() => setCartOpen(false)}
                  className="mt-5 rounded-xl bg-[var(--pimary-color)] px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Browse menu
                </a>
              </div>
            ) : (
              <>
                {/* Product cards */}
                <ul className="max-h-80 space-y-2 overflow-y-auto bg-neutral-50 p-3">
                  {cart.map((product) => (
                    <li
                      key={product.id}
                      className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-sm"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 shrink-0 rounded-lg bg-neutral-100 object-contain"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{product.name}</p>
                            <p className="text-xs text-neutral-500">
                              ${product.price.toFixed(2)} each
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          {/* Quantity stepper */}
                          <div className="inline-flex items-center rounded-full border border-neutral-200">
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, product.qty - 1)}
                              aria-label={`Decrease ${product.name} quantity`}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                            >
                              {product.qty === 1 ? (
                                <i className="fa-regular fa-trash-can text-xs text-red-600"></i>
                              ) : (
                                '−'
                              )}
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">
                              {product.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, product.qty + 1)}
                              aria-label={`Increase ${product.name} quantity`}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-neutral-700 transition-colors hover:bg-neutral-100"
                            >
                              +
                            </button>
                          </div>

                          {/* Line total */}
                          <p className="text-sm font-bold text-[var(--pimary-color)]">
                            ${(product.price * product.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Total + actions */}
                <div className="border-t border-neutral-100 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-600">Total</span>
                    <span className="text-xl font-bold text-[var(--pimary-color)]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-neutral-300 py-2.5 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                      View cart
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCartOpen(false)
                        onCheckout?.()
                      }}
                      className="w-full rounded-xl bg-[var(--pimary-color)] py-2.5 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90"
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

      {/* Mobile menu panel */}
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        className={`absolute left-0 top-full w-full border-t border-neutral-100 bg-white shadow-lg transition-all duration-200 ease-out md:hidden ${
          menuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-4 py-3 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.name, link.href)}
                tabIndex={menuOpen ? 0 : -1}
                className={`block border-l-4 px-4 py-3 text-base font-semibold transition-colors ${
                  activeLink === link.name
                    ? 'border-[var(--pimary-color)] text-[var(--pimary-color)]'
                    : 'border-transparent text-[var(--black)] hover:text-[var(--pimary-color)]'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar