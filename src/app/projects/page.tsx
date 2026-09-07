"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Maximize2, Eye, X } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  hero: "/commercial_glass_facade.png",
  villa: "/villa_modern_glazing.png",
  pergola: "/louvered_pergola_villa.png",
  commercial: "/commercial_glass_facade.png",
  slidingWindow: "/minimal_sliding_window.png"
};

const filterCategories = [
  { id: "all", label: "All" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "hospitality", label: "Hospitality" },
  { id: "institutional", label: "Institutional" },
  { id: "industrial", label: "Industrial" }
];

type Project = {
  id: number;
  category: string;
  eyebrow: string;
  title: string;
  desc: string;
  location: string;
  scope: string;
  product: string;
  type: string;
  img: string;
};

const projects: Project[] = [
  {
    id: 1,
    category: "residential",
    eyebrow: "Luxury villa",
    title: "Courtyard House",
    desc: "Large glazed openings frame garden courts while a restrained charcoal system keeps the architecture visually calm.",
    location: "Ahmedabad, Gujarat",
    scope: "Windows, doors, railings",
    product: "Slimline sliding · Casement",
    type: "Private residence",
    img: IMAGES.villa
  },
  {
    id: 2,
    category: "commercial",
    eyebrow: "Corporate office",
    title: "Meridian Business House",
    desc: "A disciplined glass grid, integrated entrance canopy and high-performance vision areas define a confident headquarters.",
    location: "Surat, Gujarat",
    scope: "Complete building envelope",
    product: "Curtain wall · Structural glazing",
    type: "Commercial building",
    img: IMAGES.commercial
  },
  {
    id: 3,
    category: "hospitality",
    eyebrow: "Hotel & resort",
    title: "Aranya Terrace",
    desc: "Motorised pergolas and folding glazed doors let the restaurant shift seamlessly between open-air and protected service.",
    location: "Udaipur, Rajasthan",
    scope: "Terrace enclosure",
    product: "Pergola · Bi-fold doors",
    type: "Hospitality",
    img: IMAGES.pergola
  },
  {
    id: 4,
    category: "residential",
    eyebrow: "Apartments",
    title: "Skyline Residences",
    desc: "Repeatable, weather-ready openings combine generous daylight with integrated insect protection and safe hardware.",
    location: "Vadodara, Gujarat",
    scope: "420 apartment openings",
    product: "Sliding · Fixed · Screens",
    type: "Residential development",
    img: IMAGES.slidingWindow
  },
  {
    id: 5,
    category: "institutional",
    eyebrow: "Healthcare & education",
    title: "Nova Care Institute",
    desc: "Controlled daylight, secure ventilation and robust, easy-care finishes support a calm and practical care environment.",
    location: "Rajkot, Gujarat",
    scope: "Facade, windows, partitions",
    product: "Casement · Curtain wall",
    type: "Hospital & training centre",
    img: IMAGES.commercial
  },
  {
    id: 6,
    category: "industrial",
    eyebrow: "Industrial",
    title: "Apex Manufacturing Campus",
    desc: "A practical facade, high-level ventilation and glazed office partitions bring clarity to a demanding production campus.",
    location: "Sanand, Gujarat",
    scope: "Administrative and factory blocks",
    product: "ACP facade · Louvers · Partitions",
    type: "Industrial project",
    img: IMAGES.commercial
  }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; label: string } | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [activeTile, setActiveTile] = useState<number | null>(null);

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 pb-12 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image
            src={IMAGES.hero}
            alt="Premium aluminium architectural projects"
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
            <span className="text-heading">Projects</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Selected work</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gradient mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Ideas delivered at building scale.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            A cross-section of residential, commercial, hospitality, institutional and industrial expertise.
          </p>
        </div>
      </section>

      {/* Project Gallery Grid */}
      <Section id="gallery" background="main" className="scroll-mt-28">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Project showcase</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight tracking-tight">
              Different briefs. Distinct responses.
            </h2>
          </div>
          <p className="text-body max-w-md text-sm leading-relaxed font-light">
            Tap <span className="font-semibold text-heading">Large view</span> to enlarge an image, or <span className="font-semibold text-heading">Project detail</span> to see its full scope.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center border-b border-border mb-12 gap-2 relative">
          {filterCategories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-3 font-heading font-bold text-xs tracking-wider uppercase relative transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-accent" : "text-body/60 hover:text-heading"
                }`}
              >
                {cat.label}
                {isActive && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div key={activeFilter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-lg hover:shadow-2xl hover:border-accent/40 transition-all duration-500"
              >
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer"
                  onClick={() => setActiveTile(activeTile === project.id ? null : project.id)}
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay — image only by default; name + actions reveal on hover (desktop) or tap (mobile) */}
                  <div
                    className={`absolute inset-0 bg-[#001518]/85 text-white flex flex-col items-center justify-center gap-4 p-5 text-center transition-opacity duration-300 ${
                      activeTile === project.id
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-accent text-[12px] font-heading font-bold uppercase tracking-widest block">{project.eyebrow}</span>
                      <h3 className="text-white font-heading font-bold text-lg leading-snug tracking-tight">{project.title}</h3>
                      <p className="text-white/70 text-xs">{project.location}</p>
                    </div>

                    <div className="flex gap-2 w-full max-w-[240px]">
                      <button
                        onClick={(e) => { e.stopPropagation(); setLightboxImage({ src: project.img, label: project.title }); }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-[12px] font-heading font-bold uppercase tracking-widest py-2.5 rounded-lg border border-white/20 transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" /> Expand view
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDetailProject(project); }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-accent hover:bg-[#b59556] text-white text-[12px] font-heading font-bold uppercase tracking-widest py-2.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section id="cta" background="section">
        <div className="bg-card rounded-2xl p-8 md:p-16 shadow-lg border border-border relative overflow-hidden text-center w-full">
          <div className="relative z-10 space-y-6">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm">Your project could be next</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gradient leading-tight max-w-2xl mx-auto">
              Share the elevation. Let’s define what it can become.
            </h2>
            <p className="text-body/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
              We welcome residential, villa, apartment, commercial, hotel, healthcare, education and industrial enquiries.
            </p>
            <div className="pt-2">
              <Button href="/request-quote" variant="primary" size="md" className="hover:scale-105 transition-transform duration-300">
                Submit a Project Brief
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ===================== LARGE VIEW LIGHTBOX ===================== */}
      {lightboxImage && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-primary/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
            <button
              className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-20 cursor-pointer"
              onClick={() => setLightboxImage(null)}
              aria-label="Close large view"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center space-y-4" onClick={(e) => e.stopPropagation()}>
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

      {/* ===================== PROJECT DETAIL POPUP ===================== */}
      {detailProject && (
        <motion.div
          key="project-detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
              onClick={() => setDetailProject(null)}
            />
            {/* Showcase Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-card w-full max-w-lg rounded-2xl overflow-hidden border border-accent/25 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={() => setDetailProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary/60 hover:bg-accent text-white flex items-center justify-center transition-colors z-20 cursor-pointer backdrop-blur-sm"
                aria-label="Close project detail"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative h-52 sm:h-64 w-full">
                <Image
                  src={detailProject.img}
                  alt={detailProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 512px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001518]/70 to-transparent" />
                <span className="absolute top-4 left-4 bg-primary/85 backdrop-blur-sm text-white text-[11px] font-heading font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                  {detailProject.eyebrow}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 space-y-5">
                <div className="space-y-2">
                  <h3 className="text-2xl font-heading font-bold text-heading leading-snug tracking-tight">{detailProject.title}</h3>
                  <p className="text-body text-sm leading-relaxed font-light">{detailProject.desc}</p>
                </div>

                {/* Metadata Specs Table */}
                <div className="grid grid-cols-2 gap-4 bg-section/70 p-4 rounded-2xl border border-border">
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-heading font-bold text-body/60 block">Location</span>
                    <strong className="text-xs text-heading font-semibold">{detailProject.location}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-heading font-bold text-body/60 block">Scope</span>
                    <strong className="text-xs text-heading font-semibold">{detailProject.scope}</strong>
                  </div>
                  <div className="h-[1px] bg-border col-span-2"></div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-heading font-bold text-body/60 block">Product used</span>
                    <strong className="text-xs text-heading font-semibold">{detailProject.product}</strong>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-heading font-bold text-body/60 block">Project type</span>
                    <strong className="text-xs text-heading font-semibold">{detailProject.type}</strong>
                  </div>
                </div>
              </div>
            </motion.div>
        </motion.div>
      )}
    </>
  );
}
