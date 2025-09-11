

import type { Metadata } from "next";
import "./globals.css";
import localFont  from "next/font/local";
import { Italianno } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";



const clash = localFont({
  src: "../../public/fonts/ClashDisplay-Regular.woff",
  variable: "--font-clash", // important: expose as CSS variable
});



export const metadata: Metadata = {
  title: "HUME Fragrance",
  description: "An e-commerce platform for HUME Fragrance products",
};

export default function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${clash.variable} `} // ✅ attach vars
      suppressHydrationWarning
    >
      <body className="antialiased bg">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}



  