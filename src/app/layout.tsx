

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";







export const metadata: Metadata = {
  title: "HUME Fragrance",
  description: "An e-commerce platform for HUME Fragrance products",
};

export default function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={``} // ✅ attach vars
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



  