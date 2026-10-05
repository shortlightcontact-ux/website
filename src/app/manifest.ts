import type { MetadataRoute } from "next";

import { business, seo } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.fullName,
    short_name: "Shortlight",
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1e8",
    theme_color: "#14120e",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
