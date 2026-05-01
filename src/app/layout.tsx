import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Emmanuel Acheampong Oppong — Software Engineer",
  description:
    "CS student at Grambling State University. Systems thinker, full-stack builder, open-source contributor. NVIDIA, Google mentorship, Hubtel internship.",
  openGraph: {
    title: "Emmanuel Acheampong Oppong",
    description: "Systems thinker. Full-stack builder. Open-source contributor.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
