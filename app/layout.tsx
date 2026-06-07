import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eleanor & Francis Wedding | #EndearedForever",
  description:
    "Official wedding website for Eleanor and Francis. View ceremony details, RSVP interest, and celebrate #EndearedForever.",
  keywords: [
    "Eleanor and Francis wedding",
    "EndearedForever",
    "wedding in Enugu",
    "Nigerian wedding",
    "wedding RSVP",
    "wedding invitation",
  ],
  category: "event",
  applicationName: "Eleanor & Francis Wedding",
  openGraph: {
    title: "Eleanor & Francis Wedding",
    description:
      "Celebrate with Eleanor and Francis. RSVP interest and follow wedding updates for #EndearedForever.",
    type: "website",
    siteName: "Eleanor & Francis Wedding",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleanor & Francis Wedding",
    description:
      "Celebrate with Eleanor and Francis. RSVP interest and follow wedding updates.",
  },
  icons: {
    icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
