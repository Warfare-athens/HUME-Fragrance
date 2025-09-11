import Image from "next/image";
import Link from "next/link";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";



const columns = [
  {
    title: "Shop",
    links: ["All Oils", "Blends", "Diffusers", "Gift Sets"],
  },
  {
    title: "Learn",
    links: ["About Essential Oils", "How To Use", "Blog", "FAQs"],
  },
  {
    title: "Company",
    links: ["Our Story", "Sustainability", "Contact Us", "Careers"],
  },
  {
    title: "Support",
    links: ["Shipping", "Returns", "Order Tracking", "Help Center"],
  },
] as const;

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-light-100)]  text-[var(--color-dark-900)]">
      {/* Optional: Add a subtle wave or plant background image for essential oil theme */}
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div className="flex items-start md:col-span-3">
            <Image src="/HF logo bg.png" className="fill-red-100" alt="HUME Fragrance" width={60} height={60} />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-heading-3 font-semibold">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-body text-[#e043045ed8c3] hover:text-[#b6e2d3] transition-colors"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex gap-4 md:col-span-2 md:justify-end">
            {[
              { src: <FaSquareFacebook/> , alt: "Facebook" },
              { src: <FaInstagramSquare/> ,alt: "Pinterest" },
            ].map((s) => (
              <Link
                key={s.alt}
                href="#"
                aria-label={s.alt}
                className="inline-flex h-10 w-10 text-3xl items-center justify-center rounded-md bg-[var(--color-light-200)] hover:bg-[#b6e2d3] "
              >
                {s.src}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-light-300)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 text-[var(--color-dark-500)] sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-caption">
            <Image src="/icon-globe.svg" alt="" width={16} height={16} />
            <span>Worldwide</span>
            <span>© 2025 HUME Fragrance. All Rights Reserved</span>
          </div>
          <ul className="flex items-center gap-6 text-caption">
            {["Guides", "Terms of Sale", "Terms of Use", "Privacy Policy"].map((t) => (
              <li key={t}>
                <Link href="#" className="hover:text-[var(--color-dark-900)] transition-colors">{t}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}