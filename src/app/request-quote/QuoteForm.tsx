"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, UploadCloud } from "lucide-react";
import QuoteEstimator from "@/components/ui/QuoteEstimator";

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service") || "";
  const preSelectedSector = searchParams.get("sector") || "";

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: preSelectedSector === "Residential" ? "Luxury villa" : preSelectedSector === "Commercial" ? "Commercial / Office" : "Private residence",
    location: "",
    productReq: preSelectedService ? preSelectedService : "Need recommendation",
    quantity: "",
    notes: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setTimeout(() => {
      setIsFormSubmitting(false);
      setIsFormSuccess(true);
      setFileName(null);
      setFormData({
        name: "",
        phone: "",
        email: "",
        projectType: "Private residence",
        location: "",
        productReq: "Need recommendation",
        quantity: "",
        notes: ""
      });
      // Reset input element
      const fileInput = document.getElementById("quote-drawing") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      // Scroll to top of the form area
      window.scrollTo({ top: 250, behavior: "smooth" });
      setTimeout(() => setIsFormSuccess(false), 8000);
    }, 1500);
  };

  return (
    <>
      {isFormSuccess && (
        <div className="mb-8 p-8 bg-green-50 border border-green-200 text-green-800 rounded-2xl shadow-sm flex flex-col items-center text-center animate-fade-in-up md:col-span-12">
          <CheckCircle2 className="w-12 h-12 text-green-500 mb-4 animate-bounce" />
          <h3 className="text-xl font-heading font-bold mb-2">Quote Request Received!</h3>
          <p className="text-sm max-w-2xl font-light">Thank you for considering Shree Hari Alu. Our technical team is reviewing your requirements and will contact you within 24 hours to schedule your free consultation.</p>
        </div>
      )}

      {/* Interactive Specifications Calculator */}
      <div className="mb-14 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm block">Interactive Configurator</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-heading tracking-tight mt-1">Estimate Your Specifications</h2>
          <p className="text-body/80 text-xs md:text-sm font-light leading-relaxed mt-2">Adjust dimensions and materials to calculate load thresholds and automatically pre-fill your query form.</p>
        </div>
        <QuoteEstimator onEstimateComplete={(data) => {
          setFormData(prev => ({
            ...prev,
            productReq: data.product,
            quantity: data.quantity,
            notes: data.notes
          }));
        }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        
        {/* Left Column: Benefits Aside */}
        <aside className="lg:col-span-5 bg-card p-8 md:p-10 rounded-3xl border border-border hover:border-accent/40 transition-all duration-500 shadow-xl space-y-5">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-[10px] block border-b border-border pb-2">What happens next</span>
          <h3 className="text-xl font-heading font-bold text-heading leading-snug tracking-tight">A practical first review, with no obligation.</h3>
          
          <ul className="space-y-3 pt-2">
            {[
              "01 · Requirement and drawing review",
              "02 · Suitable system shortlist",
              "03 · Clarifications and project call",
              "04 · Indicative scope and next steps"
            ].map((item, idx) => (
              <li key={idx} className="text-xs md:text-sm text-body/90 font-semibold flex items-center">
                <span className="text-accent mr-3 font-bold">◆</span>
                {item}
              </li>
            ))}
          </ul>
          
          <div className="pt-4 border-t border-border mt-6">
            <p className="text-[10px] text-body/60 leading-relaxed">
              For urgent tenders, call: <br />
              <a href="tel:+919876543210" className="text-accent hover:underline font-heading font-bold text-sm mt-1 inline-block">+91 98765 43210</a>
            </p>
          </div>
        </aside>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 bg-white/85 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-accent/20 shadow-2xl">
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs mb-2 block">Quote request</span>
          <h2 className="text-2xl font-heading font-bold text-heading mb-6 border-b border-accent/10 pb-2">Share the details</h2>

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="quote-name" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Name *</label>
              <input
                type="text"
                id="quote-name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="quote-phone" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Mobile number *</label>
              <input
                type="tel"
                id="quote-phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="quote-email" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Email *</label>
              <input
                type="email"
                id="quote-email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                placeholder="name@example.com"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="quote-project" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Project type *</label>
              <div className="relative">
                <select
                  id="quote-project"
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading appearance-none"
                >
                  <option className="bg-white text-heading">Private residence</option>
                  <option className="bg-white text-heading">Luxury villa</option>
                  <option className="bg-white text-heading">Apartments</option>
                  <option className="bg-white text-heading">Commercial / Office</option>
                  <option className="bg-white text-heading">Hotel / Resort</option>
                  <option className="bg-white text-heading">Healthcare / Education</option>
                  <option className="bg-white text-heading">Industrial</option>
                  <option className="bg-white text-heading">Other</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-body/60">▼</span>
              </div>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="quote-location" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Project location *</label>
              <input
                type="text"
                id="quote-location"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                placeholder="City/State, e.g. Ahmedabad, Gujarat"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="quote-product" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Product requirement *</label>
              <div className="relative">
                <select
                  id="quote-product"
                  value={formData.productReq}
                  onChange={(e) => setFormData({...formData, productReq: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading appearance-none"
                >
                  <option className="bg-white text-heading">Windows</option>
                  <option className="bg-white text-heading">Doors</option>
                  <option className="bg-white text-heading">Facade / Structural glazing</option>
                  <option className="bg-white text-heading">Skylight / Pergola</option>
                  <option className="bg-white text-heading">Railings / Partitions</option>
                  <option className="bg-white text-heading">Multiple systems</option>
                  <option className="bg-white text-heading">Need recommendation</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-body/60">▼</span>
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="quote-quantity" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Approximate quantity / area</label>
              <input
                type="text"
                id="quote-quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all font-medium text-heading"
                placeholder="e.g. 28 windows or 1,200 sq ft"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-[10px] uppercase tracking-wider font-semibold text-heading block">Upload drawing</label>
              <div className="relative border-2 border-dashed border-accent/25 rounded-2xl bg-[#FAF9F5]/50 hover:bg-white transition-all duration-300 cursor-pointer group hover:border-accent/50">
                <input 
                  type="file" 
                  id="quote-drawing" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png" 
                />
                <div className="p-4 flex flex-col items-center justify-center text-body/80 text-center">
                  <UploadCloud className="w-8 h-8 text-accent group-hover:scale-110 transition-transform mb-2" />
                  <span className="text-xs font-semibold block">{fileName ? fileName : "Click to select a file"}</span>
                  <span className="text-[10px] text-body/60 mt-1 block">Accepted formats: PDF, DWG, DXF, JPG, PNG</span>
                </div>
              </div>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="quote-notes" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Additional notes</label>
              <textarea
                id="quote-notes"
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-border bg-[#FAF9F5]/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white transition-all resize-none font-medium text-heading"
                placeholder="Share project stage, performance priorities, finishes or expected timeline"
              />
            </div>
            <div className="md:col-span-2 pt-2 space-y-3">
              <button
                type="submit"
                disabled={isFormSubmitting}
                className="w-full md:w-auto px-8 py-3.5 rounded-full font-heading font-bold text-xs uppercase tracking-widest bg-accent hover:bg-[#b59556] text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {isFormSubmitting ? "Sending..." : "Get Free Consultation"}
              </button>
              <p className="text-[10px] text-body/60">By submitting, you agree to be contacted about this project. We do not sell your information.</p>
            </div>
          </form>
        </div>

      </div>
    </>
  );
}
