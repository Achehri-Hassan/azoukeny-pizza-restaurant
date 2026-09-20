
const contact = {
  intro:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, nulla nemo illum commodi quas repellat?",
  phone: "+212 6484747484",
  email: "Ajoukeny@gmail.com",
  address: "Hay oudaden Tilila",
};


const MAP_QUERY = "Hay Oudaden Tilila, Morocco";

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;

/* ---------- icons ---------- */
const PhoneIcon = () => (
  <i className="fa-solid fa-phone w-8 shrink-0 text-center text-2xl text-[var(--pimary-color)]" aria-hidden="true"></i>
);

const MailIcon = () => (
  <i className="fa-solid fa-envelope w-8 shrink-0 text-center text-2xl text-[var(--pimary-color)]" aria-hidden="true"></i>
);

const PinIcon = () => (
  <i className="fa-solid fa-location-dot w-8 shrink-0 text-center text-2xl text-[var(--pimary-color)]" aria-hidden="true"></i>
);


/* ---------- one contact row ---------- */
const Row = ({ icon, label, href, external }) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    className="group flex items-center gap-4 text-lg font-medium text-neutral-900 transition-colors hover:text-[var(--pimary-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c4161c]"
  >
    {icon}
    <span className="break-words">{label}</span>
  </a>
);

/* ---------- section ---------- */
const Contact = () => (
  <section id="contact" className="bg-white font-['Lexend']  relative -top-72 ">
    <div className="grid md:grid-cols-2">
    
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <h2 className="mt-1 font-['Anton'] text-5xl leading-none tracking-wide  md:text-4xl lg:text-5xl xl:text-6xl text-[var(--pimary-color)]">Contact Us</h2>
        <p className="mt-5 max-w-md text-base font-medium leading-snug text-neutral-900 ">
          {contact.intro}
        </p>

        <div className="mt-8 flex flex-col gap-7">
          <Row
            icon={<PhoneIcon />}
            label={contact.phone}
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
          />
          <Row
            icon={<MailIcon />}
            label={contact.email}
            href={`mailto:${contact.email}`}
          />
          <Row
            icon={<PinIcon />}
            label={contact.address}
            href={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}`}
            external
          />
        </div>
      </div>

     
      <iframe
        title="Restaurant location"
        src={MAP_SRC}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="h-80 w-full border-0 md:h-full md:min-h-[26rem]"
      />
    </div>
  </section>
);

export default Contact;
