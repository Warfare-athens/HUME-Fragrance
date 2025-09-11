"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsBagCheck } from "react-icons/bs";
import { RiMenu4Line } from "react-icons/ri";

const NAV_LINKS = [] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky bg-amber-50 top-0 z-50">
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
            <RiMenu4Line className="w-8 h-8 fill-black" />
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
              className="object-contain filter brightness-0"
            />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            <div className=" h-12 w-12  bg-black text-amber-50 text-xl text-center flex justify-center items-center rounded-full ">
              <IoSearchOutline />
            </div>
            <Link href="/cart" className=" h-12 w-12  bg-black text-amber-50 text-xl text-center flex justify-center items-center rounded-full ">
              <BsBagCheck />
            </Link>
          </div>

          

          <Link href="/cart" className=" md:hidden h-12 w-12  bg-black text-amber-50 text-xl text-center flex justify-center items-center rounded-full ">
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
