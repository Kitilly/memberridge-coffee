import { images } from "@/lib/images";

export const brewMethods = [
  {
    slug: "french-press",
    name: "French Press",
    time: "4 minutes",
    grind: "Coarse",
    description:
      "Full immersion brewing that favors body and weight. Forgiving on ratio, unforgiving on grind size — go too fine and the press turns muddy.",
    image: images.brewFrenchPress,
  },
  {
    slug: "pour-over",
    name: "Pour Over",
    time: "3 minutes",
    grind: "Medium-Fine",
    description:
      "A slow, controlled pour through a paper filter. The clearest way to taste what a light roast single origin is actually doing.",
    image: images.brewPourOver,
  },
  {
    slug: "espresso",
    name: "Espresso",
    time: "25–30 seconds",
    grind: "Fine",
    description:
      "Pressurized extraction that concentrates body and sweetness into a small, intense volume. The foundation of every milk drink we make.",
    image: images.brewEspresso,
  },
  {
    slug: "cold-brew",
    name: "Cold Brew",
    time: "16–18 hours",
    grind: "Coarse",
    description:
      "Steeped at room temperature over time rather than heat. Lower acidity, heavier body, and a concentrate that keeps for weeks.",
    image: images.brewColdBrew,
  },
  {
    slug: "chemex",
    name: "Chemex",
    time: "4–5 minutes",
    grind: "Medium-Coarse",
    description:
      "The thick proprietary filter pulls out oils and sediment for an unusually clean, tea-like cup — best with brighter single origins.",
    image: images.brewChemex,
  },
  {
    slug: "aeropress",
    name: "AeroPress",
    time: "1–2 minutes",
    grind: "Medium-Fine",
    description:
      "Immersion and pressure in one small device. Fast, near-indestructible, and the one we pack when we travel.",
    image: images.brewAeropress,
  },
];

export const origins = [
  {
    country: "Ethiopia",
    region: "Yirgacheffe",
    coordinates: { top: "44%", left: "58%" },
    altitude: "1,900–2,100 masl",
    farmers: "1,200+ smallholder families",
    story:
      "Widely regarded as the birthplace of arabica. Farms here are small — often under two hectares — and cherries are still hand-sorted by family co-ops before washing.",
    image: images.farmOrigin1,
  },
  {
    country: "Colombia",
    region: "Huila",
    coordinates: { top: "56%", left: "28%" },
    altitude: "1,500–1,800 masl",
    farmers: "Cooperativa San Adolfo, 340 members",
    story:
      "Huila's microclimates — fog by afternoon, sun by morning — slow cherry ripening just enough to build the sugar concentration the region is known for.",
    image: images.farmOrigin2,
  },
  {
    country: "Kenya",
    region: "Kirinyaga",
    coordinates: { top: "52%", left: "60%" },
    altitude: "1,750–1,950 masl",
    farmers: "Kiangoi Washing Station, 900 contributing farms",
    story:
      "Volcanic red soil on the slopes of Mount Kenya, paired with a rigorous double-fermentation wash process, produces some of the most distinct acidity in coffee.",
    image: images.farmOrigin3,
  },
];

export const testimonials = [
  {
    author: "Priya Desai",
    role: "Café Owner, Ember & Ash",
    quote:
      "We switched our house blend to Morning Ridge eighteen months ago and haven't had a single customer ask why. That's the whole review.",
  },
  {
    author: "Daniel Ochoa",
    role: "Subscriber since 2023",
    quote:
      "The roast date on every bag actually means something here — I can taste the difference between week one and week three, which tells me they're not just printing a date to print one.",
  },
  {
    author: "Sarah Lindqvist",
    role: "Home Barista",
    quote:
      "Their grind selector is the first one I've used that actually nails espresso grind for my machine. Small detail, but it says a lot about attention to detail elsewhere.",
  },
];

export const journalPosts = [
  {
    slug: "what-altitude-actually-does",
    title: "What Altitude Actually Does to a Coffee Cherry",
    excerpt:
      "Higher elevations mean slower maturation and denser beans — but the relationship between altitude and flavor is less simple than 'higher is better.'",
    category: "Education",
    date: "2026-07-14",
    image: images.farmOrigin3,
  },
  {
    slug: "washed-vs-natural-process",
    title: "Washed vs. Natural: Reading a Process Note Like a Menu",
    excerpt:
      "The processing method on a bag tells you more about the flavor you're about to taste than the roast date does. Here's how to read it.",
    category: "Education",
    date: "2026-06-28",
    image: images.storyBeans,
  },
  {
    slug: "why-we-pay-above-composite",
    title: "Why We Pay Above the Composite Price, Every Harvest",
    excerpt:
      "The commodity price and a fair price for quality coffee are two different numbers. Here's how we think about the gap.",
    category: "Sourcing",
    date: "2026-06-02",
    image: images.storyHands,
  },
];

export const navLinks = [
  {
    label: "Coffee",
    href: "/coffee",
    columns: [
      {
        heading: "Shop",
        links: [
          { label: "All Coffee", href: "/coffee" },
          { label: "Single Origin", href: "/coffee?category=single-origin" },
          { label: "Blends", href: "/coffee?category=blend" },
          { label: "Espresso", href: "/coffee?category=espresso" },
        ],
      },
      {
        heading: "Programs",
        links: [
          { label: "Subscriptions", href: "/subscriptions" },
          { label: "Wholesale", href: "/wholesale" },
          { label: "Gift Cards", href: "/gift-cards" },
        ],
      },
    ],
  },
  { label: "Our Story", href: "/about" },
  { label: "Coffee Education", href: "/education" },
  { label: "Journal", href: "/journal" },
  { label: "Locations", href: "/locations" },
];
