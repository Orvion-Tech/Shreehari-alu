import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { SERVICE_CATEGORIES, serviceHref } from "@/data/services";
import { SOCIAL_LINKS } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="bg-section text-body pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="mb-6">
              <Image
                src="/shreehari-alu-corporation-logo.svg"
                alt="Shreehari Alu Corporation"
                width={280}
                height={87}
                className="h-14 w-auto"
                loading="eager"
              />
            </div>
            <p className="text-body text-sm leading-relaxed max-w-sm">
              Transforming spaces with premium aluminium architectural systems. Innovative solutions for windows, doors, facades, and more.
            </p>
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex space-x-3 pt-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-card flex items-center justify-center border border-border text-body hover:text-accent hover:border-accent transition-colors duration-300 shadow-sm"
                    aria-label={s.label}
                  >
                    <Globe className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-heading font-bold mb-8 text-accent">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Projects", href: "/projects" },
                { name: "Contact Us", href: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-body hover:text-accent transition-colors text-xs font-semibold uppercase tracking-wider inline-flex items-center min-h-11 -my-1.5">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-heading font-bold mb-8 text-accent">Our Services</h3>
            <ul className="space-y-4">
              {SERVICE_CATEGORIES.map((cat) => ({
                name: cat.label,
                href: serviceHref(cat.slug),
              })).map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-body hover:text-accent transition-colors text-xs font-semibold uppercase tracking-wider inline-flex items-center min-h-11 -my-1.5">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="text-accent hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest inline-flex items-center min-h-11">
                  View All Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-heading font-bold mb-2 text-accent">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-body text-sm leading-relaxed">5, Varahee Industrial Estate, Nr. Vandematram Bridge, Gota, Ahmedabad &ndash; 382481, Gujarat, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-body hover:text-accent transition-colors text-sm font-semibold inline-flex items-center min-h-11 -my-1.5">+91 98765 43210</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                <a href="mailto:info@shreeharialu.com" className="text-body hover:text-accent transition-colors text-sm font-semibold inline-flex items-center min-h-11 -my-1.5">info@shreeharialu.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-border pt-8 pb-20 md:pb-8 md:pr-24 flex flex-col md:flex-row justify-between items-center text-xs text-body/70 uppercase tracking-widest font-semibold">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Shreehari Alu Corporation. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors inline-flex items-center min-h-11">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-accent transition-colors inline-flex items-center min-h-11">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
