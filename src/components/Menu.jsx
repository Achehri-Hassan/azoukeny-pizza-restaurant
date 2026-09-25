import { useState } from "react";
import assets from "../assets/assets";
import { useCart } from "../context/CartContext";


const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const SliceIcon = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M12 21 3.5 6a17 17 0 0 1 17 0Z" />
    <circle cx="10" cy="9" r="1" />
    <circle cx="14" cy="11.5" r="1" />
  </svg>
);

const CupcakeIcon = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M6 12h12l-1.5 8h-9Z" />
    <path d="M6.5 12a5.5 5 0 0 1 11 0" />
    <path d="M12 5V3" />
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CartIcon = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M3 4h2.5l2 10h10l2-7H7" />
    <circle cx="9" cy="19" r="1.2" />
    <circle cx="17" cy="19" r="1.2" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const MinusIcon = ({ className }) => (
  <svg {...svgProps} className={className}>
    <path d="M5 12h14" />
  </svg>
);



const tabs = [
  { id: "all", label: "All", Icon: null },
  { id: "pizzas", label: "Pizzas", Icon: SliceIcon },
  { id: "desserts", label: "Desserts", Icon: CupcakeIcon },
  { id: "extras", label: "Extras", Icon: PlusIcon },
];


const items = [
  { id: 1, category: "pizzas", name: "Margherita", desc: "Tomato, fior di latte and fresh basil.", price: 11.99, image: assets.Margherita },
  { id: 2, category: "pizzas", name: "Pepperoni", desc: "Spicy pepperoni, mozzarella and tomato.", price: 13.5, image: assets.pepperoni },
  { id: 3, category: "pizzas", name: "Vegetariana", desc: "Peppers, olives, mushrooms and onion.", price: 12.75, image: assets.Vegetariana },
  { id: 4, category: "desserts", name: "Tiramisu", desc: "Mascarpone cream, espresso and cocoa.", price: 6.5, image: assets.Tiramisu1 },
  { id: 5, category: "desserts", name: "Nutella Calzone", desc: "Warm folded dough filled with Nutella.", price: 7.25, image: assets.Nutella_1 },
  { id: 6, category: "extras", name: "Garlic Bread", desc: "Wood-fired bread with garlic butter.", price: 4.5, image: assets.Bread },
  { id: 7, category: "extras", name: "Caesar Salad", desc: "Romaine, parmesan and crunchy croutons.", price: 5.75, image: assets.Salad1 },
];

/* ---------- card ---------- */
const MenuCard = ({ item, onAddToCart, onOpen }) => (
  <section
    onClick={() => onOpen(item)}
    className="flex cursor-pointer items-center gap-4 rounded-2xl bg-white p-4 shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
  >
    <img
      src={item.image}
      alt={item.name}
      loading="lazy"
      className="aspect-square h-28 w-28 shrink-0  sm:h-32 sm:w-32"
    />

    <div className="flex min-w-0 flex-1 flex-col">
      <h3 className="text-xl font-medium text-neutral-900">{item.name}</h3>
      <p className="mt-1 text-xs leading-snug text-neutral-700">{item.desc}</p>
      <p className="mt-2 text-lg font-bold text-[var(--pimary-color)]">${item.price.toFixed(2)}</p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // don't trigger the card's onOpen
          onAddToCart(item);
        }}
        className="mt-1 inline-flex items-center gap-1.5 self-end rounded-lg bg-[#c4161c] px-3 py-1.5 text-xs font-medium text-white transition-colors hover: focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4161c]"
      >
        <CartIcon className="h-4 w-4" />
        Add to cart
      </button>
    </div>
  </section>
);



/* ---------- section ---------- */
const Menu = () => {
  const { addToCart } = useCart();
  const [active, setActive] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const visible = active === "all" ? items : items.filter((i) => i.category === active);

  const handleModalAdd = (item, qty) => {
    addToCart(item, qty);
  };

  return (
    <section
      id="menu"
      className="relative  overflow-hidden bg-[#bb0d11] pb-32 font-['Lexend'] text-white"
    >
    
      <div className="absolute left-0 top-0 flex h-28 w-28 items-center justify-center rounded-br-[3rem] bg-white sm:h-40 sm:w-40 md:h-48 md:w-52 md:rounded-br-[5rem]">
        <img
          src={assets.pizza_small}
          alt=""
          className=" w-96 object-contain"
        />
      </div>

     
      <img
        src={assets.pizza_small}
        alt=""
        className="pointer-events-none absolute right-0 top-2 hidden w-36 -rotate-6 sm:block md:w-44"
      />

  
      <div className="px-4 pt-10 pl-36 sm:pl-48 sm:pr-44 md:pl-64 md:pt-16">
        <h2 className="mt-1 font-['Anton'] text-5xl leading-none tracking-wide text-white md:text-4xl lg:text-5xl xl:text-6xl">Our Menu</h2>
        <p className=" mt-5 max-w-xs text-base leading-snug md:text-lg">
          Wood-fired in our authentic Neapolitan oven, using imported
          ingredients.
        </p>
      </div>

    
      <div className="mt-8 flex flex-wrap gap-3 px-4 md:mt-10 md:pl-64">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(id)}
              className={` cursor-pointer font-bold  inline-flex items-center gap-2 rounded-lg border px-6 py-2 text-base transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                isActive
                  ? "border-white bg-amber-400"
                  : "border-white/50 hover:bg-white/10"
              }`}
            >
              {Icon && <Icon className="h-5 w-5" />}
              {label}
            </button>
          );
        })}
      </div>

      {/* cards */}
      <div className=" mx-auto mt-10 grid max-w-6xl gap-5 px-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onAddToCart={(i) => addToCart(i, 1)}
            onOpen={setSelectedItem}
          />
        ))}
      </div>

    

      {/* tomato, bottom right */}
      <img
        src={assets.tomato}
        alt=""
        className="pointer-events-none absolute bottom-4 right-6 w-16 md:w-28"
      />
    </section>
  );
};

export default Menu;
