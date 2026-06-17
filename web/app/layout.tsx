import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Arkpol Group — Europe's Trusted Corporate Relocation Partner",
  description:
    "Move with certainty. Own crews across Europe, trusted by NATO, 30 years of international moving and corporate relocations. IAM & FEDEMAC certified. Warehouses in Poland and Germany, worldwide reach.",
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
      "Own crews across Europe. Trusted by NATO. 30 years. Worldwide reach.",
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
        {children}
      </body>
    </html>
  );
}
