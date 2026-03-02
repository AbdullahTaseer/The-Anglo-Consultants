import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nova-Turk Education | Specialist Turkish Education Consultants",
  description:
    "Lighting the path to Turkish Academia. Islamabad's exclusive bridge to Undergraduate, Postgraduate, and PhD programs in Türkiye. Start your journey today.",
  keywords:
    "study in Turkey, Turkish universities, Pakistan education consultant, Islamabad Turkey consultant, undergraduate Turkey, postgraduate Turkey, PhD Turkey",
  openGraph: {
    title: "Nova-Turk Education | Specialist Turkish Education Consultants",
    description:
      "Lighting the path to Turkish Academia. Islamabad's exclusive bridge to Undergraduate, Postgraduate, and PhD programs in Türkiye.",
    type: "website",
    locale: "en_US",
    siteName: "Nova-Turk Education",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova-Turk Education | Study in Türkiye",
    description: "Pakistan's premier Türkiye-only education consultancy. Expert guidance for UG, PG & PhD admissions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${playfair.variable}`}>
      <body>
        <Navbar />
        <main style={{ paddingTop: "72px" }}>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
