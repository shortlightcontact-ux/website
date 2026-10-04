"use client";

import { useState } from "react";

import { DateField, SelectField } from "@/components/primitives/form-controls";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeader } from "@/components/primitives/section-header";
import { business, contact } from "@/data/site";

const labelClass = "eyebrow mb-2 block text-taupe";

const controlClass =
  "peer w-full appearance-none rounded-none border-b bg-transparent py-3 text-base text-charcoal outline-none transition-colors [border-color:color-mix(in_srgb,currentColor_22%,transparent)] placeholder:text-charcoal/35 focus:[border-color:currentColor]";

const whatsappHref = `https://wa.me/${business.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  `Hi ${business.name}, I'd like to enquire about your wedding photography packages.`,
)}`;

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-cream px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto grid max-w-[110rem] gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeader label="Contact" title={contact.heading} />
          <p className="mt-6 max-w-md text-base text-charcoal/70">{contact.line}</p>

          <dl className="mt-10 grid gap-px overflow-hidden border [border-color:color-mix(in_srgb,currentColor_12%,transparent)] bg-[color-mix(in_srgb,currentColor_12%,transparent)] min-[900px]:grid-cols-3 lg:grid-cols-1">
            <div className="min-w-0 bg-cream p-5">
              <dt className={labelClass}>Email</dt>
              <dd className="break-words">
                <a className="link-underline text-sm" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </dd>
            </div>
            <div className="min-w-0 bg-cream p-5">
              <dt className={labelClass}>Phone / WhatsApp</dt>
              <dd className="break-words">
                <a
                  className="link-underline text-sm"
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
            <div className="min-w-0 bg-cream p-5">
              <dt className={labelClass}>Studio</dt>
              <dd className="break-words text-sm leading-relaxed">
                {business.address.street}, {business.address.locality},{" "}
                {business.address.region} {business.address.postalCode}
              </dd>
            </div>
          </dl>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <form
            className="border bg-ivory p-6 sm:p-8 lg:p-10 [border-color:color-mix(in_srgb,currentColor_12%,transparent)]"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const subject = `Wedding enquiry — ${data.get("name") || "New enquiry"}`;
              const body = [
                `Name: ${data.get("name")}`,
                `Partner: ${data.get("partner")}`,
                `Email: ${data.get("email")}`,
                `Wedding date: ${data.get("date")}`,
                `Location: ${data.get("location")}`,
                `Service: ${data.get("service")}`,
                "",
                `${data.get("message")}`,
              ].join("\n");

              window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
                subject,
              )}&body=${encodeURIComponent(body)}`;
              setSent(true);
            }}
          >
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="name">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className={controlClass}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="partner">
                  Partner&rsquo;s name
                </label>
                <input
                  id="partner"
                  name="partner"
                  className={controlClass}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  className={controlClass}
                  placeholder="you@example.com"
                />
              </div>
              <DateField name="date" label="Wedding date" />
              <div>
                <label className={labelClass} htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  autoComplete="address-level2"
                  className={controlClass}
                  placeholder="City, country"
                />
              </div>
              <SelectField
                name="service"
                label="What you&rsquo;re looking for"
                options={contact.services}
                defaultValue={contact.services[0]}
              />
              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="message">
                  Tell us about your day
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`${controlClass} resize-none`}
                  placeholder="Venue, guest count, the parts you care most about…"
                />
              </div>
              <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="eyebrow inline-flex items-center justify-center gap-3 border border-charcoal px-8 py-4 transition-colors hover:bg-charcoal hover:text-ivory"
                >
                  Send enquiry <span aria-hidden="true">↗</span>
                </button>
                <p className="max-w-sm text-xs leading-relaxed text-charcoal/55">
                  {contact.note}
                </p>
              </div>
              <p
                className="text-sm text-olive sm:col-span-2"
                role="status"
                aria-live="polite"
              >
                {sent ? "Opening your email client…" : ""}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
