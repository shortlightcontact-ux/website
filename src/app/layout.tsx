import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { media } from "@/data/media";
import { business, seo } from "@/data/site";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ogImage = media["og-image"];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f5f1e8",
};

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  title: {
    default: seo.title,
    template: `%s | ${business.name}`,
  },
  description: seo.description,
  applicationName: business.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: business.website,
    siteName: business.fullName,
    title: seo.title,
    description: seo.description,
    images: [{ url: ogImage.src, width: 1200, height: 630, alt: ogImage.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [ogImage.src],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.fullName,
  description: seo.description,
  url: business.website,
  image: ogImage.src,
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.locality,
    addressRegion: business.address.region,
    postalCode: business.address.postalCode,
    addressCountry: business.address.country,
  },
  openingHours: business.hours,
  sameAs: [business.instagramUrl],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-charcoal antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-hero-veil]{opacity:0!important}`}</style>
        </noscript>
        <Nav />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
