import { useEffect, useState } from "react";
import Image from "next/image";

interface ImageRotatorProps {
  images: { src: string; alt: string }[];
}

export default function ImageRotator({ images }: ImageRotatorProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <Image
      src={images[current].src}
      alt={images[current].alt}
      width={500}
      height={500}
      sizes="100vw"
      className="w-full h-auto rounded-lg shadow-2xl transition-all duration-700"
    />
  );
}
