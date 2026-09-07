import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import Section from "@/components/ui/Section";
import QuoteForm from "./QuoteForm";

import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

const CANONICAL = "/request-quote";

export const metadata: Metadata = {
  title: "Request a Quote — Aluminium Windows, Doors & Glazing",
  description:
    "Send your drawings or opening sizes and get a specification and quotation from Shreehari Alu Corporation for aluminium windows, doors, glazing, louvers, cladding or balustrades.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Request a Quote | Shreehari Alu Corporation",
    description:
      "Send your drawings or opening sizes and get a specification and quotation for aluminium windows, doors, glazing, louvers, cladding or balustrades.",
    url: CANONICAL,
  },
};

const IMAGES = {
  hero: "/commercial_glass_facade.png",
};

export default function RequestQuotePage() {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Request a Quote", path: CANONICAL },
        ]}
      />

      {/* Page Hero */}
      <section className="relative pt-28 pb-12 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image 
            src={IMAGES.hero} 
            alt="Request a Quote" 
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
            <span className="text-heading">Request quote</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Free project consultation</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Share the brief. We’ll shape the solution.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            Upload a drawing or send the essentials. Our technical team will review your requirement and plan the next conversation.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <Section background="section">
        <Suspense fallback={<div className="text-center py-24 text-heading font-bold">Loading Quote Form...</div>}>
          <QuoteForm />
        </Suspense>
      </Section>

      {/* Quick Direct Desk Action */}
      <Section id="quick-desk" background="main" className="py-12 text-center">
        <div className="max-w-xl mx-auto space-y-5">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Prefer a quick conversation?</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient tracking-tight">Reach the project desk directly.</h2>
          
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="tel:+919876543210" className="px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider bg-primary hover:bg-primary-hover text-white flex items-center justify-center border border-primary transition-colors shadow-md">
              Call +91 98765 43210
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider bg-accent hover:bg-[#b59556] text-white flex items-center justify-center border border-accent transition-colors shadow-md shadow-accent/25">
              WhatsApp Us
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
