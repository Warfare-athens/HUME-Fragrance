"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const NAV_LINKS = [] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky bg-[var(--background)] top-0 z-50">
      {/* Navbar container */}
      <div className="relative border-b-[1px] border-b-neutral-400 mx-5 md:mx-10 lg:mx-20 ">

        {/* Navbar content */}
        <nav
          className="relative z-30 mx-auto flex h-20 max-w-7xl items-center justify-between  sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <ul className="hidden items-center gap-8 md:flex">
          </ul>

          <button
            type="button"
            className="inline-flex items-center h-12 w-12 justify-center rounded-md md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <RiMenu4Line className="w-8 h-8 fill-[var(--foreground)]" />
          </button>

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
              className="object-contain filter brightness-0 dark:invert"
            />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-12 w-12 bg-[var(--foreground)] text-[var(--background)] text-xl text-center flex justify-center items-center rounded-full"
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
            <div className=" h-12 w-12  bg-[var(--foreground)] text-[var(--background)] text-xl text-center flex justify-center items-center rounded-full ">
              <IoSearchOutline />
            </div>
            <Link href="/cart" className=" h-12 w-12  bg-[var(--foreground)] text-[var(--background)] text-xl text-center flex justify-center items-center rounded-full ">
              <BsBagCheck />
            </Link>
          </div>

          

          <Link href="/cart" className=" md:hidden h-12 w-12  bg-[var(--foreground)] text-[var(--background)] text-xl text-center flex justify-center items-center rounded-full ">
            <BsBagCheck />
          </Link>

        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`relative z-30 border-t border-light-300 md:hidden ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="space-y-2 px-4 py-3">
          </ul>
        </div>
      </div>
    </header>
  );
}
