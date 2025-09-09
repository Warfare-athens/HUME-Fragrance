import type { Metadata } from "next";
import "./globals.css";
import localFont  from "next/font/local";
import { Italianno } from "next/font/google";



const clash = localFont({
  src: "../fonts/clash/ClashDisplay-Regular.woff",
  variable: "--font-clash", // important: expose as CSS variable
});

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
      className={`${clash.variable} ${italianno.variable}`} // ✅ attach vars
    >
      <body className="antialiased bg">{children}</body>
    </html>
  );
}

