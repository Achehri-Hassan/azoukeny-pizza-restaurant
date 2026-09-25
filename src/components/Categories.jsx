import assets from "../assets/assets";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const BurgerIcon = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M4 10a8 5 0 0 1 16 0Z" />
    <path d="M3 13h18" />
    <path d="M5 16h14v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z" />
  </svg>
);

const FriesIcon = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M6 10l1.5 10h9L18 10" />
    <path d="M8 10V4M11 10V3M14 10V4M16.5 10V6" />
  </svg>
);

// Drink / Soda Icon (Replacing PizzaIcon for Soft Drinks)
const DrinkIcon = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M7 8h10l-1 12H8L7 8Z" />
    <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <path d="M12 4V1" />
  </svg>
);

const Sparkle = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#f5b301]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <path d="M4 4l5 3M10 2l1 5M18 9l4 1" />
  </svg>
);

const categories = [
  {
    id: "burgers",
    title: "Burgers",
    tagline: "Hot & Juicy",
    subtitle: "Juicy & Delicious",
    image: assets.burger,
    Icon: BurgerIcon,
    href: "#menu-burgers",
  },
  {
    id: "fries",
    title: "French Fries",
    tagline: "Crispy & Golden",
    subtitle: "Crispy & Golden",
    image: assets.french,
    Icon: FriesIcon,
    href: "#menu-fries",
  },
  {
    id: "coca",
    title: "Soft Drinks",
    tagline: "Cold & Refreshing",
    subtitle: "Fresh & Chilled",
    image: assets.Coca_Cola,
    Icon: DrinkIcon,
    href: "#menu-drinks",
  },
];

/* ---------- Category Card ---------- */
const CategoryCard = ({ title, tagline, subtitle, image, Icon, href }) => (
  <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
    
    {/* Header banner */}
    <div
      className="bg-[var(--pimary-color)] px-4 pb-6 pt-5 text-center"
      style={{ borderRadius: "0 0 50% 50% / 0 0 40px 40px" }}
    >
      <p className="flex items-center justify-center gap-1 font-['Kaushan_Script'] text-base text-[#f5b301]">
        {tagline}
        <Sparkle />
      </p>

      {/* Adjusted Font Size for Desktop compatibility */}
      <h3 className="mt-1 font-['Anton'] text-2xl uppercase tracking-wider text-white sm:text-3xl lg:text-3xl xl:text-4xl">
        {title}
      </h3>

      <div className="mt-3 flex items-center justify-center gap-2 text-white">
        <span className="h-px w-8 bg-white/60" />
        <Icon className="h-5 w-5 shrink-0" />
        <span className="h-px w-8 bg-white/60" />
      </div>

      <p className="mt-2 text-xs font-light text-white/90 sm:text-sm">{subtitle}</p>
    </div>

    {/* Product Image Area */}
    <div className="my-4 flex flex-1 items-center justify-center px-4">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-44 w-full object-contain mix-blend-multiply sm:h-48 lg:h-52"
      />
    </div>

    {/* Button Area */}
    <div className="flex justify-center px-6 pb-6 pt-1">
      <a
        href={href}
        className="group inline-flex items-center gap-3 rounded-xl border-2 border-[#c4161c] px-6 py-2.5 text-sm font-semibold text-[#c4161c] transition-all hover:bg-[#c4161c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4161c]"
      >
        View Menu
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12h16M14 6l6 6-6 6" />
        </svg>
      </a>
    </div>
  </div>
);

/* ---------- Section Wrapper ---------- */
const Categories = () => (
  <section id="categories" className="bg-neutral-50 px-4 py-12 md:py-16">
    <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {categories.map(({ id, ...card }) => (
        <CategoryCard key={id} {...card} />
      ))}
    </div>
  </section>
);

export default Categories;