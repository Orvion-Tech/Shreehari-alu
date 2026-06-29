"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2, ChevronRight, ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ProductVisualizer from "@/components/ui/ProductVisualizer";

const IMAGES = {
  hero: "/villa_modern_glazing.png",
  windows: "/overview_windows.png",
  doors: "/overview_doors.png",
  facades: "/service_structural_glazing.png",
  architectural: "/service_architectural_systems.png"
};

const tabs = [
  { id: "windows", label: "Windows" },
  { id: "doors", label: "Doors" },
  { id: "facades", label: "Facade systems" },
  { id: "architectural", label: "Architectural systems" }
];

const productData = {
  windows: {
    cards: [
      { title: "Sliding Windows", desc: "Two, three and four-track systems for effortless, space-saving ventilation.", img: "/services_windows_doors.png" },
      { title: "Casement Windows", desc: "Compression-sealed performance with broad opening and controlled air flow.", img: "/minimal_sliding_window.png" },
      { title: "Fixed Windows", desc: "Clean, economical daylight openings with minimal frames and no moving hardware.", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop" },
      { title: "Combination Windows", desc: "Fixed, sliding and casement modules composed into one coordinated opening.", img: "/hero_courtyard_villa.png" }
    ],
    overviewImg: "/overview_windows.png",
    specs: [
      { label: "System formats", value: "Sliding · Casement · Fixed · Combination" },
      { label: "Glass range", value: "Single / DGU / Laminated" },
      { label: "Finish options", value: "Powder coat · Anodised · Wood effect" },
      { label: "Security", value: "Single / Multi-point locking" }
    ],
    description: "Features include slim sightlines, engineered drainage, quality gaskets, secure hardware and insect-screen compatibility. Ideal for villas, apartments, hotels, offices and institutions."
  },
  doors: {
    cards: [
      { title: "Sliding Doors", desc: "Large panels, quiet rollers and optional low thresholds for easy connection.", img: "/about_intro_villa.png" },
      { title: "Casement Doors", desc: "Secure hinged doors with strong sealing and flexible glass or panel infill.", img: "/villa_modern_glazing.png" },
      { title: "French Doors", desc: "Balanced double-leaf openings with elegant symmetry and generous access.", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=600&auto=format&fit=crop" },
      { title: "Folding Doors", desc: "Stacking panels that open entire walls for hospitality and outdoor living.", img: "/louvered_pergola_villa.png" },
      { title: "Pivot Doors", desc: "Statement entrances with generous scale, concealed pivots and bespoke finishes.", img: "/product_statement_pivot.png" }
    ],
    overviewImg: "/overview_doors.png",
    specs: [
      { label: "System formats", value: "Sliding · Hinged · Folding · Pivot" },
      { label: "Panel options", value: "Glass · Solid · Mixed" },
      { label: "Thresholds", value: "Standard · Low · Flush-detail" },
      { label: "Automation", value: "Selected sliding / Pivot systems" }
    ],
    description: "Strong profiles, premium rollers and hinges, secure locking and carefully resolved thresholds suit entrances, balconies, gardens, restaurants, resorts and retail spaces."
  },
  facades: {
    cards: [
      { title: "Curtain Wall", desc: "Stick and unitised envelopes with pressure-equalised water management.", img: "/commercial_glass_facade.png" },
      { title: "Structural Glazing", desc: "Silicone-glazed facades for clean, uninterrupted exterior surfaces.", img: "/service_structural_glazing.png" },
      { title: "ACP Facades", desc: "Lightweight cassette cladding with crisp joints and durable finishes.", img: "/blog_facade_compare.png" },
      { title: "Glass Facades", desc: "Integrated transparent envelopes, canopies, fins and feature glazing.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" }
    ],
    overviewImg: "/service_structural_glazing.png",
    specs: [
      { label: "System formats", value: "Stick · Unitised · Structural glazed" },
      { label: "Infill options", value: "Vision glass · Spandrel · ACP · Stone" },
      { label: "Performance", value: "Project-specific wind / water / air" },
      { label: "Integration", value: "Vents · Canopies · Fins · Entrances" }
    ],
    description: "Our facade contractor services cover system design support, shop drawings, structural glazing, glass facade solutions, procurement coordination, fabrication, installation and handover."
  },
  architectural: {
    cards: [
      { title: "Skylights", desc: "Engineered roof glazing for controlled daylight and weather protection.", img: "/service_architectural_systems.png" },
      { title: "Pergolas", desc: "Fixed or motorised louvered roofs with drainage and lighting integration.", img: "/product_louvered_pergola.png" },
      { title: "Railings", desc: "Minimal glass or aluminium guards designed for safety and uninterrupted views.", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop" },
      { title: "Partitions", desc: "Slim glazed modules for bright, flexible and acoustically considered interiors.", img: "/why_shreehari_details.png" },
      { title: "Screens", desc: "Solar shading, privacy and insect protection integrated with the architecture.", img: "/blog_pergola_weather.png" }
    ],
    overviewImg: "/service_architectural_systems.png",
    specs: [
      { label: "System families", value: "Skylights · Pergolas · Railings" },
      { label: "Interior systems", value: "Partitions · Screens" },
      { label: "Operation", value: "Fixed · Manual · Motorised" },
      { label: "Finish options", value: "Project-specific colours / textures" }
    ],
    description: "Ideal for residential, hospitality, retail, workplace and institutional applications where light, safety, shade, privacy and outdoor comfort must be resolved as one architectural language."
  }
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"windows" | "doors" | "facades" | "architectural">("windows");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: "Windows",
    notes: ""
  });

  const handleInquireClick = (productCategory: string) => {
    let selectVal = "Windows";
    if (productCategory.includes("door")) selectVal = "Doors";
    else if (productCategory.includes("facade")) selectVal = "Facade systems";
    else if (productCategory.includes("architectural")) selectVal = "Architectural systems";
    
    setFormData((prev) => ({
      ...prev,
      product: selectVal,
      notes: `Interested in premium systems for: ${productCategory}`
    }));

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setTimeout(() => {
      setIsFormSubmitting(false);
      setIsFormSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        product: "Windows",
        notes: ""
      });
      setTimeout(() => setIsFormSuccess(false), 5000);
    }, 1500);
  };

  const activePanel = productData[activeTab];

  return (
    <>
      {/* Page Hero */}
      <section className="relative py-20 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image 
            src={IMAGES.hero} 
            alt="Premium Architectural Aluminium" 
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
            <span className="text-heading">Products</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Product portfolio</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Less frame. More architecture.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            Premium aluminium systems selected for graceful proportions, satisfying operation and dependable building performance.
          </p>
        </div>
      </section>

      {/* Explore Systems Tabs Section */}
      <Section background="main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Explore systems</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading leading-tight tracking-tight">
              Find the right product family.
            </h2>
          </div>
          <p className="text-body max-w-md text-sm leading-relaxed font-light">
            Use the categories below to compare configurations, indicative specifications and typical applications.
          </p>
        </div>

        {/* Product Tabs Navigation */}
        <div className="flex flex-wrap justify-center border-b border-border mb-12 gap-2 relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-heading font-bold text-xs tracking-wider uppercase relative transition-colors duration-300 ${
                  isActive ? "text-accent font-bold" : "text-body/60 hover:text-heading"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeProductTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Product Tabs Content Panel */}
        <div className="space-y-16">
          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activePanel.cards.map((prod, idx) => (
              <div key={idx} className="bg-card rounded-2xl overflow-hidden group border border-accent/15 hover:border-accent/40 transition-all duration-500 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={prod.img} 
                    alt={prod.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-primary/20" />
                  <button 
                    onClick={() => handleInquireClick(`${activeTab.toUpperCase()} - ${prod.title}`)}
                    className="absolute top-4 right-4 bg-primary/80 backdrop-blur-md text-white hover:bg-accent hover:text-white w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border border-accent/30 z-20"
                    aria-label={`Inquire about ${prod.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 space-y-2 flex-grow">
                  <h3 className="text-base font-heading font-bold text-heading group-hover:text-accent transition-colors duration-300">{prod.title}</h3>
                  <p className="text-body text-xs leading-relaxed font-light">{prod.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-side Overview with Spec Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-border">
            <div className="lg:col-span-5">
              <div className="relative h-[320px] w-full rounded-2xl overflow-hidden shadow-2xl premium-border gold-glow">
                <Image 
                  src={activePanel.overviewImg} 
                  alt={`${activeTab} systems`} 
                  fill 
                  className="object-cover" 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">{activeTab} specifications</span>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-heading tracking-tight">
                {activeTab === "windows" && "Designed for light, air and assurance."}
                {activeTab === "doors" && "Movement made memorable."}
                {activeTab === "facades" && "Building envelopes with discipline."}
                {activeTab === "architectural" && "Special systems. Seamless integration."}
              </h3>
              
              {/* Specification Table */}
              <div className="overflow-hidden border border-accent/15 rounded-xl luxury-glass">
                <table className="w-full text-left border-collapse bg-white/70 backdrop-blur-md">
                  <tbody>
                    {activePanel.specs.map((spec, sIdx) => (
                      <tr key={sIdx} className="border-b border-accent/10 last:border-0 hover:bg-accent-light/10 transition-colors">
                        <td className="px-5 py-3 text-xs font-heading font-bold text-heading uppercase tracking-wider bg-accent-light/10 w-1/3 border-r border-accent/10">
                          {spec.label}
                        </td>
                        <td className="px-5 py-3 text-xs md:text-sm text-body/90 font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="text-body/80 text-xs md:text-sm leading-relaxed font-light">
                {activePanel.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a 
                  href="#" 
                  className="px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider bg-primary hover:bg-primary-hover text-white flex items-center justify-center border border-primary transition-colors shadow-md"
                >
                  <Download className="w-4 h-4 mr-2" /> Download Brochure
                </a>
                <button
                  onClick={() => handleInquireClick(`${activeTab.toUpperCase()} specifications`)}
                  className="px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider bg-accent hover:bg-[#b59556] text-white border border-accent transition-colors shadow-md shadow-accent/25"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Interactive Visualizer Section */}
      <Section background="section" className="border-t border-b border-accent/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Design Studio</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mt-1">Configure Your Openings</h2>
          <p className="text-body/80 text-xs md:text-sm font-light leading-relaxed mt-2">Interact with profiles and glazing materials in real time to match your building envelope goals.</p>
        </div>
        <ProductVisualizer />
      </Section>

      {/* Product Inquiry Form */}
      <section ref={formRef} className="py-16 bg-main border-b border-border scroll-mt-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full">
            
            {/* Left Side: Info */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Product inquiry</span>
              <h2 className="text-2xl md:text-4xl font-heading font-bold text-heading leading-tight tracking-tight">
                Need a precise recommendation?
              </h2>
              <p className="text-body/80 leading-relaxed text-sm font-light">
                Tell us the opening, project type and performance priority. We will shortlist a suitable system and outline the next steps.
              </p>
            </aside>

            {/* Right Side: Form */}
            <div className="lg:col-span-7 bg-white/85 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-accent/20 relative">
              <h3 className="text-lg font-heading font-bold text-heading mb-5 border-b border-accent/10 pb-2">Submit Inquiry</h3>
              
              {isFormSuccess && (
                <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-fade-in-up">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs font-semibold">Thank you! Your product inquiry has been received. Our sales desk will call you shortly.</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1 md:col-span-2">
                  <label htmlFor="prod-name" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Name *</label>
                  <input
                    type="text"
                    id="prod-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="prod-phone" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Phone *</label>
                  <input
                    type="tel"
                    id="prod-phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="prod-email" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Email *</label>
                  <input
                    type="email"
                    id="prod-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                    placeholder="johndoe@example.com"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label htmlFor="prod-type" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Product *</label>
                  <div className="relative">
                    <select
                      id="prod-type"
                      value={formData.product}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading appearance-none"
                    >
                      <option className="bg-white text-heading">Windows</option>
                      <option className="bg-white text-heading">Doors</option>
                      <option className="bg-white text-heading">Facade systems</option>
                      <option className="bg-white text-heading">Architectural systems</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-body/60">▼</span>
                  </div>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label htmlFor="prod-notes" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Project requirement</label>
                  <textarea
                    id="prod-notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all resize-none font-medium text-heading"
                    placeholder="Mention window sizes, area, finish specifications, or expected timeline"
                  />
                </div>
                <div className="md:col-span-2 pt-1">
                  <button
                    type="submit"
                    disabled={isFormSubmitting}
                    className="w-full md:w-auto px-8 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-widest bg-accent hover:bg-[#b59556] text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {isFormSubmitting ? "Sending..." : "Send Product Inquiry"}
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}
