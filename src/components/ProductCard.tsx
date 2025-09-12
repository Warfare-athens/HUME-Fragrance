import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export default function ProductCard({ title, description, image, imageAlt }: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-card border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] overflow-hidden bg-gradient-soft">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 space-y-3">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground tracking-tight">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {description}
          </p>
        </div>
        
        <div className="pt-2">
          <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-charcoal transition-colors duration-200 group/btn">
            Explore Collection
            <svg 
              className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
}