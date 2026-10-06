import { useState } from "react";
import { useCart } from "../context/CartContext";

const initialValues = { username: "", city: "", address: "", phone: "" };

const validate = (v) => {
  const errors = {};
  if (v.username.trim().length < 2) errors.username = "Enter your username (at least 2 characters).";
  if (!v.city.trim()) errors.city = "Enter your city.";
  if (v.address.trim().length < 5) errors.address = "Enter your full address.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) errors.phone = "Enter a valid phone number.";
  return errors;
};

/* ---------- one form field ---------- */
const Field = ({ id, label, icon, error, multiline, ...props }) => {
  const base =
    "w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-base text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#c4161c] focus:ring-2 focus:ring-[#c4161c]/20";
  const state = error ? "border-red-500" : "border-neutral-300";
  const Tag = multiline ? "textarea" : "input";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-neutral-800">
        {label}
      </label>
      <div className="relative">
        <i
          className={`fa-solid ${icon} pointer-events-none absolute left-4 text-neutral-400 ${
            multiline ? "top-4" : "top-1/2 -translate-y-1/2"
          }`}
          aria-hidden="true"
        />
        <Tag
          id={id}
          name={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${state}`}
          {...(multiline ? { rows: 3 } : {})}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

/* ---------- page ---------- */
const Checkout = ({ onBack }) => {
  const { cart, totalCount, totalPrice, clearCart } = useCart();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    const order = {
      customer: { ...values },
      items: cart.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
      total: totalPrice,
    };
    // TODO: send `order` to your backend / WhatsApp / email service here.
    console.log("New order:", order);

    clearCart?.();
    setPlaced(order);
    window.scrollTo({ top: 0 });
  };

  /* ----- order confirmed ----- */
  if (placed) {
    return (
      <section className="bg-neutral-50 px-4 py-16 font-['Lexend'] md:py-24">
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-lg">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c4161c] text-2xl text-white">
            <i className="fa-solid fa-check" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-['Anton'] text-4xl tracking-wide text-[#c4161c]">
            Order placed
          </h1>
          <p className="mt-3 text-neutral-700">
            Thank you, {placed.customer.username}. We will call you on{" "}
            <strong>{placed.customer.phone}</strong> and deliver to{" "}
            {placed.customer.address}, {placed.customer.city}.
          </p>
          <p className="mt-2 text-lg font-bold text-[#c4161c]">
            Total: ${placed.total.toFixed(2)}
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-6 rounded-xl bg-[#c4161c] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#9e1015]"
          >
            Back to menu
          </button>
        </div>
      </section>
    );
  }

  /* ----- empty cart ----- */
  if (cart.length === 0) {
    return (
      <section className="bg-neutral-50 px-4 py-16 font-['Lexend'] md:py-24">
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-lg">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl text-neutral-400">
            <i className="fa-solid fa-basket-shopping" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-['Anton'] text-4xl tracking-wide text-[#c4161c]">
            Your cart is empty
          </h1>
          <p className="mt-3 text-neutral-700">Add a pizza from the menu before you check out.</p>
          <button
            type="button"
            onClick={() => onBack("#menu")}
            className="mt-6 rounded-xl bg-[#c4161c] px-8 py-3 text-base font-bold text-white transition-colors hover:bg-[#9e1015]"
          >
            Browse menu
          </button>
        </div>
      </section>
    );
  }

  /* ----- checkout form ----- */
  return (
    <section className="bg-neutral-50 px-4 py-10 font-['Lexend'] md:py-16">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => onBack()}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition-colors hover:text-[#c4161c]"
        >
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          Back to menu
        </button>

        <h1 className="font-['Anton'] text-5xl leading-none tracking-wide text-[#c4161c] md:text-6xl">
          Checkout
        </h1>
        <p className="mt-3 text-neutral-700">Tell us where to deliver your order.</p>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_24rem]">
          {/* form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-3xl bg-white p-6 shadow-lg sm:p-8"
          >
            <Field
              id="username"
              label="Username"
              icon="fa-user"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={values.username}
              onChange={handleChange}
              error={errors.username}
            />
            <Field
              id="city"
              label="City"
              icon="fa-city"
              type="text"
              autoComplete="address-level2"
              placeholder="Your city"
              value={values.city}
              onChange={handleChange}
              error={errors.city}
            />
            <Field
              id="address"
              label="Address"
              icon="fa-location-dot"
              multiline
              autoComplete="street-address"
              placeholder="Street, building, house number"
              value={values.address}
              onChange={handleChange}
              error={errors.address}
            />
            <Field
              id="phone"
              label="Phone"
              icon="fa-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+212 6 00 00 00 00"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-[#c4161c] py-3.5 text-base font-bold text-white shadow-md transition-colors hover:bg-[#9e1015] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4161c]"
            >
              Place order · ${totalPrice.toFixed(2)}
            </button>
          </form>

          {/* order summary */}
          <aside className="overflow-hidden rounded-3xl bg-white shadow-lg lg:sticky lg:top-24">
            <div className="flex items-center justify-between bg-[#c4161c] px-5 py-3 text-white">
              <h2 className="text-base font-semibold">Order summary</h2>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium">
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </span>
            </div>

            <ul className="max-h-96 divide-y divide-neutral-100 overflow-y-auto px-5">
              {cart.map((p) => (
                <li key={p.id} className="flex items-center gap-3 py-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-14 w-14 shrink-0 rounded-lg bg-neutral-100 object-contain"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-900">{p.name}</p>
                    <p className="text-xs text-neutral-500">
                      {p.qty} × ${p.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#c4161c]">
                    ${(p.price * p.qty).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-neutral-100 px-5 py-4">
              <span className="text-sm font-medium text-neutral-600">Total</span>
              <span className="text-2xl font-bold text-[#c4161c]">${totalPrice.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Checkout;