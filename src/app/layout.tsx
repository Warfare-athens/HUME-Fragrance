import type { Metadata } from "next";
import "./globals.css";
import { Italianno } from "next/font/google";




const italianno = Italianno({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-italianno", // important
});




export const metadata: Metadata = {
  title: "HUME Fragrance",
  description: "An e-commerce platform for HUME Fragrance products",
};

export default function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${italianno.variable}`} // ✅ attach vars
    >
      <body className="antialiased bg">{children}</body>
    </html>
  );
}

