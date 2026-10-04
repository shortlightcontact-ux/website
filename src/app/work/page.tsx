import type { Metadata } from "next";

import { WorkGallery } from "@/components/work-gallery";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected wedding photography and films by Vow & Frame — Kerala, Goa, Bengaluru and beyond.",
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <main id="main" className="flex-1">
      <WorkGallery />
    </main>
  );
}
