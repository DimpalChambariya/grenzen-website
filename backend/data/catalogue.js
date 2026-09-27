// Structured data extracted from the Grenzen Pharmachem product catalogue.
// In a production setting this would live in a database; it is kept here
// as a single module so the API has one clear source of truth.

const company = {
  legalName: "Grenzen Pharmachem Industries Private Limited",
  shortName: "Grenzen Pharmachem",
  tagline: "Chemistry that powers industry",
  founded: 2026,
  cin: "U21001GJ2026PTC172674",
  gstin: "24AAMCG7263L1Z4",
  phone: "+91 84900 08908",
  email: "info@grenzenpharmachem.com",
  website: "www.grenzenpharmachem.com",
  locations: [
    {
      id: "anand",
      label: "Corporate Office",
      city: "Anand",
      address: "Raghuvir Chamber, ISKCON Mandir Road, Vallabh Vidyanagar, Anand, Gujarat 388120",
      role: "Management, sales, procurement and accounts",
      lat: 22.5645,
      lng: 72.9289
    },
    {
      id: "mogri",
      label: "Warehouse 1",
      city: "Mogri",
      address: "Opp. Kumar Shala, Mogri, Anand, Gujarat 388345",
      role: "Storage and dispatch of industrial chemicals, dyes and caustic soda",
      lat: 22.4991,
      lng: 72.9553
    },
    {
      id: "navsari",
      label: "Warehouse 2",
      city: "Navsari",
      address: "City Survey No. 1808/002, Talav Chowk, Chikhli, Navsari, Gujarat 396521",
      role: "Dedicated facility for molasses and agro-commodity handling",
      lat: 20.9463,
      lng: 72.9520
    }
  ],
  stats: [
    { value: 25, suffix: "+", label: "Satisfied clients", note: "Across industry and dairy" },
    { value: 2665, suffix: " MT", label: "Total monthly supply", note: "9 products, live volume" },
    { value: 3, suffix: "", label: "Gujarat locations", note: "Anand, Mogri, Navsari" },
    { value: 124, suffix: "", label: "Planned iodine products", note: "Commercial launch 2028" }
  ],
  values: [
    { title: "Quality", detail: "Materials that match the agreed specification, consignment after consignment." },
    { title: "Integrity", detail: "Honest commitments, transparent pricing and clear documentation." },
    { title: "Reliability", detail: "Planned inventory and dispatch so our customers' lines keep running." },
    { title: "Innovation", detail: "Moving from trading into manufacturing, starting with iodine intermediates." }
  ],
  vision: "To make India a leader in iodine chemistry. By 2028 we will manufacture a portfolio of 124 iodine intermediates in Gujarat, supplying pharmaceutical, diagnostic and specialty chemical manufacturers in India and overseas.",
  mission: "To supply industrial chemicals and agro commodities that meet specification every time, delivered safely and on schedule, and to invest in the manufacturing, people and quality systems that will carry us from trader to trusted manufacturer.",
  leadership: [
    { name: "Dhruv K. Chambariya", role: "Director", focus: ["Business strategy", "Key accounts", "Manufacturing expansion"], bio: "Drives Grenzen's strategy and growth, leads key industrial and dairy customer relationships, and is steering the move into manufacturing." },
    { name: "Chandrikaben B. Patel", role: "Director", focus: ["Governance", "Compliance", "Long-term planning"], bio: "Provides governance and oversight across the company, guiding administration, statutory compliance and internal controls." },
    { name: "Aksh B. Patel", role: "Chief Financial Officer", focus: ["Finance & accounts", "GST & taxation", "Capital planning"], bio: "Leads finance, from accounts and taxation to working capital and banking, funding the company's planned expansion." },
    { name: "Dimpal K. Chambariya", role: "Chief Technical Officer", focus: ["Website & digital", "IT systems", "Technical documentation"], bio: "Leads technology and digital presence, and supports technical documentation such as specifications and data sheets." }
  ]
};

const categories = [
  { id: "epoxy", code: "A", name: "Epoxy & Varnish Raw Materials", blurb: "Resins, modifiers and hardeners for transformer varnishes, motor varnishes and insulating compounds.", industries: ["Power transformers", "Electric motors & windings", "Insulating varnishes"] },
  { id: "dyes", code: "B", name: "Industrial Textile Dyes & Intermediates", blurb: "Acid dyes and key intermediates for wool, silk, nylon and leather, serving Gujarat's textile and dyestuff clusters.", industries: ["Textile & fabric dyeing", "Dye intermediates", "Leather & paper shading"] },
  { id: "alkali", code: "C", name: "Caustic Soda", blurb: "Industrial-grade sodium hydroxide supplied on a scheduled monthly basis with full batch documentation.", industries: ["Textile processing", "Soaps & detergents", "Water treatment"] },
  { id: "agro", code: "D", name: "Agro & Cattle-Feed Commodities", blurb: "Bulk molasses and de-oiled rice bran for dairy co-operatives and feed mills across Gujarat.", industries: ["Compound cattle feed", "Dairy co-operatives", "Feed mills"] }
];

const products = [
  {
    id: "epoxy-resin",
    categoryId: "epoxy",
    code: "ER",
    name: "Epoxy Resin",
    volume: "3 MT / month",
    description: "Base resin for impregnating and coating varnishes, providing strong adhesion, low shrinkage and high electrical insulation after cure.",
    applications: ["Transformer impregnating varnish", "Motor winding varnish", "Potting & encapsulation"],
    specs: [
      { parameter: "Epoxy equivalent weight", value: "182–192 g/eq" },
      { parameter: "Viscosity at 25 °C", value: "11,000–14,000 mPa·s" },
      { parameter: "Colour (Gardner)", value: "≤ 1" },
      { parameter: "Non-volatile content", value: "≥ 99.5 %" },
      { parameter: "Packing", value: "200 kg drums" }
    ]
  },
  {
    id: "epoxy-base-modifier",
    categoryId: "epoxy",
    code: "BM",
    name: "Epoxy Base Modifier",
    volume: "3 MT / month",
    description: "Reactive modifier blended with the base resin to adjust viscosity, flexibility and penetration into tightly wound coils.",
    applications: ["Viscosity reduction", "Improved flexibility", "Better coil penetration"],
    specs: [
      { parameter: "Appearance", value: "Clear, pale yellow liquid" },
      { parameter: "Viscosity at 25 °C", value: "500–1,500 mPa·s" },
      { parameter: "Epoxy value", value: "0.40–0.50 eq/100 g" },
      { parameter: "Moisture", value: "≤ 0.1 %" },
      { parameter: "Packing", value: "200 kg drums" }
    ]
  },
  {
    id: "epoxy-modifier-hardener",
    categoryId: "epoxy",
    code: "MH",
    name: "Epoxy Modifier Hardener",
    volume: "3 MT / month",
    description: "Curing agent formulated for varnish systems, giving controlled pot life and a tough, heat-resistant cured film.",
    applications: ["Controlled cure & pot life", "Thermal class performance", "Chemical resistance"],
    specs: [
      { parameter: "Appearance", value: "Clear, light yellow liquid" },
      { parameter: "Anhydride content", value: "≥ 41 %" },
      { parameter: "Viscosity at 25 °C", value: "30–60 mPa·s" },
      { parameter: "Mix ratio (resin : hardener)", value: "100 : 80–90" },
      { parameter: "Packing", value: "200 kg drums" }
    ]
  },
  {
    id: "acid-yellow",
    categoryId: "dyes",
    code: "AY",
    name: "Acid Yellow Dyes",
    volume: "2 MT / month",
    description: "Bright yellow shades with good levelling for protein and polyamide fibres.",
    applications: ["Wool dyeing", "Silk dyeing", "Nylon dyeing"],
    specs: [
      { parameter: "Shade", value: "As per standard" },
      { parameter: "Strength", value: "100 ± 3 %" },
      { parameter: "Moisture", value: "≤ 5 %" },
      { parameter: "Solubility (90 °C)", value: "≥ 60 g/L" }
    ]
  },
  {
    id: "acid-red",
    categoryId: "dyes",
    code: "AR",
    name: "Acid Red Dyes",
    volume: "2 MT / month",
    description: "Clear red to bordeaux shades with good wash and light fastness.",
    applications: ["Wool dyeing", "Silk dyeing", "Nylon dyeing"],
    specs: [
      { parameter: "Shade", value: "As per standard" },
      { parameter: "Strength", value: "100 ± 3 %" },
      { parameter: "Moisture", value: "≤ 5 %" },
      { parameter: "Solubility (90 °C)", value: "≥ 60 g/L" }
    ]
  },
  {
    id: "acid-black",
    categoryId: "dyes",
    code: "AB",
    name: "Acid Black Dyes",
    volume: "2 MT / month",
    description: "Deep, even blacks for wool, nylon and leather dyeing.",
    applications: ["Wool dyeing", "Nylon dyeing", "Leather dyeing"],
    specs: [
      { parameter: "Shade", value: "As per standard" },
      { parameter: "Strength", value: "100 ± 3 %" },
      { parameter: "Moisture", value: "≤ 5 %" },
      { parameter: "Solubility (90 °C)", value: "≥ 50 g/L" }
    ]
  },
  {
    id: "h-acid",
    categoryId: "dyes",
    code: "HA",
    name: "H-Acid",
    volume: "On request",
    description: "1-Amino-8-naphthol-3,6-disulfonic acid — a key naphthalene intermediate for reactive, direct and acid azo dyes, especially blacks, blues and reds.",
    applications: ["Reactive dye manufacture", "Direct dye manufacture", "Acid azo dye manufacture"],
    specs: [
      { parameter: "Purity (by nitrite)", value: "≥ 80 %" },
      { parameter: "Moisture", value: "≤ 5 %" },
      { parameter: "Insolubles", value: "≤ 0.5 %" },
      { parameter: "Form", value: "Off-white to grey powder" }
    ]
  },
  {
    id: "dnsda",
    categoryId: "dyes",
    code: "DNSDA",
    name: "DNSDA",
    volume: "On request",
    description: "4,4'-Dinitrostilbene-2,2'-disulfonic acid — a stilbene intermediate used to manufacture optical brightening agents and direct dyes.",
    applications: ["Optical brightening agents", "Direct dye manufacture"],
    specs: [
      { parameter: "Purity (dry basis)", value: "≥ 90 %" },
      { parameter: "Moisture", value: "≤ 10 %" },
      { parameter: "Form", value: "Yellow paste / powder" },
      { parameter: "Packing", value: "25 kg bags" }
    ]
  },
  {
    id: "caustic-soda",
    categoryId: "alkali",
    code: "NaOH",
    name: "Caustic Soda",
    volume: "150 MT / month",
    description: "Sodium hydroxide supplied in consistent industrial grades, stored under dry, controlled conditions at our Mogri warehouse.",
    applications: ["Textile processing", "Paper & pulp", "Chemical processing", "Soaps & detergents", "Water treatment", "Neutralisation & pH control"],
    specs: [
      { parameter: "Form", value: "Flakes (lye on request)" },
      { parameter: "NaOH content", value: "≥ 98 %" },
      { parameter: "Sodium carbonate (Na₂CO₃)", value: "≤ 0.5 %" },
      { parameter: "Sodium chloride (NaCl)", value: "≤ 0.05 %" },
      { parameter: "Iron (Fe)", value: "≤ 10 ppm" }
    ],
    hazard: "Corrosive (UN 1823 solid, UN 1824 solution). Stored dry, segregated from acids, and handled with appropriate PPE."
  },
  {
    id: "molasses",
    categoryId: "agro",
    code: "MOL",
    name: "Molasses",
    volume: "1,000 MT / month",
    description: "Cane molasses as an energy source and palatability enhancer in compound cattle feed, supplied in bulk from our dedicated Navsari facility.",
    applications: ["Compound cattle feed", "Feed pellet binding", "Energy for ruminants", "Improved palatability"],
    specs: [
      { parameter: "HSN code", value: "1703 10 00" },
      { parameter: "Brix", value: "≥ 80°" },
      { parameter: "Total reducing sugars", value: "≥ 45 %" },
      { parameter: "Moisture", value: "≤ 20 %" },
      { parameter: "Sulphated ash", value: "≤ 15 %" }
    ]
  },
  {
    id: "dorb",
    categoryId: "agro",
    code: "DORB",
    name: "De-Oiled Rice Bran",
    volume: "1,500+ MT / month",
    description: "The protein- and fibre-rich material remaining after rice bran oil is extracted — a cost-effective ingredient in compound cattle feed.",
    applications: ["Compound cattle feed", "Dairy co-operatives", "Feed mills", "Protein & fibre source"],
    specs: [
      { parameter: "Crude protein", value: "≥ 14 %" },
      { parameter: "Crude fibre", value: "≤ 14 %" },
      { parameter: "Residual oil", value: "≤ 1 %" },
      { parameter: "Moisture", value: "≤ 10 %" },
      { parameter: "Sand & silica", value: "≤ 3.5 %" }
    ]
  }
];

const upcoming = [
  {
    id: "iodine",
    name: "Iodine Intermediates",
    year: 2028,
    scale: "124 planned products",
    description: "Grenzen is moving from trading into manufacturing. Our upcoming unit will produce a planned portfolio of 124 iodine intermediates for pharmaceutical and specialty chemical manufacturers.",
    timeline: [
      { year: "2026", title: "Company incorporated", detail: "Grenzen Pharmachem Industries Pvt. Ltd. established in Anand, Gujarat.", status: "done" },
      { year: "Now", title: "Trading operations", detail: "Chemicals, dyes, caustic soda and agro commodities supplied across Gujarat.", status: "active" },
      { year: "Next", title: "Manufacturing unit", detail: "Iodine intermediates facility being established.", status: "upcoming" },
      { year: "2028", title: "Commercial production", detail: "Launch of the 124-product iodine range.", status: "upcoming" }
    ]
  },
  {
    id: "castor",
    name: "Castor Derivatives — HCO & 12-HSA",
    year: 2028,
    scale: "600 MT / month planned capacity",
    description: "India grows most of the world's castor seed, and Gujarat is its largest producing state. Our planned plant will convert this local resource into hydrogenated castor oil and its derivatives, including 12-hydroxystearic acid.",
    variants: [
      {
        name: "HCO — Hydrogenated Castor Oil",
        description: "Also known as castor wax: a hard, white, odourless wax made by hydrogenating castor oil, used as a versatile rheology modifier and lubricant.",
        applications: ["Lubricating greases", "Cosmetics", "Paints & coatings", "PVC processing", "Polishes & inks"],
        specs: [
          { parameter: "Hydroxyl value", value: "155–165 mg KOH/g" },
          { parameter: "Iodine value", value: "≤ 3 g I₂/100 g" },
          { parameter: "Acid value", value: "≤ 2 mg KOH/g" },
          { parameter: "Melting point", value: "84–88 °C" },
          { parameter: "Form", value: "White flakes / powder" }
        ]
      },
      {
        name: "12-HSA — 12-Hydroxystearic Acid",
        description: "A saturated fatty acid derived from hydrogenated castor oil and the key thickener for high-performance lithium and calcium greases.",
        applications: ["Lithium & calcium greases", "Metallic soaps", "Cosmetics", "Coatings & adhesives"],
        specs: [
          { parameter: "Acid value", value: "175–185 mg KOH/g" },
          { parameter: "Hydroxyl value", value: "≥ 150 mg KOH/g" },
          { parameter: "Iodine value", value: "≤ 3 g I₂/100 g" },
          { parameter: "Melting point", value: "74–80 °C" },
          { parameter: "Form", value: "Off-white flakes" }
        ]
      }
    ]
  }
];

const industries = [
  { id: "electrical", name: "Electrical", detail: "Transformer and motor varnish manufacturers" },
  { id: "textiles", name: "Textiles", detail: "Dye houses, processors and dyestuff makers" },
  { id: "dairy", name: "Dairy & Cattle Feed", detail: "Dairy co-operatives and feed plants" },
  { id: "chemicals", name: "Chemicals", detail: "Chemical and intermediate manufacturers" },
  { id: "paper", name: "Paper", detail: "Pulp and paper mills" },
  { id: "water", name: "Water Treatment", detail: "Municipal and industrial treatment plants" }
];

const qualityProcess = [
  { step: 1, title: "Supplier qualification", detail: "Sources are assessed for consistency, documentation and capacity before first purchase." },
  { step: 2, title: "Incoming verification", detail: "Each lot is checked against the agreed specification and supplier certificate of analysis." },
  { step: 3, title: "Controlled storage", detail: "Segregated, dry and labelled storage with first-in, first-out stock rotation." },
  { step: 4, title: "Batch traceability", detail: "Lot numbers recorded from receipt through to the customer's delivery challan." },
  { step: 5, title: "Dispatch checks", detail: "Quantity, packaging and documents verified before every dispatch." }
];

module.exports = { company, categories, products, upcoming, industries, qualityProcess };
