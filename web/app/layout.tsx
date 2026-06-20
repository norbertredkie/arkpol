import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "./i18n";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arkpol.com"),
  title: "Arkpol Group — International & Corporate Relocations | Move With Certainty",
  description:
    "International moving and corporate relocations done right. Our own crews across Central Europe, an IAMTrusted, FIDI-accredited network worldwide, and 30 years of getting it there intact and on time. Warehouses in Poland and Germany.",
  keywords: [
    "international moving company",
    "corporate relocation Europe",
    "NATO relocation",
    "IAM certified movers",
    "FEDEMAC",
    "moving company Poland",
    "moving company Germany",
  ],
  openGraph: {
    title: "Arkpol Group — Move With Certainty",
    description:
      "Our own crews across Central Europe. IAMTrusted, FIDI-accredited worldwide. 30 years of moves that simply had to arrive.",
    url: "https://arkpol.com",
    siteName: "Arkpol Group",
    locale: "en_GB",
    type: "website",
  },
  alternates: { canonical: "https://arkpol.com" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Arkpol Group",
  url: "https://arkpol.com",
  email: "arkpol@arkpol.com",
  slogan: "Move With Certainty",
  foundingDate: "1995",
  areaServed: "Europe and worldwide",
  memberOf: [
    { "@type": "Organization", name: "IAM (International Association of Movers)" },
    { "@type": "Organization", name: "FEDEMAC" },
    { "@type": "Organization", name: "IMA" },
    { "@type": "Organization", name: "IAMX" },
  ],
  sameAs: ["https://www.linkedin.com/company/arkpol-group"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
