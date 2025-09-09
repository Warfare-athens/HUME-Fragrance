"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Shield, Cpu, Smartphone, Monitor, Globe } from "lucide-react"
import { useEffect, useState } from "react";
import Link from "next/link"



export default function LandingPage() {

const showcaseImages = [
  { src: "/bg/showcase1.png", alt: "Essential Oil Bottles" },
  { src: "/bg/showcase2.png", alt: "Botanical Ingredients" },
  { src: "/bg/showcase3.jpeg", alt: "Aromatic Diffuser" },
];


  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-muted">
        <div className="absolute inset-0 bg-[url('/abstract-tech-circuit.png')] opacity-5"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
         
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            
              {/* Hero Content */}
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit bg-green-100/70 text-green-700 border-green-300/40">
                <Zap className="w-4 h-4 mr-2" />
                Pure Botanical Wellness
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font text-balance leading-tight">
                  Discover <span className="text-primary">Essential Oils</span> for Mind & Body
                </h1>
                <p className=" hidden md:block text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed max-w-lg">
                  Elevate your daily rituals with our premium, ethically sourced essential oils. Experience the natural power of botanicals for relaxation, focus, and holistic well-being.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className=" flex items-center justify-center rounded-lg font-semibold text-md bg-black text-amber-50 border-2 px-6 h-12 border-black  hover:bg-primary/5">
                  Quote for BULK ORDERS
                </Link>
                <Link href="/products" className=" flex items-center justify-center rounded-lg font-semibold text-md bg-transparent border-2 px-6 h-12 border-black  hover:bg-primary/5">
                  SHOP
                </Link>
              </div>

              <div className="flex items-center gap-8 ">
                <div className="text-center">
                  <div className="text-2xl  ">100%</div>
                  <div className="text-sm text-muted-foreground">Pure & Natural</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl  ">50+</div>
                  <div className="text-sm text-muted-foreground">Botanical Extracts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl  ">Eco</div>
                  <div className="text-sm text-muted-foreground">Sustainable Sourcing</div>
                </div>
              </div>
            </div>




            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 p-1 md:p-10">
                {/* Image Rotator */}
                {(() => {
                  const [current, setCurrent] = useState(0);

                  useEffect(() => {
                    const interval = setInterval(() => {
                      setCurrent((prev) => (prev + 1) % showcaseImages.length);
                    }, 2000);
                    return () => clearInterval(interval);
                  }, []);

                  return (
                    <img
                      src={showcaseImages[current].src}
                      alt={showcaseImages[current].alt}
                      className="w-full h-auto rounded-lg shadow-2xl transition-all duration-700"
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
              </div>
            </div>



          </div>
        </div>
      </section>
    </div>
  )
}
