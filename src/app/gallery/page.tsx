"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  villa: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
  pergola: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  slidingWindow: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop"
};

const filterCategories = [
  "All", "Windows", "Doors", "Facades", "Skylights", "Pergolas", "Railings", "Commercial", "Residential"
];

const galleryItems = [
  { id: 1, categories: ["Residential", "All"], label: "Courtyard Villa · Residential", img: IMAGES.villa },
  { id: 2, categories: ["Facades", "Commercial", "All"], label: "Structural Glazing · Facades", img: IMAGES.commercial },
  { id: 3, categories: ["Pergolas", "Residential", "All"], label: "Louvered Roof · Pergolas", img: IMAGES.pergola },
  { id: 4, categories: ["Windows", "Residential", "All"], label: "Slimline Sliding · Windows", img: IMAGES.slidingWindow },
  { id: 5, categories: ["Commercial", "Facades", "All"], label: "Corporate Campus · Commercial", img: IMAGES.commercial },
  { id: 6, categories: ["Doors", "Residential", "All"], label: "Terrace Opening · Doors", img: IMAGES.pergola },
  { id: 7, categories: ["Railings", "Residential", "All"], label: "Glass Guard · Railings", img: IMAGES.villa },
  { id: 8, categories: ["Skylights", "Residential", "All"], label: "Rooflight System · Skylights", img: IMAGES.pergola },
  { id: 9, categories: ["Facades", "Commercial", "All"], label: "Entrance Canopy · Facades", img: IMAGES.commercial },
  { id: 10, categories: ["Windows", "Residential", "All"], label: "Full-height Glazing · Windows", img: IMAGES.slidingWindow },
  { id: 11, categories: ["Residential", "Pergolas", "All"], label: "Outdoor Room · Residential", img: IMAGES.pergola },
  { id: 12, categories: ["Commercial", "Facades", "All"], label: "Curtain Wall Grid · Commercial", img: IMAGES.commercial }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; label: string } | null>(null);

  const filteredItems = galleryItems.filter(item => 
    item.categories.some(cat => cat.toLowerCase() === activeCategory.toLowerCase())
  );

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 pb-12 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image 
            src={IMAGES.hero} 
            alt="Premium architectural visual library" 
            fill 
            className="object-cover" 
            sizes="100vw"
            priority
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="breadcrumbs text-xs text-body/70 mb-4 flex items-center gap-2 font-heading uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-accent" />
            <span className="text-heading">Gallery</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Visual library</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Architecture in detail.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            Materials, openings, facades and outdoor systems seen through our project lens.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <Section background="main">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto relative">
          {filterCategories.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider relative transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-white z-10" : "bg-[#F3F2EC] text-body hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <span className="relative z-10">{cat}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryFilter"
                    className="absolute inset-0 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 w-full">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((image) => (
              <motion.div 
                key={image.id} 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-accent/10 bg-card hover:border-accent/30 transition-all duration-300"
                onClick={() => setLightboxImage({ src: image.img, label: image.label })}
              >
                <div className="relative w-full h-auto">
                  <Image 
                    src={image.img} 
                    alt={image.label} 
                    width={800} 
                    height={600} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="absolute inset-0 bg-[#001518]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-10">
                  <Maximize2 className="text-accent w-8 h-8 mb-2 transform scale-90 group-hover:scale-100 transition-transform duration-300" />
                  <span className="text-white font-heading font-bold text-xs uppercase tracking-widest">{image.label}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* Relevant Section CTA */}
      <Section id="cta-gallery" background="main" className="text-center">
        <div className="luxury-glass-light rounded-[32px] p-8 md:p-16 shadow-xl relative overflow-hidden text-center w-full border border-accent/30">
          <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 z-0 cad-grid-light opacity-30 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">See something relevant?</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight">Reference it in your project brief.</h2>
            <p className="text-sm text-body/80 leading-relaxed max-w-lg mx-auto font-light">
              We will help translate the intent into a system appropriate for your opening, scale and climate.
            </p>
            <div className="pt-2">
              <Button href="/request-quote" variant="primary" size="md" className="gold-glow hover:scale-105 transition-transform duration-300">
                Request Consultation
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-20 cursor-pointer"
              onClick={() => setLightboxImage(null)}
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center space-y-4">
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden border border-accent/20 shadow-2xl bg-black">
                <Image 
                  src={lightboxImage.src} 
                  alt={lightboxImage.label} 
                  fill 
                  className="object-contain" 
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
              <span className="text-white font-heading font-bold text-xs tracking-widest uppercase bg-primary/50 px-4 py-2 rounded-full border border-accent/20 backdrop-blur-sm">
                {lightboxImage.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
