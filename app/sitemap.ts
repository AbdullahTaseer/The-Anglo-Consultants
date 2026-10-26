import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://theangloconsultants.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/universities`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/programs`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/apply`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
}
