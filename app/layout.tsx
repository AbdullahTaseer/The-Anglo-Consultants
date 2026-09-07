import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Anglo Consultants | Specialist Turkish Education Consultants",
  description:
    "Lighting the path to Turkish Academia. Islamabad's exclusive bridge to Undergraduate, Postgraduate, and PhD programs in Türkiye. Start your journey today.",
  keywords:
    "study in Turkey, Turkish universities, Pakistan education consultant, Islamabad Turkey consultant, undergraduate Turkey, postgraduate Turkey, PhD Turkey",
  icons: {
    icon: "/logo-mark.png",
    apple: "/logo-mark.png",
  },
  openGraph: {
    title: "The Anglo Consultants | Specialist Turkish Education Consultants",
    description:
      "Lighting the path to Turkish Academia. Islamabad's exclusive bridge to Undergraduate, Postgraduate, and PhD programs in Türkiye.",
    type: "website",
    locale: "en_US",
    siteName: "The Anglo Consultants",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Anglo Consultants | Study in Türkiye",
    description: "Pakistan's premier Türkiye-only education consultancy. Expert guidance for UG, PG & PhD admissions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <Navbar />
        <main className="pt-[72px]">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
