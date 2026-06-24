interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "main" | "section" | "card" | "primary";
}

export default function Section({ children, className = "", id, background = "main" }: SectionProps) {
  const bgColors = {
    main: "bg-background",
    section: "bg-section",
    card: "bg-card",
    primary: "bg-primary",
  };

  return (
    <section id={id} className={`py-14 md:py-24 ${bgColors[background]} ${className}`}>
      <div className="container mx-auto px-4 md:px-8">
        {children}
      </div>
    </section>
  );
}
