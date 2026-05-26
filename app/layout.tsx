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
  title: "Luxury Wedding Template | Premium Next.js Frontend",
  description:
    "A cinematic, luxury-style wedding website template inspired by modern editorial design and African wedding elegance.",
  keywords: [
    "wedding template",
    "luxury wedding website",
    "nigerian wedding",
    "next.js wedding frontend",
    "premium event website",
  ],
  openGraph: {
    title: "Luxury Wedding Template",
    description:
      "A high-end, cinematic wedding frontend template built with Next.js and Framer Motion.",
    type: "website",
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
