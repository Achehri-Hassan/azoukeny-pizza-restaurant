import React from "react";
import assets from "../assets/assets";



const stats = [
  { icon: "fa-star", value: "4.9★", label: "Average Rating" },
  { icon: "fa-users", value: "6K+", label: "Happy Customers" },
  { icon: "fa-truck", value: "30min", label: "Avg. Delivery" },
];

function Hero() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#cc181d] lg:block lg:aspect-[1688/812]">
      
      <img
        src={assets.hero}
        alt="Authentic Italian Pizza"
        className="absolute inset-0 h-full w-full object-cover object-right"
      />

      {/* Mobile only: darken so white text stays readable */}
      <div className="absolute inset-0 bg-[#a0060c]/15 lg:hidden" />

      {/* Text block */}
      <div className="relative z-10 px-6 pb-10 pt-16 lg:absolute lg:left-[30.4%] lg:top-[20%] lg:p-0">
        <h1 className="mt-1 font-['Anton'] text-5xl leading-none tracking-wide text-white md:text-4xl lg:text-5xl xl:text-6xl">
          Authentic Italian Pizza
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-white md:text-lg lg:mt-[2.25vw] lg:w-[47vw] lg:max-w-none lg:text-[1.55vw] lg:leading-[1.35]">
          Wood-fired in our authentic Neapolitan oven, using imported Italian
          ingredients sourced directly from Naples. Every pizza is made to
          order, delivered hot to your door.
        </p>

        {/* Italian flag line */}
        <div className="mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-green-600 via-white to-red-600 lg:mt-[1.9vw] lg:h-[0.3vw] lg:w-[12.9vw]" />

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 lg:mt-[2.3vw] lg:flex-nowrap lg:gap-[1.4vw]">
          <a
            href="#order"
            className="flex items-center justify-center gap-3 rounded-2xl border border-white bg-[#e11f26] px-7 py-4 text-lg font-bold text-white shadow-[0_10px_30px_rgba(120,0,0,0.45)] transition-colors duration-300 hover:bg-[#f0262d] lg:h-[4.4vw] lg:w-[14.5vw] lg:gap-[1vw] lg:rounded-[1.6vw] lg:p-0 lg:text-[1.45vw]"
          >
            Order now
            <i className="fa-solid fa-arrow-right" />
          </a>

          <a
            href="#menu"
            className="flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 text-lg font-bold text-[var(--pimary-color)] shadow-lg transition-colors duration-300   lg:h-[4.4vw] lg:w-[14.9vw] lg:gap-[1vw] lg:rounded-[1.6vw] lg:p-0 lg:text-[1.45vw]"
          >
            <i className="fa-solid fa-utensils" />
            View menu
          </a>
        </div>
      </div>

      {/* Stats: NO white box on desktop, the white shape is already in the image */}
    <div className="relative z-10 mx-6 mb-10 flex flex-col items-start gap-y-4 rounded-3xl bg-white p-5 shadow-lg md:flex-row md:items-center md:justify-between md:px-8 lg:absolute lg:left-[2.8%] lg:top-[76.3%] lg:m-0 lg:justify-start lg:gap-[1.1vw] lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none">
        {stats.map((s, i) => (
          <React.Fragment key={s.label}>
            {i > 0 && (
               <div className="hidden w-px bg-gray-300 md:block md:h-12 lg:h-[4.4vw]" />
            )}

            <div className="flex  items-center gap-3 lg:gap-[1.1vw]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#cc181d] text-white lg:h-[2.9vw] lg:w-[2.9vw] lg:text-[1.2vw]">
                <i className={`fa-solid ${s.icon}`} />
              </div>

              <div>
                <h3 className="text-xl font-bold leading-tight text-[#cc181d] lg:text-[1.55vw]">
                  {s.value}
                </h3>
                <p className="text-sm text-gray-600 lg:text-[0.9vw]">
                  {s.label}
                </p>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default Hero;
