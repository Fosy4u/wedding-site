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
  title: "Francis & Eleanor Wedding | #Fran-Ele-Union",
  description:
    "Official wedding website for Francis and Eleanor. View ceremony details, RSVP interest, and celebrate #Fran-Ele-Union.",
  keywords: [
    "Francis and Eleanor wedding",
    "Fran-Ele-Union",
    "wedding in Enugu",
    "Nigerian wedding",
    "wedding RSVP",
    "wedding invitation",
  ],
  category: "event",
  applicationName: "Francis & Eleanor Wedding",
  openGraph: {
    title: "Francis & Eleanor Wedding",
    description:
      "Celebrate with Francis and Eleanor. RSVP interest and follow wedding updates for #Fran-Ele-Union.",
    type: "website",
    siteName: "Francis & Eleanor Wedding",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francis & Eleanor Wedding",
    description:
      "Celebrate with Francis and Eleanor. RSVP interest and follow wedding updates.",
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
