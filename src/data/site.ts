import type { MediaKey } from "@/data/media";

export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  name: string;
  line: string;
  imageKey: MediaKey;
};

export type Story = {
  slug: string;
  couple: string;
  location: string;
  detail: string;
  imageKey: MediaKey;
  imageKey1: MediaKey;
};

export type StoryBeat = {
  imageKey: MediaKey;
  line: string;
  tone: "light" | "dark";
};

export type Film = {
  title: string;
  location: string;
  posterKey: MediaKey;
  videoKey: MediaKey;
};

export type Testimonial = {
  quote: string;
  attribution: string;
  imageKey: MediaKey;
};

export const business = {
  name: "Shortlight Weddings",
  fullName: "Shortlight Weddings",
  tagline: "Crafting Timeless Wedding Stories",
  locality: "Kochi",
  region: "Kerala",
  studios: "Kochi · Kerala",
  address: {
    street: "Bazaar Road, Mattancherry",
    locality: "Kochi",
    region: "Kerala",
    postalCode: "682002",
    country: "IN",
  },
  phoneDisplay: "+91 80890 92279",
  phone: "+918089092279",
  email: "info@shortlightweddings.com",
  instagram: "shortlight_weddings",
  instagramUrl: "https://instagram.com/shortlight_weddings",
  hours: "Mon–Sat, 9:00–18:00 IST",
  website: "https://shortlightweddings.com",
} as const;

export const nav: NavItem[] = [
  { label: "Work", href: "/work/" },
  { label: "Stories", href: "/#selected-stories" },
  { label: "Services", href: "/#services" },
  // { label: "Journal", href: "/#journal" },
];

export const services: Service[] = [
  {
    name: "Photography",
    line: "Documentary-led wedding photography, unhurried and unposed.",
    imageKey: "ceremony-01",
  },
  {
    name: "Films",
    line: "Cinematic wedding films with live sound and honest speech.",
    imageKey: "film-poster",
  },
  {
    name: "Pre-Wedding",
    line: "A quiet day together, made into the first chapter of the story.",
    imageKey: "couple-03",
  },
  {
    name: "Albums",
    line: "Laser-printed albums, designed to be held, not streamed.",
    imageKey: "album-01",
  },
  {
    name: "Highlights",
    line: "Short-form edits for the people who could not be in the room.",
    imageKey: "wedding-02",
  },
];

export const stories: Story[] = [
  {
    slug: "classic-wedding",
    couple: "The Garden Wedding",
    location: "Kerala",
    detail: "Classic Wedding",
    imageKey: "portfolio-01",
    imageKey1: "portfolio-01",
  },
  {
    slug: "post-wedding",
    couple: "The Day After",
    location: "Kerala",
    detail: "Post Wedding",
    imageKey: "portfolio-03",
    imageKey1: "portfolio-05",
  },
  {
    slug: "seaside-vows",
    couple: "Vows by the Sea",
    location: "Kerala Coast",
    detail: "Beach Wedding",
    imageKey: "portfolio-04",
    imageKey1: "portfolio-06",
  },
  {
    slug: "city-wedding",
    couple: "A City Celebration",
    location: "Kochi",
    detail: "City Wedding",
    imageKey: "portfolio-02",
    imageKey1: "portfolio-07",
  },
];

export const featuredStory = {
  couple: "A Wedding by the Water",
  location: "Kerala",
  beats: [
    {
      imageKey: "featured-01",
      line: "The morning began by the water, unhurried and easy.",
      tone: "light",
    },
    {
      imageKey: "featured-02",
      line: "Two hands held, a ring catching the light.",
      tone: "light",
    },
    {
      imageKey: "featured-03",
      line: "They held each other as the sea kept time.",
      tone: "light",
    },
    {
      imageKey: "featured-04",
      line: "Alone on the terrace, the ocean at their backs.",
      tone: "light",
    },
    {
      imageKey: "featured-05",
      line: "The light stayed soft, and the day held on a little longer.",
      tone: "light",
    },
  ] satisfies StoryBeat[],
};

export const films: Film[] = [
  {
    title: "Vows by the Sea",
    location: "Kerala Coast",
    posterKey: "highlight-01",
    videoKey: "film-mp4",
  },
  {
    title: "The Celebration",
    location: "Kerala",
    posterKey: "highlight-02",
    videoKey: "film-mp4",
  },
  {
    title: "A Wedding Day",
    location: "Kerala",
    posterKey: "highlight-03",
    videoKey: "film-mp4",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "They never asked us to perform. They waited, and somehow every real thing happened in front of them.",
    attribution: "Halwin & Agnes · Varkala",
    imageKey: "testimonial-01",
  },
  {
    quote:
      "We watch the film every anniversary. The first ten seconds still make my mother cry.",
    attribution: "Diya & Akash · Goa",
    imageKey: "wedding-04",
  },
];

export const philosophy = {
  headline: ["We don't just photograph weddings.", "We photograph how they felt."],
  line: "The look a mother gives her daughter before the doors open — and the quiet just after.",
  imageKey: "philosophy-01" as MediaKey,
};

export const albums = {
  heading: "The story doesn't end on a screen.",
  line: "Each wedding is designed into a laser-printed album — printed with care, and made to be passed around a table.",
  imageKeys: ["album-shot-01", "album-shot-02", "album-shot-03"] as MediaKey[],
};

export const journal = {
  heading: "From the frame",
  handle: "@shortlight_weddings",
  imageKeys: [
    "wedding-02",
    "details-02",
    "couple-03",
    "wedding-03",
    "portrait-01",
    "ceremony-02",
    "wedding-05",
    "details-03",
  ] as MediaKey[],
};

export const contact = {
  heading: "Let's make something worth remembering.",
  line: "Tell us a little about your day.",
  services: ["Photography", "Films", "Pre-Wedding", "Albums", "Not sure yet"],
  note: "Sending an enquiry does not confirm a booking — we'll reply with availability and a full collection guide.",
};

export const seo = {
  title: "Shortlight Weddings | Wedding Photography & Films in Kerala",
  description:
    "Shortlight Weddings creates cinematic wedding photography, wedding films and laser-printed albums in Kerala and across India.",
} as const;
