import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// ✅ Corrected: Separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// ✅ Metadata (excluding viewport)
export const metadata: Metadata = {
  title: "Contact Management",
  description: "Contact Management Website for RPA Exercises",
  metadataBase: new URL("https://contact-management-rpa.vercel.app/"), // ✅ Replace with your actual domain
  icons: "/favicon.ico",
  keywords: ["Contact Management","RPA",],
  authors: [{ name: "Deepak D Nayak", url: "https://contact-management-rpa.vercel.app/" }],
  openGraph: {
    title: "Contact Management",
    description: "Contact Management Website for RPA Exercises",
    url: "https://contact-management-rpa.vercel.app/",
    siteName: "Contact Management",
    images: [
      {
        url: "/logo.png", // ✅ Ensure this image exists in public/
        width: 1200,
        height: 630,
        alt: "Contact Management Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Management",
    description: "Contact Management Website for RPA Exercises",
    images: ["/logo.png"], // ✅ Ensure this image exists in public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
