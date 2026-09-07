import { Blinds, DoorOpen, Fence, Layers, LayoutGrid, PanelTop, type LucideIcon } from "lucide-react";

/**
 * Single source of truth for the services taxonomy.
 *
 * Categories and system names are taken verbatim from the client's
 * "Shreehari Alu Corporation Profile" PDF. Nothing here is invented:
 * six categories, twenty-five systems, in the order the profile lists them.
 *
 * Performance figures (alloy, thermal break, glazing capacity, drawing
 * references) are deliberately left undefined until the client supplies
 * verified values. The UI hides those rows while they are empty.
 */

export interface ServiceSystem {
  /** Running number shown in the UI, e.g. "01". */
  num: string;
  /** URL/anchor-safe id. */
  id: string;
  /** Official system name, exactly as written in the client profile. */
  title: string;
  /** Plain-language restatement of the same system. */
  tagline: string;
  simpleDesc: string;
  features: string[];
  benefits: string;
  apps: string;
  /** Card image used by the services hub. */
  img: string;
  /** Carousel images used by the category page. */
  images: string[];
  /* Awaiting verified data from the client. */
  alloy?: string;
  thermalBreak?: string;
  glassCap?: string;
  dwgRef?: string;
}

export interface ServiceCategory {
  id: string;
  /** Segment under /services/. */
  slug: string;
  /** Official category name, exactly as written in the client profile. */
  label: string;
  /** Short line used in the header mega-menu. */
  menuDesc: string;
  /** Longer line used on the services hub cards. */
  description: string;
  icon: LucideIcon;
  color: string;
  /** Category page H1, split so the second half can take the gradient. */
  heroTitle: { lead: string; accent: string };
  heroIntro: string;
  heroImage: string;
  /**
   * Whether glass build-up is a variable for this category. Drives the
   * glazing step of the quote estimator — cladding and louvre systems are
   * not specified by glass, so that question is hidden for them.
   */
  usesGlazing: boolean;
  systems: ServiceSystem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  /* ============================================================ 01 */
  {
    id: "windows-doors",
    slug: "windows-doors",
    label: "Windows & Doors",
    menuDesc: "Sliding, openable, folding, pivot and acoustic systems.",
    description:
      "Sliding, openable, folding, pivot and acoustic systems for every opening in the building.",
    icon: DoorOpen,
    color: "#00515C",
    heroTitle: { lead: "Windows &", accent: "Doors" },
    heroIntro:
      "Every opening in a building has a different job to do. We supply sliding, openable, folding, pivot and acoustic systems, selected around the view, the ventilation and the exposure of each elevation.",
    heroImage: "/services/brochure-img-4.jpg",
    usesGlazing: true,
    systems: [
      {
        num: "01",
        id: "sliding-windows-doors",
        title: "Sliding Windows & Doors",
        tagline: "Wide openings that glide instead of swing",
        simpleDesc:
          "Large glazed panels that slide horizontally along concealed tracks, giving a wide clear opening without any door swing taking up floor space.",
        features: [
          "Two, three and four panel configurations",
          "Concealed bottom track options",
          "Weather seals at every meeting stile",
        ],
        benefits: "Maximum daylight and view for the least amount of floor space used.",
        apps: "Living rooms · Balconies · Terraces · Poolside openings",
        img: "/services/brochure-img-4.jpg",
        images: [
          "/services/brochure-img-4.jpg",
          "/services/brochure-img-11.jpg",
          "/minimal_sliding_window.png",
        ],
      },
      {
        num: "02",
        id: "openable-fixed-windows",
        title: "Openable & Fixed Windows",
        tagline: "Casement sashes paired with fixed glazing",
        simpleDesc:
          "Side-hung and top-hung openable sashes combined with fixed glass panels in a single frame, arranged around where ventilation is needed and where the view matters most.",
        features: [
          "Openable and fixed panels within one frame",
          "Multi-point locking on opening sashes",
          "Compatible with insect mesh frames",
        ],
        benefits: "Controlled ventilation where you need it, uninterrupted glass where you don't.",
        apps: "Bedrooms · Kitchens · Stairwells · Apartment facades",
        img: "/services/brochure-img-11.jpg",
        images: [
          "/services/brochure-img-11.jpg",
          "/overview_windows.png",
          "/services/brochure-img-4.jpg",
        ],
      },
      {
        num: "03",
        id: "sliding-folding-doors",
        title: "Sliding & Folding Doors",
        tagline: "Panels that stack away to open a whole wall",
        simpleDesc:
          "Multi-leaf doors that slide and fold back against one another, opening an entire wall onto a terrace, deck or garden rather than a single door width.",
        features: [
          "Multi-leaf folding configurations",
          "Panels stack to one side or both",
          "Low threshold options for level access",
        ],
        benefits: "Turns an indoor room and an outdoor space into a single area.",
        apps: "Living rooms · Patios · Restaurants · Garden entrances",
        img: "/services/brochure-img-4.jpg",
        images: [
          "/services/brochure-img-4.jpg",
          "/hero_courtyard_villa.png",
          "/services/brochure-img-13.jpg",
        ],
      },
      {
        num: "04",
        id: "pivot-doors",
        title: "Pivot Doors",
        tagline: "Statement entrances on a pivot hinge",
        simpleDesc:
          "Large-format entrance doors that rotate on a floor and head pivot rather than side hinges, which allows a far larger and heavier leaf than a conventional hinged door.",
        features: [
          "Oversized single-leaf entrance panels",
          "Floor and head pivot hardware",
          "Wide choice of finishes and infill materials",
        ],
        benefits: "A wide, imposing entrance that still opens with a light push.",
        apps: "Main entrances · Villa lobbies · Showrooms · Hotel arrivals",
        img: "/services/brochure-img-9.jpg",
        images: [
          "/services/brochure-img-9.jpg",
          "/product_statement_pivot.png",
          "/services/brochure-img-12.jpg",
        ],
      },
      {
        num: "05",
        id: "acoustic-windows-doors",
        title: "Acoustic Windows & Doors",
        tagline: "Openings built to keep noise outside",
        simpleDesc:
          "Window and door systems specified with acoustic glass build-ups and additional sealing, for buildings where outside noise is the governing problem.",
        features: [
          "Acoustic laminated glass options",
          "Additional perimeter and meeting-stile seals",
          "Heavier sash sections to carry thicker glass",
        ],
        benefits: "Noticeably quieter interiors on busy roads and near flight paths.",
        apps: "Roadside bedrooms · Hotels · Hospitals · Studios · Offices",
        img: "/services/brochure-img-8.jpg",
        images: [
          "/services/brochure-img-11.jpg",
          "/services/brochure-img-8.jpg",
          "/overview_windows.png",
        ],
      },
    ],
  },

  /* ============================================================ 02 */
  {
    id: "glazing-systems",
    slug: "glazing-systems",
    label: "Glazing Systems",
    menuDesc: "Spider, unitized, structural, point-fixed and frameless glazing.",
    description:
      "Spider, semi-unitized, structural, point-fixed, frameless and shopfront glazing, plus louvred facades.",
    icon: Layers,
    color: "#C28B45",
    heroTitle: { lead: "Glazing", accent: "Systems" },
    heroIntro:
      "Glazed elevations differ mainly in how the glass is held. From spider fittings to semi-unitized cassettes and fully frameless assemblies, we select the support method that suits the span, the exposure and the look the elevation is after.",
    heroImage: "/services/brochure-img-7.jpg",
    usesGlazing: true,
    systems: [
      {
        num: "01",
        id: "spider-glazing",
        title: "Spider Glazing Systems",
        tagline: "Glass carried on stainless steel spider fittings",
        simpleDesc:
          "Toughened glass panels supported at their corners by stainless steel spider brackets fixed back to a structural frame, leaving the face of the glass almost entirely free of framing.",
        features: [
          "Stainless steel spider fittings",
          "Point support taken at the glass corners",
          "Backing structure in steel or aluminium",
        ],
        benefits: "The most transparent option for tall entrance and atrium glazing.",
        apps: "Atriums · Entrance lobbies · Showrooms · Malls",
        img: "/services/brochure-img-7.jpg",
        images: [
          "/services/brochure-img-7.jpg",
          "/commercial_glass_facade.png",
          "/services/brochure-img-6.jpg",
        ],
      },
      {
        num: "02",
        id: "semi-unitized-glazing",
        title: "Semi Unitized Glazing Systems",
        tagline: "Site-fixed grid, factory-assembled glazed units",
        simpleDesc:
          "The mullion and transom grid is installed on site, then pre-assembled glazed units are fixed to it. This keeps the site tolerance of a stick system while moving the glazing work into the factory.",
        features: [
          "Frame installed first, glazed cassettes after",
          "Glass units assembled under factory conditions",
          "Less glazing labour at height",
        ],
        benefits: "Faster and more consistent installation on tall elevations.",
        apps: "Office towers · Mixed-use buildings · Institutional facades",
        img: "/services/brochure-img-8.jpg",
        images: [
          "/services/brochure-img-8.jpg",
          "/services/brochure-img-6.jpg",
          "/service_structural_glazing.png",
        ],
      },
      {
        num: "03",
        id: "structural-glazing",
        title: "Structural Glazing Systems",
        tagline: "Flush glass elevations with the framing set behind",
        simpleDesc:
          "Glass is bonded or captured so that the aluminium framing sits behind the glass line, producing a continuous flush external surface with no projecting caps.",
        features: [
          "Framing concealed behind the glass plane",
          "Continuous flush external appearance",
          "Engineered drainage paths within the system",
        ],
        benefits: "A clean, uninterrupted glass elevation when seen from outside.",
        apps: "Corporate facades · Showrooms · Hotels · Landmark elevations",
        img: "/services/brochure-img-6.jpg",
        images: [
          "/services/brochure-img-6.jpg",
          "/service_structural_glazing.png",
          "/services/brochure-img-8.jpg",
        ],
      },
      {
        num: "04",
        id: "point-fixed-glazing",
        title: "Point-Fixed Glazing",
        tagline: "Glass fixed at discrete points, not continuous frames",
        simpleDesc:
          "Glass panels carried on individual bolted fixings taken through or at the edge of the pane, removing the need for a continuous perimeter frame.",
        features: [
          "Discrete bolted fixings",
          "Countersunk or button fitting options",
          "Minimal visible support hardware",
        ],
        benefits: "The lightest possible visual reading of a glazed wall.",
        apps: "Entrance screens · Atriums · Feature walls · Canopy soffits",
        img: "/services/brochure-img-7.jpg",
        images: [
          "/services/brochure-img-7.jpg",
          "/services/brochure-img-6.jpg",
          "/commercial_glass_facade.png",
        ],
      },
      {
        num: "05",
        id: "frameless-glass-systems",
        title: "Frameless Glass Systems",
        tagline: "Glazing with no visible perimeter frame",
        simpleDesc:
          "Glass assemblies detailed so no aluminium frame is visible around the panes, with support taken through the head, the base or the adjacent structure instead.",
        features: [
          "No visible perimeter framing",
          "Clamped or channel-set support",
          "Toughened and laminated safety glass",
        ],
        benefits: "Uninterrupted views and a minimal, contemporary finish.",
        apps: "Balconies · Partitions · Shopfronts · Terrace screens",
        img: "/services/brochure-img-13.jpg",
        images: [
          "/services/brochure-img-13.jpg",
          "/services/brochure-img-12.jpg",
          "/villa_modern_glazing.png",
        ],
      },
      {
        num: "06",
        id: "shopfront-glazing",
        title: "Shopfront Glazing",
        tagline: "Street-facing glazing built around retail display",
        simpleDesc:
          "Ground-floor glazed screens and entrance assemblies designed around product display, heavy footfall and constant daily door use.",
        features: [
          "Large uninterrupted display panes",
          "Heavy-duty entrance door hardware",
          "Configurable to the shopfront building line",
        ],
        benefits: "Maximum product visibility with hardware that survives constant use.",
        apps: "Retail stores · Showrooms · Restaurants · Branch offices",
        img: "/commercial_glass_facade.png",
        images: [
          "/commercial_glass_facade.png",
          "/services/brochure-img-7.jpg",
          "/services/brochure-img-6.jpg",
        ],
      },
      {
        num: "07",
        id: "louvers-facade",
        title: "Louvers Facade",
        tagline: "Louvred screening built into the facade line",
        simpleDesc:
          "Aluminium louvre blades run across the building face as part of the envelope, shading and screening what sits behind while still letting air move through.",
        features: [
          "Horizontal or vertical blade arrangements",
          "Fixed or adjustable blade options",
          "Screens plant, parking and service zones",
        ],
        benefits: "Cuts solar gain and hides services while keeping air moving.",
        apps: "Plant rooms · Car parks · Office facades · Service risers",
        img: "/services/brochure-img-19.jpg",
        images: [
          "/services/brochure-img-19.jpg",
          "/services/brochure-img-22.jpg",
          "/service_architectural_systems.png",
        ],
      },
    ],
  },

  /* ============================================================ 03 */
  {
    id: "glass-roof-solutions",
    slug: "glass-roof-solutions",
    label: "Glass & Roof Solutions",
    menuDesc: "Skylights, roof glazing, canopies and glass floors.",
    description:
      "Skylights, skylight louvers, roof glazing, glass canopies and structural glass floors.",
    icon: PanelTop,
    color: "#2F4A4E",
    heroTitle: { lead: "Glass & Roof", accent: "Solutions" },
    heroIntro:
      "Daylight does not only arrive through walls. Roof glazing, skylights, canopies and glass floors bring light deep into a plan and shelter the spaces below, provided the falls, drainage and safety build-ups are resolved properly.",
    heroImage: "/villa_modern_glazing.png",
    usesGlazing: true,
    systems: [
      {
        num: "01",
        id: "skylights",
        title: "Skylights",
        tagline: "Daylight brought in from overhead",
        simpleDesc:
          "Glazed roof openings that bring daylight into rooms and circulation spaces that have little or no external wall to take a window.",
        features: [
          "Fixed and openable configurations",
          "Engineered fall for water run-off",
          "Laminated safety glass build-ups",
        ],
        benefits: "Daylight in the middle of a plan, where windows cannot reach.",
        apps: "Stairwells · Atriums · Kitchens · Corridors · Bathrooms",
        img: "/services/brochure-img-13.jpg",
        images: [
          "/services/brochure-img-13.jpg",
          "/service_architectural_systems.png",
          "/villa_modern_glazing.png",
        ],
      },
      {
        num: "02",
        id: "skylight-louvers",
        title: "Skylight Louvers",
        tagline: "Adjustable shading over roof glazing",
        simpleDesc:
          "Louvre blades set above or within a skylight so the amount of daylight and solar heat coming through the roof can be adjusted through the day.",
        features: [
          "Adjustable blade angle",
          "Fitted over or within the skylight opening",
          "Reduces solar gain at peak hours",
        ],
        benefits: "Keeps the daylight while controlling the heat and the glare.",
        apps: "Atriums · Courtyards · Double-height living spaces",
        img: "/services/brochure-img-19.jpg",
        images: [
          "/services/brochure-img-19.jpg",
          "/services/brochure-img-20.jpg",
          "/product_louvered_pergola.png",
        ],
      },
      {
        num: "03",
        id: "roof-glazing",
        title: "Roof Glazing",
        tagline: "Glazed roof planes across a full span",
        simpleDesc:
          "Larger glazed roof areas built as a continuous system across a span, rather than as a single isolated opening in an otherwise solid roof.",
        features: [
          "Multi-panel glazed roof planes",
          "Integrated gutters and drainage",
          "Thermally broken framing options",
        ],
        benefits: "A fully daylit space without adding a single external wall.",
        apps: "Courtyards · Link corridors · Conservatories · Food courts",
        img: "/villa_modern_glazing.png",
        images: [
          "/villa_modern_glazing.png",
          "/services/brochure-img-13.jpg",
          "/service_architectural_systems.png",
        ],
      },
      {
        num: "04",
        id: "glass-canopies",
        title: "Glass Canopies",
        tagline: "Sheltered entrances that stay light",
        simpleDesc:
          "Projecting glazed canopies over doorways, drop-offs and walkways, supported on brackets, tension rods or a concealed frame.",
        features: [
          "Cantilevered or rod-supported",
          "Laminated safety glass",
          "Concealed or deliberately expressed fixings",
        ],
        benefits: "Weather cover at the entrance without darkening it.",
        apps: "Building entrances · Drop-off porches · Walkways · Balconies",
        img: "/services/brochure-img-7.jpg",
        images: [
          "/services/brochure-img-7.jpg",
          "/services/brochure-img-6.jpg",
          "/commercial_glass_facade.png",
        ],
      },
      {
        num: "05",
        id: "glass-floors",
        title: "Glass Floors",
        tagline: "Walkable glass that passes light between levels",
        simpleDesc:
          "Structural glass floor panels set into a floor plate so that daylight from above can carry down into the level below.",
        features: [
          "Structural laminated build-ups",
          "Anti-slip surface treatment",
          "Framed or minimal-edge details",
        ],
        benefits: "Brings daylight down a level and opens up the section.",
        apps: "Mezzanines · Basements · Feature landings · Bridges",
        img: "/services/brochure-img-12.jpg",
        images: [
          "/services/brochure-img-12.jpg",
          "/services/brochure-img-13.jpg",
          "/villa_modern_glazing.png",
        ],
      },
    ],
  },

  /* ============================================================ 04 */
  {
    id: "louvers-sun-control",
    slug: "louvers-sun-control",
    label: "Louvers & Sun Control",
    menuDesc: "Operable louvre systems and fixed external sunshades.",
    description:
      "Operable louvre systems and fixed external sunshades that manage light, heat and privacy.",
    icon: Blinds,
    color: "#2E7D32",
    heroTitle: { lead: "Louvers &", accent: "Sun Control" },
    heroIntro:
      "The cheapest way to deal with solar heat is to stop it before it reaches the glass. Operable louvres and fixed sunshades let you tune daylight, temperature and privacy from outside the building envelope.",
    heroImage: "/services/brochure-img-19.jpg",
    usesGlazing: false,
    systems: [
      {
        num: "01",
        id: "operable-louvers",
        title: "Operable Louvers",
        tagline: "Blades that rotate to control light and air",
        simpleDesc:
          "Aluminium louvre blades that rotate through a range of angles, letting you set how much sun, daylight and air passes through at any point in the day.",
        features: [
          "Adjustable blade rotation",
          "Manual or motorised operation",
          "Weather-resistant powder-coated finishes",
        ],
        benefits: "One system covers full shade, open sky and everything in between.",
        apps: "Terraces · Courtyards · Restaurants · Facade screening",
        img: "/services/brochure-img-19.jpg",
        images: [
          "/services/brochure-img-19.jpg",
          "/services/brochure-img-20.jpg",
          "/product_louvered_pergola.png",
        ],
      },
      {
        num: "02",
        id: "sunshades",
        title: "Sunshades",
        tagline: "Fixed shading that cuts heat before it reaches the glass",
        simpleDesc:
          "Fixed aluminium shading elements set outside the glass line, sized and angled to intercept direct sun before it ever reaches the window.",
        features: [
          "Horizontal and vertical blade options",
          "Sized to the sun path of each elevation",
          "Fixed assemblies with no moving parts to maintain",
        ],
        benefits: "Lower cooling load and less glare, with nothing to operate.",
        apps: "Office facades · Institutional buildings · West-facing elevations",
        img: "/services/brochure-img-22.jpg",
        images: [
          "/services/brochure-img-22.jpg",
          "/services/brochure-img-20.jpg",
          "/louvered_pergola_villa.png",
        ],
      },
    ],
  },

  /* ============================================================ 05 */
  {
    id: "cladding-facade-panels",
    slug: "cladding-facade-panels",
    label: "Cladding & Facade Panels",
    menuDesc: "Cladding panels, ACP, metal mesh and rainscreen systems.",
    description:
      "Cladding panels, aluminium composite panels, metal mesh facades and rainscreen build-ups.",
    icon: LayoutGrid,
    color: "#6B4226",
    heroTitle: { lead: "Cladding &", accent: "Facade Panels" },
    heroIntro:
      "Where a facade is not glazed, it is panelised. We supply the cladding layer that gives a building its material, its texture and its weather line — from flat composite panels to ventilated rainscreen build-ups.",
    heroImage: "/commercial_glass_facade.png",
    usesGlazing: false,
    systems: [
      {
        num: "01",
        id: "cladding-panels",
        title: "Cladding Panels",
        tagline: "A panelised skin fixed over the structure",
        simpleDesc:
          "Panel systems fixed to a support framework in front of the structural wall, forming the visible external surface of the building.",
        features: [
          "Panel sizes set out to the facade grid",
          "Concealed or expressed fixing options",
          "Wide range of finishes and colours",
        ],
        benefits: "Gives a consistent, repeatable external finish across a large elevation.",
        apps: "Commercial facades · Institutional buildings · Facade refurbishment",
        img: "/commercial_glass_facade.png",
        images: [
          "/commercial_glass_facade.png",
          "/services/brochure-img-6.jpg",
          "/services/brochure-img-8.jpg",
        ],
      },
      {
        num: "02",
        id: "aluminium-composite-panels",
        title: "Aluminium Composite Panels (ACP)",
        tagline: "Flat, lightweight panels in a wide colour range",
        simpleDesc:
          "Composite panels made of two thin aluminium skins bonded to a core, routed and folded into cassettes for a flat, sharp-edged facade surface.",
        features: [
          "Very flat panel faces with crisp folded edges",
          "Broad palette of solid, metallic and textured finishes",
          "Light enough to reduce facade support loads",
        ],
        benefits: "A precise, modern facade finish that is quick to install.",
        apps: "Office buildings · Showrooms · Signage bands · Facade upgrades",
        img: "/services/brochure-img-6.jpg",
        images: [
          "/services/brochure-img-6.jpg",
          "/commercial_glass_facade.png",
          "/services/brochure-img-7.jpg",
        ],
      },
      {
        num: "03",
        id: "metal-mesh-facades",
        title: "Metal Mesh Facades",
        tagline: "Woven or expanded mesh as a facade layer",
        simpleDesc:
          "Metal mesh panels tensioned or framed in front of the building, forming a semi-transparent outer layer that screens without fully closing the elevation.",
        features: [
          "Woven and expanded mesh patterns",
          "Framed or tensioned panel systems",
          "Varying degrees of open area",
        ],
        benefits: "Screening and shading that still lets light and air through.",
        apps: "Car park facades · Plant screening · Feature elevations",
        img: "/service_architectural_systems.png",
        images: [
          "/service_architectural_systems.png",
          "/services/brochure-img-19.jpg",
          "/commercial_glass_facade.png",
        ],
      },
      {
        num: "04",
        id: "rainscreen-cladding",
        title: "Rainscreen Cladding",
        tagline: "A drained and ventilated cladding build-up",
        simpleDesc:
          "A cladding layer set off the wall on a support system, with a ventilated cavity behind it that drains and dries any water that gets past the outer face.",
        features: [
          "Ventilated and drained cavity behind the panel",
          "Support framework set off the structural wall",
          "Panels replaceable individually",
        ],
        benefits: "Manages water and moisture properly rather than relying on sealant alone.",
        apps: "High-rise facades · Institutional buildings · Coastal exposures",
        img: "/services/brochure-img-8.jpg",
        images: [
          "/services/brochure-img-8.jpg",
          "/commercial_glass_facade.png",
          "/services/brochure-img-6.jpg",
        ],
      },
    ],
  },

  /* ============================================================ 06 */
  {
    id: "balustrades-railings",
    slug: "balustrades-railings",
    label: "Balustrades & Railings",
    menuDesc: "Glass balustrades, railings and handrails.",
    description:
      "Glass balustrades, aluminium railings and handrails for stairs, balconies, terraces and ramps.",
    icon: Fence,
    color: "#8C6F3B",
    heroTitle: { lead: "Balustrades &", accent: "Railings" },
    heroIntro:
      "Edge protection is a safety element before it is a design one. We supply glass balustrades and aluminium railing systems that meet the barrier requirement without closing down the view behind them.",
    heroImage: "/services/brochure-img-13.jpg",
    usesGlazing: true,
    systems: [
      {
        num: "01",
        id: "glass-balustrades",
        title: "Glass Balustrades",
        tagline: "Protective barriers that keep the view",
        simpleDesc:
          "Toughened and laminated glass barriers to balconies, terraces, stairs and level changes, set in a base channel or held by discrete clamps.",
        features: [
          "Base channel or point-clamped fixing",
          "Toughened laminated safety glass",
          "With or without a capping handrail",
        ],
        benefits: "Meets the barrier requirement without blocking the view behind it.",
        apps: "Balconies · Terraces · Staircases · Mezzanine edges · Pool surrounds",
        img: "/services/brochure-img-13.jpg",
        images: [
          "/services/brochure-img-13.jpg",
          "/services/brochure-img-12.jpg",
          "/services/brochure-img-22.jpg",
        ],
      },
      {
        num: "02",
        id: "railings-handrails",
        title: "Railings & Handrails",
        tagline: "Aluminium railings for stairs, ramps and edges",
        simpleDesc:
          "Aluminium railing and handrail systems for stairs, ramps, corridors and roof edges, built from standard sections and fixed back to the structure.",
        features: [
          "Wall-mounted and free-standing handrails",
          "Post, infill and top-rail configurations",
          "Powder-coated and anodised finishes",
        ],
        benefits: "Durable, low-maintenance edge protection that does not corrode.",
        apps: "Staircases · Ramps · Corridors · Roof edges · Walkways",
        img: "/services/brochure-img-12.jpg",
        images: [
          "/services/brochure-img-12.jpg",
          "/services/brochure-img-13.jpg",
          "/why_shreehari_details.png",
        ],
      },
    ],
  },
];

/** Total number of systems across every category. */
export const TOTAL_SYSTEMS = SERVICE_CATEGORIES.reduce(
  (sum, cat) => sum + cat.systems.length,
  0,
);

export function getServiceCategory(slug: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find((cat) => cat.slug === slug);
}

export function serviceHref(slug: string): string {
  return `/services/${slug}`;
}
