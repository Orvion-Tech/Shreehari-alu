import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-accent/25 relative overflow-hidden">
      {/* Decorative Gold Glow Ring */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="mb-6">
              <Image 
                src="/shreehari-alu-corporation-logo.svg" 
                alt="Shree Hari Alu Corporation Logo" 
                width={280} 
                height={87} 
                className="h-14 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Transforming spaces with premium aluminium architectural systems. Innovative solutions for windows, doors, facades, and more.
            </p>
            <div className="flex space-x-3 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center border border-white/10 text-white hover:text-accent hover:border-accent transition-all duration-300 shadow-sm"
                  aria-label="Social Link"
                >
                  <Globe className="w-4.5 h-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-heading font-bold mb-8 text-accent">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Products", href: "/products" },
                { name: "Projects", href: "/projects" },
                { name: "Contact Us", href: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent transition-colors text-xs font-semibold uppercase tracking-wider">
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
              {[
                { name: "Aluminium Sliding Windows", href: "/services#sliding-windows" },
                { name: "Aluminium Casement Windows", href: "/services#casement-windows" },
                { name: "Aluminium Doors", href: "/services#aluminium-doors" },
                { name: "Structural Glazing", href: "/services#structural-glazing" },
                { name: "Glass Facades", href: "/services#glass-facades" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-accent transition-colors text-xs font-semibold uppercase tracking-wider">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="text-accent hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
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
                <span className="text-gray-400 text-sm leading-relaxed">123 Industrial Area, Phase 1, City Name, State, India 123456</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-accent transition-colors text-sm font-semibold">+91 98765 43210</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                <a href="mailto:info@shreeharialu.com" className="text-gray-400 hover:text-accent transition-colors text-sm font-semibold">info@shreeharialu.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 uppercase tracking-widest font-semibold">
          <p className="text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Shree Hari Alu. Crafted with uncompromised precision.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
