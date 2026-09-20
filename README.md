# Azoukeny – Pizza Restaurant Landing Page

A responsive landing page for a pizza restaurant, built with **React** and **Tailwind CSS** from design mockups. Each section is a separate component, and the content (categories, menu items, reviews, contact details) lives in plain JavaScript arrays and objects, so it is easy to edit without touching the layout.

## Tech stack

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/) (icons in the Contact section)
- Google Fonts: **Anton** (card titles), **Kaushan Script** (script taglines), **Lexend** (menu, reviews and contact)

## Sections

| Section | File | Description |
| --- | --- | --- |
| Navbar | `Navbar.jsx` | Top navigation with the restaurant logo. |
| Hero | `Hero.jsx` | Full-width intro section using `hero.jpg` as the background. |
| Categories | `Categories.jsx` | Three cards (Burgers, French Fries, Pizzas) with a red curved header, script tagline, product image and **View Menu** button. |
| Our Menu | `Menu.jsx` | Red section with filter tabs (All, Pizzas, Desserts, Extras) and product cards with price and **Add to cart** button. Tabs filter the list. |
| Testimonials | `Testimonials.jsx` | "What our customers say" carousel with a circular customer photo, name, star rating, dot indicators and prev/next arrows. |
| Contact | `Contact.jsx` | "Contact Us" section with clickable phone, email and address, plus an embedded Google Maps iframe with an editable location. |

## Project structure

```
src/
├── assets/
│   ├── assets.js            # central export of all images
│   ├── logo_azoukeny.png
│   ├── hero.jpg
│   ├── pizza.jpg
│   ├── bburger.jpg
│   ├── frite.jpg
│   ├── pizza_pieces.png     # exploded pizza (menu section, top-left)
│   ├── pizza_slice.png      # cheese-pull slice (menu section, top-right)
│   ├── tomato.png           # decoration (menu section, bottom-right)
│   └── customer.png         # testimonial photo
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── Categories.jsx
    ├── Menu.jsx
    ├── Testimonials.jsx
    └── Contact.jsx
```

Adjust the folders if your project is organized differently.

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
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

Then render the sections in order, for example in `App.jsx`:

```jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Menu from "./components/Menu";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Menu />
      <Testimonials />
      <Contact />
    </>
  );
}
```

## Assets

All images are exported from `src/assets/assets.js`:

```javascript
import logo_azoukeny from "./logo_azoukeny.png";
import hero from "./hero.jpg";
import pizza from "./pizza.jpg";
import burger from "./bburger.jpg";
import frite from "./frite.jpg";
import pizza_pieces from "./pizza_pieces.png";
import pizza_slice from "./pizza_slice.png";
import tomato from "./tomato.png";
import customer from "./customer.png";

const assets = {
  logo_azoukeny,
  hero,
  pizza,
  burger,
  frite,
  pizza_pieces,
  pizza_slice,
  tomato,
  customer,
};

export default assets;
```

Use transparent PNGs for cut-out images (pizza pieces, slice, tomato). JPG images with a white background work in the category cards because of `mix-blend-multiply`.

## Customizing content

**Categories** – edit the `categories` array in `Categories.jsx` (title, tagline, subtitle, image, link). To add a Soft Drinks card, add a drinks image to the assets and a new object to the array.

**Menu items** – edit the `items` array in `Menu.jsx`:

```javascript
{ id: 1, category: "pizzas", name: "Margherita", desc: "…", price: 11.99, image: assets.pizza }
```

`category` must be one of `pizzas`, `desserts` or `extras` to match the filter tabs.

**Add to cart** – the button calls an `onAddToCart(item)` prop:

```jsx
<Menu onAddToCart={(item) => console.log(item)} />
```

**Reviews** – edit the `reviews` array in `Testimonials.jsx` (name, rating, text, optional avatar). The dots and arrows update automatically when you add or remove items.

**Contact details** – edit the `contact` object at the top of `Contact.jsx` (intro text, phone, email, address). The phone, email and address are clickable links.

**Map location** – at the top of `Contact.jsx`, choose one of two options:

```javascript
// Option 1: type any place name or address
const MAP_QUERY = "Hay Oudaden Tilila, Morocco";

// Option 2: paste the src from Google Maps > Share > Embed a map
// const MAP_SRC = "https://www.google.com/maps/embed?pb=...";
```

## Design tokens

| Token | Value |
| --- | --- |
| Primary red | `#c4161c` |
| Menu background red | `#bb0d11` |
| Hover red | `#9e1015` |
| Accent gold | `#f5b301` |
| Page background | `neutral-50` / white |

## Responsive behavior

- **Mobile:** one column, decorative slice image hidden in the menu section, testimonial photo stacked above the text, contact map below the contact details.
- **Tablet (`md`):** three category cards in a row, two menu columns, testimonial photo on the left, contact details and map side by side.
- **Desktop (`lg`+):** three menu columns and larger typography.

## To do

- [ ] Replace the placeholder images used for desserts and extras in `Menu.jsx`
- [ ] Point the **View Menu** links in `Categories.jsx` to real routes
- [ ] Connect `onAddToCart` to a cart (state, context or backend)
- [ ] Replace the placeholder text in the reviews and the Contact intro with real content
- [ ] Set the real restaurant location in the Contact map

## Commit convention

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/) style, for example:

```
feat: add Contact Us section with contact details and Google Maps iframe
feat: add Testimonials section with customer reviews carousel
feat: add Our Menu section with filter tabs and product cards
feat: add categories section with burgers, fries and pizza cards
docs: add project README with setup, structure and customization guide
```