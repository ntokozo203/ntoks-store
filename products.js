/* STRIDE product catalog — plain JavaScript.
   All product cards on the shop page are rendered from this array
   using JavaScript loops. */

var PRODUCTS = [
  {
    id: 1,
    name: "Phantom Surge",
    tagline: "Night Run Series",
    description:
      "Mesh upper with reflective threading for low-light runs. Dual-density midsole absorbs impact and returns energy with every stride.",
    price: 149,
    oldPrice: 179,
    category: "running",
    colorway: "Black / Volt Red",
    sizes: [7, 8, 8.5, 9, 9.5, 10, 11, 12],
    weight: "248 g",
    drop: "8 mm",
    image: "images/shoe-01.jpg",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Tempo Wave",
    tagline: "Speed Training",
    description:
      "Lightweight trainer built for tempo runs and track sessions. A propulsive plate moves you forward while the breathable upper keeps you cool.",
    price: 129,
    category: "running",
    colorway: "Ghost Grey / Amber",
    sizes: [7, 8, 9, 10, 11, 12],
    weight: "235 g",
    drop: "9 mm",
    image: "images/shoe-02.jpg",
    tag: "New",
  },
  {
    id: 3,
    name: "Court Classic 84",
    tagline: "Legacy Court",
    description:
      "A retro court silhouette reissued with premium full-grain leather. The perforated toe box and cushioned collar keep the vintage look with upgraded comfort.",
    price: 99,
    category: "court",
    colorway: "White / Black Stripe",
    sizes: [6, 7, 8, 8.5, 9, 10, 11],
    weight: "310 g",
    drop: "10 mm",
    image: "images/shoe-03.jpg",
  },
  {
    id: 4,
    name: "Solar Glide Pro",
    tagline: "Marathon Ready",
    description:
      "Race-day geometry with an embedded shank and foam midsole. Built to hold pace from the gun to the finish line.",
    price: 189,
    category: "running",
    colorway: "Ivory / Neon Yellow",
    sizes: [8, 9, 9.5, 10, 10.5, 11, 12],
    weight: "212 g",
    drop: "7 mm",
    image: "images/shoe-04.jpg",
    tag: "Race",
  },
  {
    id: 5,
    name: "Riot Low",
    tagline: "Street Series",
    description:
      "Bold color-blocked suede and mesh upper over a translucent jelly sole. For days when the pavement is your track.",
    price: 119,
    category: "lifestyle",
    colorway: "Citrus / Pink Surge",
    sizes: [6, 7, 8, 9, 10, 11],
    weight: "290 g",
    drop: "10 mm",
    image: "images/shoe-05.jpg",
    tag: "Limited",
  },
  {
    id: 6,
    name: "Crosswind",
    tagline: "Track Trainer",
    description:
      "Responsive EVA midsole with a wrapped forefoot cage for lateral support. The crossover pick for gym and sprint work.",
    price: 109,
    oldPrice: 139,
    category: "court",
    colorway: "Steel Grey / Volt",
    sizes: [7, 8, 9, 10, 11, 12, 13],
    weight: "275 g",
    drop: "9 mm",
    image: "images/shoe-06.jpg",
    tag: "Sale",
  },
  {
    id: 7,
    name: "Alpine Drift",
    tagline: "Off-Road Series",
    description:
      "Multi-lug rubber outsole grips loose gravel and wet rock. Reinforced toe guard and gaiter-ready collar for all-terrain miles.",
    price: 159,
    category: "trail",
    colorway: "Cloud White",
    sizes: [8, 9, 10, 11, 12],
    weight: "305 g",
    drop: "8 mm",
    image: "images/shoe-07.jpg",
  },
  {
    id: 8,
    name: "Urban Sprint 2.0",
    tagline: "Commuter Series",
    description:
      "Knit upper with water-shedding coating and a cushioned energy-return midsole. Commute harder, arrive fresher.",
    price: 134,
    category: "lifestyle",
    colorway: "Ash Grey",
    sizes: [7, 8, 8.5, 9, 10, 11],
    weight: "252 g",
    drop: "9 mm",
    image: "images/shoe-08.jpg",
    tag: "New",

  },
  {
    id: 9,
    name: "New Balance 574",
    tagline: "Banger",
    description:
      "Lightweight mesh upper with a durable rubber outsole. Perfect for city exploration and casual wear.",
    price: 50,
    category: "lifestyle",
    colorway: "Sandstone / Grey",
    sizes: [7, 8, 9, 10, 11],
    weight: "260 g",
    drop: "8 mm",
    image: "images/new balance.jpg",
    tag: "New",
  }
];

var CATEGORIES = ["running", "court", "lifestyle", "trail"];

var CATEGORY_LABELS = {
  running: "Running",
  court: "Court",
  lifestyle: "Lifestyle",
  trail: "Trail",
};

function formatPrice(n) {
  return "$" + n.toFixed(2);
}
