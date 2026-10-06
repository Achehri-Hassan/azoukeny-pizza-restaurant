# Azoukeny – Pizza Restaurant Website

A responsive website for a pizza restaurant, built with **React**, **Vite** and **Tailwind CSS** from design mockups. Customers can browse the menu by category, add products to a cart and place an order from a checkout page.

Each section is a separate component, and the content (categories, menu items, reviews, contact details) lives in plain JavaScript arrays and objects, so it is easy to edit without touching the layout.

## Features

- Responsive layout for mobile, tablet and desktop
- Navbar with a mobile menu (open and close icon) and a cart dropdown
- Category cards that open the matching products in the menu
- Menu with filter tabs and an **Add to cart** button on every product
- Shopping cart with quantity controls, line totals and a total price
- Checkout page with a validated form (username, city, address, phone) and an order summary
- Scroll animations with AOS (turned off for users who prefer reduced motion)

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AOS](https://michalsnik.github.io/aos/) (animate on scroll)
- [Font Awesome](https://fontawesome.com/) (icons in the navbar, hero, about, contact and checkout)
- Google Fonts: **Anton** (titles), **Kaushan Script** (script taglines), **Lexend** (body text)

## Sections

| Section | File | Description |
| --- | --- | --- |
| Navbar | `NavBar.jsx` | Logo, navigation links, mobile menu and cart dropdown with a **Checkout** button. |
| Hero | `Hero.jsx` | Full-width intro with the chef image, call-to-action buttons and stats (rating, customers, delivery time). |
| Categories | `Categories.jsx` | Three cards (Burgers, French Fries, Soft Drinks). **View Menu** scrolls to the menu and shows that category. |
| Our Menu | `Menu.jsx` | Red section with tabs (All, Pizzas, Burgers, Fries, Drinks, Desserts, Extras) and product cards. |
| About | `About.jsx` | Banner with a red brush-edge panel, a short text and a **View menu** button. |
| Testimonials | `Testimonials.jsx` | "What our customers say" carousel with photo, rating, dots and prev/next arrows. |
| Contact | `Contact.jsx` | Clickable phone, email and address, plus an embedded Google Maps iframe. |
| Checkout | `Checkout.jsx` | Delivery form with validation, order summary and a confirmation screen. |

## Project structure

```
src/
├── assets/
│   ├── assets.js            # central export of all images
│   └── ...                  # logo, hero, product photos, decorations
├── components/
│   ├── NavBar.jsx
│   ├── Hero.jsx
│   ├── Categories.jsx
│   ├── Menu.jsx
│   ├── Testimonials.jsx
│   ├── Contact.jsx
│   └── Checkout.jsx
├── context/
│   └── CartContext.jsx      # cart state shared by the whole app
├── App.jsx
├── main.jsx
└── index.css
```

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
```

Add the fonts and the Font Awesome stylesheet to the `<head>` of `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Anton&family=Kaushan+Script&family=Lexend:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>
```

## How the app works

**Pages.** There is no router. `App.jsx` keeps a `page` state (`home` or `checkout`) and shows either the home sections or the `Checkout` component. Links in the navbar go back to the home page first when you are on the checkout page.

**Cart.** `CartContext.jsx` provides the cart to every component with `useCart()`:

| Value | Use |
| --- | --- |
| `cart` | List of products with their `qty` |
| `totalCount` | Number of items in the cart |
| `totalPrice` | Total price |
| `addToCart(item, qty)` | Add a product |
| `updateQty(id, qty)` | Change a quantity |
| `removeFromCart(id)` | Remove a product |
| `clearCart()` | Empty the cart (used after an order) |

**Category to menu.** The selected menu category is stored in `App.jsx`. Clicking a category card sets it and scrolls to the menu, and the menu tabs update it too.

**Animations.** AOS starts once in `App.jsx`. Elements use `data-aos` attributes, set on a wrapper around each card so the hover effects keep working.

## Customizing content

**Categories** – edit the `categories` array in `Categories.jsx` (title, tagline, subtitle, image, icon). The `id` must match a tab id in `Menu.jsx` (`burgers`, `fries` or `drinks`).

**Menu items** – edit the `items` array in `Menu.jsx`:

```javascript
{ id: 1, category: "pizzas", name: "Margherita", desc: "…", price: 11.99, image: assets.Margherita }
```

`category` must be one of `pizzas`, `burgers`, `fries`, `drinks`, `desserts` or `extras`. Every item needs a unique `id`.

**Menu tabs** – edit the `tabs` array in `Menu.jsx`. Each tab `id` is a category name.

**Reviews** – edit the `reviews` array in `Testimonials.jsx` (name, rating, text, avatar). The dots and arrows update automatically.

**Contact details** – edit the `contact` object at the top of `Contact.jsx` (intro text, phone, email, address).

**Map location** – at the top of `Contact.jsx`, choose one of two options:

```javascript
// Option 1: type any place name or address
const MAP_QUERY = "Hay Oudaden Tilila, Morocco";

// Option 2: paste the src from Google Maps > Share > Embed a map
// const MAP_SRC = "https://www.google.com/maps/embed?pb=...";
```

**Orders** – in `Checkout.jsx`, the submit handler builds an `order` object (customer, items, total). It is only printed with `console.log` for now. Send it to your backend, WhatsApp or an email service where the `TODO` comment is.

## Design tokens

| Token | Value |
| --- | --- |
| Primary red | `#c4161c` (also the CSS variable `--pimary-color`, spelled this way in the code) |
| Menu background red | `#bb0d11` |
| Hover red | `#9e1015` |
| Accent gold | `#f5b301` |
| Page background | `neutral-50` / white |

## Responsive behavior

- **Mobile:** one column, hamburger menu in the navbar, stats card stacked in the hero, testimonial photo above the text.
- **Tablet (`md`):** navbar links visible, stats in one row, two menu columns, contact details and map side by side.
- **Desktop (`lg`+):** three category cards and three menu columns, larger typography.

## To do

- [ ] Use a different photo for each product (burgers, fries and drinks share one photo each for now)
- [ ] Replace the sample prices and descriptions with real ones
- [ ] Send the order from the checkout page to a backend, WhatsApp or email
- [ ] Add a product modal (the menu cards already store the selected item)
- [ ] Build the **View cart** page
- [ ] Replace the placeholder text in the reviews and the Contact intro
- [ ] Set the real restaurant location in the Contact map

## Commit convention

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) style, for example:

```
feat: add checkout page with order form
feat: add About section
feat: add mobile menu and cart dropdown design
feat: add scroll animations with AOS
docs: update README
```