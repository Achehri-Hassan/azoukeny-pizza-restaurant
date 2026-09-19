import { useState } from "react";
import assets from "../assets/assets"; 


const reviews = [
  {
    id: 1,
    name: "Alex Mergan",
    rating: 4.9,
    text: "The Neapolitan pizza here is unreal: crispy crust, fresh basil and real mozzarella. The staff were friendly and our order came out hot and fast.",
    avatar: assets.clients, 
  },
  {
    id: 2,
    name: "Sara Benali",
    rating: 5.0,
    text: "Best delivery in town. My pizza arrived hot, the packaging was spotless, and the team even called to confirm my order. I'm ordering again this weekend.",
    avatar: assets.clients3,
  },
  {
    id: 3,
    name: "Youssef Amrani",
    rating: 4.8,
    text: "We booked a table for a family dinner and everything was perfect. Great atmosphere, generous portions and a waiter who really knew the menu..",
    avatar: assets.clients2,
  },
];
 
/* ---------- icons ---------- */
const Star = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[var(--pimary-color)]" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const Arrow = ({ dir }) => (
  <svg
    viewBox="0 0 24 24"
    className={`h-6 w-6 ${dir === "left" ? "rotate-180" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

/* ---------- section ---------- */
const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((i) => (i + 1) % reviews.length);

  const arrowBtn =
    "flex h-12 w-12 items-center justify-center rounded-full bg-[#c4161c] text-white transition-colors hover:bg-[#9e1015] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4161c]";

  return (
    <section id="reviews" className="relative -top-72 bg-white px-4 py-16 font-['Lexend'] md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[22rem_1fr] md:gap-12 lg:grid-cols-[26rem_1fr] lg:gap-16">
        {/* customer photo */}
        <img
          src={assets.customers}
          alt="Happy customer holding a slice of pizza"
          className="mx-auto aspect-square w-full max-w-sm rounded-full object-cover md:max-w-none"
        />

        {/* text side */}
        <div>
          <h2 className=" mt-1 font-['Anton'] text-5xl leading-none tracking-wide  md:text-4xl lg:text-5xl xl:text-6xl text-[#c4161c] ">
            What our customers say
          </h2>
          <p className="mt-4 text-2xl font-medium text-neutral-900">
            Loved By Thousands Of Pizza Lovers
          </p>

          <p
            key={review.id}
            aria-live="polite"
            className="mt-4 min-h-[6rem] max-w-md text-base leading-relaxed text-neutral-800"
          >
            {review.text}
          </p>

          {/* reviewer + arrows */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-4">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="h-16 w-16 shrink-0 rounded-full bg-[#a91218]" aria-hidden="true" />
                )}
                <div>
                  <p className="text-lg font-medium text-neutral-900">{review.name}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} />
                    ))}
                    <span className="ml-1 text-base font-medium text-neutral-900">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* dots */}
              <div className="mt-3 flex gap-1.5">
                {reviews.map((r, i) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show review ${i + 1}`}
                    aria-current={i === index}
                    className={`h-1.5 w-4 rounded-full transition-colors ${
                      i === index ? "bg-[#c4161c]" : "bg-neutral-400 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4 md:mr-8 lg:mr-16">
              <button type="button" onClick={prev} aria-label="Previous review" className={arrowBtn}>
                <Arrow dir="left" />
              </button>
              <button type="button" onClick={next} aria-label="Next review" className={arrowBtn}>
                <Arrow dir="right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
