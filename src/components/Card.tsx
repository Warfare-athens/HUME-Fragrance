import Image from "next/image";
import Link from "next/link";

export type BadgeTone = "red" | "green" | "orange";

export interface CardProps {
  title: string;
  description?: string;
  subtitle?: string;
  meta?: string | string[];
  imageSrc: string;
  imageAlt?: string;
  price?: string | number;
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
  imageAlt = title,
  price,
  href,
  badge,
  className = "",
}: CardProps) {
  const displayPrice =
    price === undefined ? undefined : typeof price === "number" ? `$${price.toFixed(2)}` : price;
  const content = (
    <article
      className={`group rounded-xl   transition-colors hover:ring-dark-500 ${className}`}
    >
      <div className="relative  text-[#f9f3e9] aspect-square overflow-hidden  ">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1280px) 360px, (min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className="object-cover p-2 md:p-3 rounded-3xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="px-2 md:px-3">
        <div className=" flex flex-col  text-[#f9f3e9] ">
          <h3 className=" text-xl font-bold ">{title}</h3>
          {displayPrice && <span className="   ">{displayPrice}</span>}
        </div>

        <Link href={href ?? "#"} className=" w-full ">
          <div className="mt-2 text-md tracking-widest  font-bold rounded-md border-[1px] border-[#f9f3e9] px-3 py-2 text-[#43045e] text-center bg-[#f9f3e9]  hover:text-[#43045e]">
            ADD +
          </div>
        </Link>
        
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
