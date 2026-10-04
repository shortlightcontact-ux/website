import { Albums } from "@/components/albums";
import { ContactForm } from "@/components/contact-form";
import { DeferredFeaturedStory, DeferredImageSequence } from "@/components/deferred";
import { FilmSection } from "@/components/film-section";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HighlightFilms } from "@/components/highlight-films";
import { Philosophy } from "@/components/philosophy";
import { SelectedStories } from "@/components/selected-stories";
import { ServicesList } from "@/components/services-list";
import { Testimonials } from "@/components/testimonials";
import { VisualJournal } from "@/components/visual-journal";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <SelectedStories />
      <DeferredFeaturedStory />
      <DeferredImageSequence />
      <FilmSection />
      <HighlightFilms />
      <Philosophy />
      <ServicesList />
      <Albums />
      <Testimonials />
      {/*<VisualJournal />*/}
      <ContactForm />
      <FinalCta />
    </main>
  );
}
