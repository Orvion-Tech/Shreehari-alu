import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
// For now, I will use a simple implementation if utils are missing

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "outline" | "white-outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-secondary text-white hover:bg-[#3c5e63] focus:ring-secondary shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    accent: "bg-accent text-white hover:bg-[#b59556] focus:ring-accent shadow-lg shadow-accent/30 hover:shadow-xl hover:-translate-y-0.5",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    "white-outline": "border-2 border-white/50 text-white hover:bg-white hover:text-primary focus:ring-white shadow-lg",
    ghost: "bg-transparent text-primary hover:bg-section focus:ring-primary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
