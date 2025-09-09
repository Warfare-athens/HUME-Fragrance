"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky bg-[#313afb] top-0 z-50">
      {/* Navbar container */}
      <div className="relative border-b-[1px] border-b-amber-200 mx-5">

        {/* Navbar content */}
        <nav
          className="relative z-30 mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-body text-[#f9f3e9] transition-colors hover:text-dark-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            aria-label="Nike Home"
            className="flex h-full w-40 items-center relative"
          >
            <Image
              src="/HF.png"
              alt="Nike"
              fill
              priority
              className="object-contain"
            />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <button className="text-body text-[#f9f3e9] transition-colors hover:text-dark-700">
              Search
            </button>
            <button className="text-body text-[#f9f3e9] transition-colors hover:text-dark-700">
              My Cart
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="mb-1 block h-0.5 w-6 bg-dark-900"></span>
            <span className="mb-1 block h-0.5 w-6 bg-dark-900"></span>
            <span className="block h-0.5 w-6 bg-dark-900"></span>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`relative z-30 border-t border-light-300 md:hidden ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="space-y-2 px-4 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-2 text-body text-dark-900 hover:text-dark-700"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between pt-2">
              <button className="text-body">Search</button>
              <button className="text-body">My Cart (2)</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
