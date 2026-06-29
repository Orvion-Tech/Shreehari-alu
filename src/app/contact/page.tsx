"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, CheckCircle2, Phone } from "lucide-react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
};

export default function ContactPage() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    service: "Premium aluminium windows",
    message: ""
  });

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
        city: "",
        service: "Premium aluminium windows",
        message: ""
      });
      setTimeout(() => setIsFormSuccess(false), 5000);
    }, 1500);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-28 pb-12 md:py-24 bg-section overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-section/90 z-10" />
          <Image
            src={IMAGES.hero}
            alt="Contact Shree Hari Alu"
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
            <span className="text-heading">Contact</span>
          </div>
          <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs md:text-sm mb-3 block">Start a conversation</span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-heading mb-4 leading-[1.1] max-w-3xl tracking-tight">
            Let’s talk about the opening.
          </h1>
          <p className="text-base md:text-lg text-body/90 max-w-2xl leading-relaxed font-light">
            From one premium residence to a complete building envelope, our team is ready to help.
          </p>
        </div>
      </section>

      {/* Contact Layout Section */}
      <Section background="main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-start">
          {/* Left Column: Contact Card Aside */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 bg-card p-8 md:p-10 rounded-3xl border border-border hover:border-accent/40 transition-all duration-500 shadow-xl space-y-6">
            <div>
              <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs mb-2 block">Contact studio</span>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-heading tracking-tight">Speak with our project team.</h3>
            </div>

            <div className="space-y-5">
              {[
                { num: "01", title: "Call", value: <a href="tel:+919876543210" className="hover:text-accent transition-colors text-heading font-semibold">+91 98765 43210</a> },
                { num: "02", title: "Email", value: <a href="mailto:projects@shreeharialu.com" className="hover:text-accent transition-colors text-heading font-semibold">projects@shreeharialu.com</a> },
                { num: "03", title: "WhatsApp", value: <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline font-semibold">Message the project desk</a> },
                { num: "04", title: "Working hours", value: <span className="text-body font-medium">Monday–Saturday · 9:30–18:30</span> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-5 border-b border-border last:border-0 pb-4 last:pb-0">
                  <span className="text-accent font-heading font-bold text-xs uppercase tracking-wider">{item.num}</span>
                  <div>
                    <strong className="text-[10px] uppercase tracking-wider text-body/60 block mb-0.5">{item.title}</strong>
                    <div className="text-xs md:text-sm text-heading">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Right Column: General Inquiry Form */}
          <div className="lg:col-span-7 bg-card p-8 md:p-10 rounded-3xl border border-accent/25 shadow-2xl">
            <span className="text-accent font-heading font-bold uppercase tracking-widest text-xs mb-2 block">General inquiry</span>
            <h2 className="text-2xl font-heading font-bold text-heading mb-6 border-b border-accent/10 pb-2">How can we help?</h2>

            {isFormSuccess && (
              <div className="mb-5 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-fade-in-up">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-xs font-semibold">Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="contact-name" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Name *</label>
                <input
                  type="text"
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass text-sm focus:outline-none transition-all font-medium"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="contact-phone" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Phone *</label>
                <input
                  type="tel"
                  id="contact-phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass text-sm focus:outline-none transition-all font-medium"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="contact-email" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Email *</label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass text-sm focus:outline-none transition-all font-medium"
                  placeholder="name@example.com"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="contact-city" className="text-[10px] uppercase tracking-wider font-semibold text-heading">City *</label>
                <input
                  type="text"
                  id="contact-city"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass text-sm focus:outline-none transition-all font-medium"
                  placeholder="e.g. Ahmedabad"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="contact-service" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Service required *</label>
                <div className="relative">
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl input-glass text-sm focus:outline-none transition-all font-medium appearance-none"
                  >
                    <option className="bg-white text-heading">Premium aluminium windows</option>
                    <option className="bg-white text-heading">Aluminium doors</option>
                    <option className="bg-white text-heading">Structural glazing / Facade</option>
                    <option className="bg-white text-heading">Skylight / Pergola</option>
                    <option className="bg-white text-heading">Railings / Partitions</option>
                    <option className="bg-white text-heading">Custom architectural solution</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-body/60">▼</span>
                </div>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="contact-message" className="text-[10px] uppercase tracking-wider font-semibold text-heading">Message</label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl input-glass text-sm focus:outline-none transition-all resize-none font-medium text-heading"
                  placeholder="Tell us about your project, stage and timeline"
                />
              </div>
              <div className="md:col-span-2 pt-1">
                <button
                  type="submit"
                  disabled={isFormSubmitting}
                  className="w-full md:w-auto px-8 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-widest bg-accent hover:bg-[#b59556] text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {isFormSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </Section>

      {/* Google Map Section */}
      <section className="py-12 bg-section border-t border-b border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-accent/15 h-[360px] relative bg-card gold-glow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6979262104523!2d72.54045861542452!3d23.034856372332356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84e5482390a7%3A0x6bfe76e0cd673a38!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1625050000000!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location Map"
            ></iframe>
          </div>

          {/* Quick Buttons below Map */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a href="tel:+919876543210" className="px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider bg-primary hover:bg-primary-hover text-white transition-colors shadow-md">
              Call Now
            </a>
            <a href="mailto:projects@shreeharialu.com" className="px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider bg-accent hover:bg-[#b59556] text-white transition-colors shadow-md shadow-accent/25">
              Email Project Desk
            </a>
            <a href="https://maps.google.com/?q=Ahmedabad,Gujarat,India" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider bg-primary hover:bg-primary-hover text-white transition-colors shadow-md">
              Open Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
