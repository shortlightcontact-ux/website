import type { MetadataRoute } from "next";

import { business } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.website;
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/work/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
