import ProductCarousel from "@/components/ProductCarousel";
import healthWellnessImage from "../../public/categories/health.png";
import fragrancePerfumeryImage from "../../public/categories/fragrance.png";
import cosmeticBeautyImage from "../../public/categories/cosmetic.png";
import othersLifestyleImage from "../../public/categories/others.png";

const Categories = () => {
  
  const category = [
    {
      title: "Health & Wellness",
      description: "Clinically proven, traceable and advanced botanical formulas that transform the state of your well-being.",
      image: healthWellnessImage,
      imageAlt: "Premium health and wellness products including vitamins, supplements, and natural health essentials"
    },
    {
      title: "Fragrance & Perfumery", 
      description: "Exquisite fragrances and aromatic experiences crafted with the finest ingredients and artisanal techniques.",
      image: fragrancePerfumeryImage,
      imageAlt: "Luxury fragrance collection featuring premium perfumes and aromatic products"
    },
    {
      title: "Cosmetic & Beauty ",
      description: "Revolutionary beauty formulations that enhance your natural radiance with scientifically-backed ingredients.",
      image: cosmeticBeautyImage,
      imageAlt: "Premium cosmetic and beauty products including skincare, makeup, and beauty tools"
    },
    {
      title: "Others",
      description: "Curated selection of premium lifestyle products and sophisticated essentials for the discerning individual.",
      image: othersLifestyleImage,
      imageAlt: "Premium lifestyle and luxury products collection"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 bg-gradient-soft">
        <div className="max-w-4xl mx-auto mt-20 sm:mt-0 text-center ">
          <div className="space-y-4">
            <h1 className=" text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight">
              Explore Our Essential Oils
            </h1>
            <p className=" hidden md:block text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our collection of pure, therapeutic-grade essential oils, crafted to elevate your well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Product Carousel */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <ProductCarousel categories={category} />
      </section>
    </main>
  );
};

export default Categories;
