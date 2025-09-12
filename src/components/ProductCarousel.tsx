"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { CiBookmarkPlus } from "react-icons/ci";
import { StaticImageData } from "next/image";

type Category = {
  title: string;
  description: string;
  image: string | StaticImageData;
  imageAlt: string;
};

interface ProductCarouselProps {
  categories: Category[];
}


export default function ProductCarousel({ categories }: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play functionality
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative cursor-move flex-shrink-0 w-80 mx-3"
            >

              <Card className="group relative overflow-hidden  border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-soft">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Card>
                <div className=" absolute top-2 right-3 h-10 w-10  bg-[var(--background)] text-[var(--foreground)]   text-xl text-center flex justify-center items-center rounded-full "><CiBookmarkPlus /></div>


              <div className=" absolute bottom-0 left-0 z-30 flex justify-evenly  bg-transparent  mt-4 w-full h-14">
                <div className=" h-10 w-[65%] bg-neutral-500/30 text-amber-100 backdrop-blur-sm rounded-full flex justify-center items-center dark:bg-neutral-800/30 dark:text-amber-50 ">

                {category.title}
                </div> 
                
                <div className=" h-10 w-[25%]  bg-[var(--foreground)] text-[var(--background)] text-2xl text-center flex justify-center items-center rounded-full "><GoArrowRight /></div>
              </div>


            </div>
          ))}
        </div>
      </div>
      
      {/* Carousel Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {categories.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-[var(--primary)] w-8"
                : "bg-[var(--muted-foreground)]/30 hover:bg-[var(--muted-foreground)]/60"
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}