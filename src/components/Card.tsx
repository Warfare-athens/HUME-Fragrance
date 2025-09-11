"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type BadgeTone = "red" | "green" | "orange";

export interface CardProps {
  title: string;
  description?: string;
  subtitle?: string;
  meta?: string | string[];
  imageSrc: string;
  imageSrcHover?: string; // New prop for hover image
  imageAlt?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  href?: string;
  badge?: { label: string; tone?: BadgeTone };
  className?: string;
}

const toneToBg: Record<BadgeTone, string> = {
  red: "text-[--color-red]",
  green: "text-[--color-green]",
  orange: "text-[--color-orange]",
};

export default function Card({
  title,
  description,
  subtitle,
  meta,
  imageSrc,
  imageSrcHover, // Destructure new prop
  imageAlt = title,
  minPrice,
  maxPrice,
  href,
  badge,
  className = "",
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const currentImage = isHovered && imageSrcHover ? imageSrcHover : imageSrc;

  const content = (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group rounded-xl   transition-colors hover:ring-[var(--color-dark-500)] ${className}`}
    >
      <div
        className="relative  text-[#f9f3e9] aspect-square overflow-hidden  "
      >
        <Image
          src={currentImage}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover p-2 md:p-3 rounded-3xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-2 md:px-3">
        <div className=" flex flex-col  text-[var(--color-dark-900)] ">
          <h3 className=" text-2xl md:text-3xl font-medium ">{title}</h3>
          <h4 className=" text-base md:text-lg md:font-medium mt-1 mb-3">
          {minPrice && maxPrice && (
              <span className="text-[var(--color-dark-900)]">
                <span>&#8377;</span>{" "}
                {minPrice === maxPrice
                  ? minPrice
                  : `${minPrice} - ${maxPrice}`}{" "}
                / 100 ml
              </span>
            )}
          </h4>
        </div>
        
      </div>
    </article>
  );

  return href ? (
    <Link
      href={href}
      aria-label={title}
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-dark-500]"
    >
      {content}
    </Link>
  ) : (
    content
  );
}
