import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "unredact.py — PDF Redaction Audit Tool",
  description:
    "A Python forensic tool that recovers hidden text from weakly redacted PDFs — black-on-black text, unflattened overlays, and everything in between. MIT licensed. Open source.",
  keywords: [
    "PDF redaction",
    "unredact",
    "forensic PDF tool",
    "PyMuPDF",
    "hidden text recovery",
    "PDF security audit",
    "Python PDF tool",
  ],
  authors: [{ name: "OpLumina", url: "https://github.com/oplumina" }],
  openGraph: {
    title: "unredact.py — What they hid. Revealed.",
    description:
      "Recover hidden text from weakly redacted PDFs. Black-on-black text, unflattened overlays — all surfaced in one command.",
    type: "website",
    url: "https://github.com/oplumina/unredact.py",
  },
  twitter: {
    card: "summary_large_image",
    title: "unredact.py — PDF Redaction Audit Tool",
    description: "Recover hidden text from weakly redacted PDFs. MIT licensed. Open source.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
