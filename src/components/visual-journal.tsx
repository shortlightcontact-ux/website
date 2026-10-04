"use client";

import { Masonry, type MasonryItem } from "@/components/primitives/masonry";
import { SectionHeader } from "@/components/primitives/section-header";
import { business, journal } from "@/data/site";

export function VisualJournal() {
  const items: MasonryItem[] = journal.imageKeys.map((imageKey, index) => ({
    id: `${imageKey}-${index}`,
    imageKey,
  }));

  return (
    <section
      id="journal"
      className="scroll-mt-24 bg-ivory px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[110rem]">
        <SectionHeader
          index="10"
          label="Journal"
          title={journal.heading}
          action={{ label: journal.handle, href: business.instagramUrl }}
        />

        <Masonry
          items={items}
          columns="3"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="mt-10 lg:mt-14"
        />
      </div>
    </section>
  );
}
