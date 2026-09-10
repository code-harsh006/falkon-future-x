import {
  Droplet,
  Trash2,
  ShieldCheck,
  ShoppingCart,
  HeartPulse,
  Sun,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type ServicePillar = {
  title: string;
  text: string;
};

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  categoryLabel: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  paragraphs: string[];
  featuresTitle: string;
  features: string[];
  pillarsTitle: string;
  pillars: ServicePillar[];
  stat: { title: string; text: string; badge: string };
  cta: { text: string; label: string };
  related: string[];
};

export const categories = [
  { id: "all", label: "All ventures" },
  { id: "environment", label: "Environmental & ESG" },
  { id: "enterprise", label: "Enterprise security" },
  { id: "software", label: "Software & retail" },
  { id: "logistics", label: "Logistics" },
];

export const services: Service[] = [
  {
    id: "water-bound-digises-solution",
    title: "Waterborne Disease & Resource Solution",
    shortTitle: "Water resource management",
    category: "environment",
    categoryLabel: "Environmental infrastructure",
    icon: Droplet,
    tagline:
      "Digital monitoring networks, real-time sewer load indicators, and predictive analytics that protect metropolitan clean-water reserves.",
    summary:
      "IoT water audits and sensors that help cities protect and optimise municipal reserves.",
    paragraphs: [
      "Our waterborne resource solution delivers municipal and industrial water management through digital technologies. We integrate IoT sensors, real-time pressure diagnostics, and machine-learning models to prevent pipeline leakage and sewer blockages.",
      "By deploying smart telemetry across municipal branches, the platform gives civic administrators instant visibility on water flow, contamination nodes, and blockages often caused by mismanaged plastic waste — reducing response time from days to minutes.",
    ],
    featuresTitle: "Technical deliverables",
    features: [
      "Real-time pressure and turbidity monitoring telemetry.",
      "Predictive blockage alerts using AI-driven flow anomalies.",
      "Integrated municipal dashboard for civic departments.",
      "Hardware spec: NB-IoT compatible solar flow meters.",
    ],
    pillarsTitle: "Operational pillars",
    pillars: [
      {
        title: "Contamination traps",
        text: "Early-warning chemical indicators detecting heavy metals and pathogens.",
      },
      {
        title: "Hydrological data layers",
        text: "GIS-linked sewer maps highlighting structural vulnerabilities.",
      },
    ],
    stat: {
      title: "Sewer obstruction mitigation",
      text: "Metropolitan blockages fall by around 30% when paired with plastic-collection programs.",
      badge: "ESG impact ready",
    },
    cta: {
      text: "Schedule a technical audit for municipal water branches or commercial water grids.",
      label: "Contact a specialist",
    },
    related: ["smart-waste-management-system", "new-renewable-energy"],
  },
  {
    id: "smart-waste-management-system",
    title: "Smart Waste Management Bins",
    shortTitle: "Smart waste bins",
    category: "environment",
    categoryLabel: "IoT & sensor networks",
    icon: Trash2,
    tagline:
      "Smart bins with volumetric fill-level sensors, auto-sorting mechanics, and decentralised dispatch routing that cut operational carbon footprints.",
    summary:
      "Fill-level sensing, auto-sorting, and RFID tracking for municipal sanitation.",
    paragraphs: [
      "Our smart waste management system changes how solid municipal waste is aggregated. By combining sensor-equipped containers with dynamic route optimisation, we solve collection inefficiency — bins alert logistics crews when fill capacity reaches 85%.",
      "Municipal administrations and commercial facility owners can optimise pickup schedules, eliminating unnecessary vehicle travel and reducing fuel consumption by up to 40%. The system uses RFID and NB-IoT technology to guarantee high communication uptime.",
    ],
    featuresTitle: "Operational features",
    features: [
      "Volumetric ultrasonic fill-level sensors with 4G/NB-IoT fallback.",
      "Automated AI waste-sorting indicators separating organics from recyclables.",
      "Real-time dispatch dashboard feeding local collection trucks.",
      "Ledger timestamping for every drop-off volume verification.",
    ],
    pillarsTitle: "Financial & environmental benefits",
    pillars: [
      {
        title: "Cost reductions",
        text: "Save up to 40% in municipal collection fuel and labour expenses annually.",
      },
      {
        title: "Zero overflow",
        text: "Prevent bin overflow in public squares, improving urban hygiene scores.",
      },
    ],
    stat: {
      title: "IoT network uptime",
      text: "Over 99.8% network packet delivery using custom narrowband IoT fallback protocols.",
      badge: "Industrial hardware grade",
    },
    cta: {
      text: "Deploy smart bins across your commercial facility or real-estate projects.",
      label: "Request a pilot demo",
    },
    related: ["water-bound-digises-solution", "new-renewable-energy"],
  },
  {
    id: "cyber-awareness-guidance",
    title: "Cyber Awareness & Consultancy",
    shortTitle: "Cybersecurity consultancy",
    category: "enterprise",
    categoryLabel: "Enterprise security",
    icon: ShieldCheck,
    tagline:
      "Security architecture audits, social-engineering simulation training, and regulatory compliance advisory that protect your digital core.",
    summary:
      "Threat audits, phishing simulations, and compliance training for teams.",
    paragraphs: [
      "Our cyber awareness division delivers end-to-end security advice and training to protect business files, software configurations, and employee communications from an expanding digital threat environment.",
      "We offer organisational threat mapping, targeted phishing simulations, incident-response roadmap preparation, and continuous monitoring practices. Training human networks alongside enterprise standards builds resilient organisations.",
    ],
    featuresTitle: "Key features",
    features: [
      "Customised cybersecurity training courses and simulation audits.",
      "Social-engineering threat testing and phishing vector simulation.",
      "Vulnerability mapping and digital footprint audits.",
      "Incident-response policy preparation and continuity planning.",
    ],
    pillarsTitle: "Consultation modules",
    pillars: [
      {
        title: "Defense foundations",
        text: "Password sanitisation, network segmentation, and multi-factor validation setups.",
      },
      {
        title: "Data safety guidelines",
        text: "Compliance audits (HIPAA, GDPR, ISO 27001) for private user repositories.",
      },
    ],
    stat: {
      title: "Human risk reduction",
      text: "Phishing click-through rates drop from 28% to under 2% after our simulation audits.",
      badge: "Audit certified",
    },
    cta: {
      text: "Schedule a cybersecurity evaluation to analyse your current exposure index.",
      label: "Request an audit",
    },
    related: ["e-commerce", "smart-healthcare-solutions"],
  },
  {
    id: "e-commerce",
    title: "E-Commerce Framework Integrations",
    shortTitle: "E-commerce frameworks",
    category: "software",
    categoryLabel: "Retail & platforms",
    icon: ShoppingCart,
    tagline:
      "End-to-end storefront engineering, payment architecture integrations, and offset tracking embedded directly into retail checkout systems.",
    summary:
      "Storefronts with logistics, secure payments, and reward integration.",
    paragraphs: [
      "Our e-commerce division builds transaction engines that connect consumer purchases with sustainability variables, integrating reward loops directly inside standard retail checkout protocols.",
      "We handle the complete development cycle: storefront UI design, secure API integrations, inventory sync, and unified analytics. Brands can offer checkout offset capabilities that lift shopper loyalty.",
    ],
    featuresTitle: "Engineering features",
    features: [
      "Storefront frameworks optimised for mobile checkout speed.",
      "Secure Stripe, Razorpay, and card-network integrations.",
      "Wallet widgets letting users pay with recycled credits.",
      "Custom inventory and supply-chain data synchronisation.",
    ],
    pillarsTitle: "Operational strengths",
    pillars: [
      {
        title: "Offset checkout",
        text: "Let buyers purchase certified offsets during checkout with one click.",
      },
      {
        title: "Analytics API nodes",
        text: "Sync transaction data into ESG reporting repositories automatically.",
      },
    ],
    stat: {
      title: "Opt-in conversions",
      text: "Retail partners report up to a 15% lift in conversion when sustainability options are present.",
      badge: "E-commerce SaaS ready",
    },
    cta: {
      text: "Schedule a consultation to audit payment systems or build an online storefront.",
      label: "Contact a specialist",
    },
    related: ["cyber-awareness-guidance", "food-delivery"],
  },
  {
    id: "smart-healthcare-solutions",
    title: "Smart Healthcare Solutions",
    shortTitle: "Healthtech",
    category: "software",
    categoryLabel: "Telemedicine & clinical data",
    icon: HeartPulse,
    tagline:
      "Encrypted health-record platforms, secure telemedicine portals, and remote sensor integration that improve patient outcome metrics.",
    summary:
      "Telemedicine tooling, encrypted health records, and AI-assisted diagnostics.",
    paragraphs: [
      "Our healthcare division designs digital infrastructure for hospitals, clinical research pipelines, and remote care programs, building secure portals that meet privacy compliance standards.",
      "We build tools for remote diagnostics, virtual consultations, and automated scheduling. Security is central — all data transactions use end-to-end encryption protocols.",
    ],
    featuresTitle: "Deliverable capabilities",
    features: [
      "Telehealth software with encrypted video and chat channels.",
      "Secure cloud electronic health records meeting data rules.",
      "Integration with consumer wearables for automated diagnostics.",
      "AI-assisted administrative scheduling and staff dispatch.",
    ],
    pillarsTitle: "Operational pillars",
    pillars: [
      {
        title: "Encrypted pipelines",
        text: "Secure databases protecting patient information from breach hazards.",
      },
      {
        title: "Clinic portals",
        text: "Tailored interfaces for doctors and scheduling teams that streamline operations.",
      },
    ],
    stat: {
      title: "Patient satisfaction",
      text: "Clinics report up to a 30% reduction in check-in bottlenecks using our telemetry modules.",
      badge: "HIPAA compliant",
    },
    cta: {
      text: "Deploy smart diagnostics or encrypted database tools for your clinical branch.",
      label: "Contact a specialist",
    },
    related: ["cyber-awareness-guidance", "water-bound-digises-solution"],
  },
  {
    id: "new-renewable-energy",
    title: "New Renewable Energy Auditing",
    shortTitle: "Renewable energy audits",
    category: "environment",
    categoryLabel: "Sustainable grid & solar",
    icon: Sun,
    tagline:
      "Solar potential maps, industrial grid transition designs, and carbon-offset integrations that help corporations meet sustainability goals.",
    summary:
      "Solar layout design and transition planning for buildings and municipal grids.",
    paragraphs: [
      "Our renewable energy division provides clean-grid audits, solar installation designs, and transition advice for municipal operations and commercial facilities, aligned with carbon-market guidelines.",
      "By deploying energy-monitoring nodes across facilities, the platform evaluates grid health, tracks carbon-abatement volumes, and manages tradeable carbon credits under verified international standards.",
    ],
    featuresTitle: "Strategic deliverables",
    features: [
      "Solar viability audits and roof-mount spatial mapping.",
      "Commercial building energy audits meeting green standards.",
      "Dynamic grid-monitoring telemetry integration.",
      "Carbon-offset creation models from clean energy displacement.",
    ],
    pillarsTitle: "Operational pillars",
    pillars: [
      {
        title: "Grid viability",
        text: "Map the transition capabilities of commercial systems to green grid inputs.",
      },
      {
        title: "Carbon offsets",
        text: "Convert clean energy production into certified environmental offsets.",
      },
    ],
    stat: {
      title: "Abatement efficiency",
      text: "Industrial clients report up to a 28% reduction in grid dependency after transition audits.",
      badge: "ESG ready",
    },
    cta: {
      text: "Schedule an audit to transition your industrial facility to renewable power grids.",
      label: "Request an audit",
    },
    related: ["water-bound-digises-solution", "smart-waste-management-system"],
  },
  {
    id: "food-delivery",
    title: "Sustainable Food Delivery Systems",
    shortTitle: "Sustainable food delivery",
    category: "logistics",
    categoryLabel: "Logistics & last-mile",
    icon: Utensils,
    tagline:
      "AI-driven last-mile route planning, optimised return-trip packaging collection, and merchant ESG reporting frameworks.",
    summary:
      "Route planning and return-trip collection that fold recycling into delivery.",
    paragraphs: [
      "Our food delivery service integrates delivery workflows with clean waste aggregation. Custom algorithms let agents drop off food and collect segregated plastics on a single trip, optimising last-mile resource usage.",
      "By partnering with eco-friendly local restaurants, we help retailers adopt reusable packaging, reduce single-use plastic, and track sustainability indices that appeal to premium, eco-conscious consumers.",
    ],
    featuresTitle: "Logistical capabilities",
    features: [
      "AI routing algorithms coordinating pickup and return drop-off nodes.",
      "Real-time courier tracking with dynamic bag-scanning verification.",
      "Merchant panel highlighting ESG packaging metrics and rewards.",
      "Integration with delivery-personnel mobile apps.",
    ],
    pillarsTitle: "Operational pillars",
    pillars: [
      {
        title: "Zero-cost logistics",
        text: "Embedding pickups into return runs eliminates auxiliary transport cost.",
      },
      {
        title: "Eco packaging sync",
        text: "Support merchants transitioning to circular, compostable box formats.",
      },
    ],
    stat: {
      title: "Return-run efficiency",
      text: "The network scales waste diversion while raising rider income up to 25% via recycling commissions.",
      badge: "Logistics moat",
    },
    cta: {
      text: "Integrate your restaurant brand or delivery fleet with the collection loop.",
      label: "Partner with us",
    },
    related: ["e-commerce", "smart-waste-management-system"],
  },
];

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}
