import { images } from "@/lib/images";

export const brewMethods = [
  {
    slug: "french-press",
    name: "French Press",
    time: "4 minutes",
    grind: "Coarse",
    ratio: "1:15 (60g coffee to 1L water)",
    equipment: ["French press", "Kitchen scale", "Kettle", "Timer"],
    description:
      "Full immersion brewing that favors body and weight. Forgiving on ratio, unforgiving on grind size — go too fine and the press turns muddy.",
    image: images.brewFrenchPress,
    steps: [
      { title: "Preheat", body: "Rinse the press with hot water to warm the glass, then discard." },
      { title: "Add coffee", body: "Add coarsely ground coffee — texture similar to sea salt." },
      { title: "Bloom", body: "Pour twice the water-to-coffee in weight, stir gently, wait 30 seconds." },
      { title: "Fill and steep", body: "Fill to your target weight and let steep undisturbed for 4 minutes." },
      { title: "Plunge and pour", body: "Press slowly and evenly, then pour immediately to stop extraction." },
    ],
  },
  {
    slug: "pour-over",
    name: "Pour Over",
    time: "3 minutes",
    grind: "Medium-Fine",
    ratio: "1:16 (20g coffee to 320g water)",
    equipment: ["Dripper (V60 or similar)", "Paper filter", "Kettle with narrow spout", "Kitchen scale"],
    description:
      "A slow, controlled pour through a paper filter. The clearest way to taste what a light roast single origin is actually doing.",
    image: images.brewPourOver,
    steps: [
      { title: "Rinse the filter", body: "Rinse with hot water to remove paper taste and preheat the dripper." },
      { title: "Add coffee, level bed", body: "Add ground coffee and gently settle the bed flat." },
      { title: "Bloom", body: "Pour 2x coffee weight in water, wait 30–45 seconds for it to degas." },
      { title: "Pour in stages", body: "Add water in slow concentric circles in 2–3 stages, avoiding the filter edge." },
      { title: "Drain and serve", body: "Total brew time should land around 2:30–3:00 minutes." },
    ],
  },
  {
    slug: "espresso",
    name: "Espresso",
    time: "25–30 seconds",
    grind: "Fine",
    ratio: "1:2 (18g coffee to 36g output)",
    equipment: ["Espresso machine", "Grinder", "Tamper", "Kitchen scale"],
    description:
      "Pressurized extraction that concentrates body and sweetness into a small, intense volume. The foundation of every milk drink we make.",
    image: images.brewEspresso,
    steps: [
      { title: "Dose", body: "Grind 18g directly into the portafilter basket." },
      { title: "Distribute and tamp", body: "Level the grounds, then tamp with firm, even pressure." },
      { title: "Lock in and start", body: "Lock the portafilter in and start the shot immediately." },
      { title: "Watch the pour", body: "Target 36g of output in 25–30 seconds, adjusting grind if it runs faster or slower." },
      { title: "Taste and adjust", body: "Sour means grind finer; bitter means grind coarser." },
    ],
  },
  {
    slug: "cold-brew",
    name: "Cold Brew",
    time: "16–18 hours",
    grind: "Coarse",
    ratio: "1:8 concentrate (125g coffee to 1L water)",
    equipment: ["Large jar or cold brew maker", "Coarse filter or cheesecloth", "Kitchen scale"],
    description:
      "Steeped at room temperature over time rather than heat. Lower acidity, heavier body, and a concentrate that keeps for weeks.",
    image: images.brewColdBrew,
    steps: [
      { title: "Combine", body: "Stir coarsely ground coffee into room-temperature or cold filtered water." },
      { title: "Steep", body: "Cover and steep at room temperature or in the fridge for 16–18 hours." },
      { title: "Strain", body: "Strain through a fine mesh or cheesecloth, then filter again for clarity." },
      { title: "Dilute and serve", body: "Cut the concentrate roughly 1:1 with water or milk over ice." },
    ],
  },
  {
    slug: "chemex",
    name: "Chemex",
    time: "4–5 minutes",
    grind: "Medium-Coarse",
    ratio: "1:16 (30g coffee to 480g water)",
    equipment: ["Chemex", "Chemex-specific filter", "Kettle with narrow spout", "Kitchen scale"],
    description:
      "The thick proprietary filter pulls out oils and sediment for an unusually clean, tea-like cup — best with brighter single origins.",
    image: images.brewChemex,
    steps: [
      { title: "Rinse the filter", body: "Unfold the filter with the triple-fold side against the spout, then rinse and discard water." },
      { title: "Add coffee", body: "Add medium-coarse coffee and level the bed." },
      { title: "Bloom", body: "Pour twice the coffee weight, wait 45 seconds." },
      { title: "Pour in stages", body: "Add water in slow pulses over 3–4 minutes, keeping the level below the rim." },
      { title: "Remove filter, serve", body: "Once drained, lift out the filter and pour directly from the carafe." },
    ],
  },
  {
    slug: "aeropress",
    name: "AeroPress",
    time: "1–2 minutes",
    grind: "Medium-Fine",
    ratio: "1:15 (17g coffee to 250g water)",
    equipment: ["AeroPress", "Paper filter", "Kettle", "Kitchen scale"],
    description:
      "Immersion and pressure in one small device. Fast, near-indestructible, and the one we pack when we travel.",
    image: images.brewAeropress,
    steps: [
      { title: "Rinse and assemble", body: "Rinse the filter, attach the cap, and set on top of your cup or carafe." },
      { title: "Add coffee and water", body: "Add grounds, pour in water, and stir for 10 seconds." },
      { title: "Steep", body: "Let sit for 1 minute before attaching the plunger." },
      { title: "Press", body: "Press down slowly and evenly over 20–30 seconds until you hear a hiss." },
      { title: "Dilute if needed", body: "Cut with hot water to taste if brewing at full strength." },
    ],
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
    readTime: "5 min read",
    author: "Memberridge Roasting Team",
    image: images.farmOrigin3,
    body: [
      "It's become shorthand in specialty coffee marketing: higher altitude, better coffee. The truth is more specific, and more interesting.",
      "Coffee cherries grown at higher elevations mature more slowly, largely because cooler temperatures slow the plant's metabolic processes. That extended maturation gives the cherry more time to develop sugars, which is where the added complexity and sweetness in high-grown coffee actually comes from — not the altitude itself, but the time it buys.",
      "Slower maturation also produces a denser bean. Density matters at the roasting stage: denser beans absorb heat differently and can handle a slightly longer roast without scorching, which gives roasters more room to develop flavor before hitting the point of bitterness.",
      "But altitude isn't a flavor guarantee on its own. A coffee grown at 2,000 meters with poor processing will lose to a well-processed coffee grown at 1,400 meters every time. We treat altitude as one input among several — alongside variety, processing, and the skill of the producer — rather than a single number that predicts quality.",
      "That's why our spec sheets list altitude range alongside variety and process, not instead of them. Context matters more than any single figure.",
    ],
  },
  {
    slug: "washed-vs-natural-process",
    title: "Washed vs. Natural: Reading a Process Note Like a Menu",
    excerpt:
      "The processing method on a bag tells you more about the flavor you're about to taste than the roast date does. Here's how to read it.",
    category: "Education",
    date: "2026-06-28",
    readTime: "4 min read",
    author: "Memberridge Roasting Team",
    image: images.storyBeans,
    body: [
      "Processing is the step between picking a coffee cherry and having a green bean ready to roast. It happens well before the coffee reaches us, but it shapes the cup more than almost any other variable — including, often, the roast itself.",
      "Washed process removes the fruit from the bean before drying, using water to ferment off the mucilage layer. The result is a cleaner, brighter cup where the bean's inherent characteristics — acidity, varietal character — come through with clarity. This is the process behind most of what people picture when they imagine a classic bright, tea-like specialty coffee.",
      "Natural process leaves the whole cherry intact through drying, letting the bean absorb sugars and flavor compounds from the fruit around it as it dries over one to three weeks. The result is a heavier body, pronounced fruit-forward sweetness, and sometimes a winey or fermented note, depending on how the drying was managed.",
      "Honey process sits between the two: the skin is removed but some or all of the sticky mucilage is left on during drying, producing a body and sweetness between washed and natural, with variation depending on how much mucilage was left ('yellow', 'red', or 'black' honey, roughly in ascending order of mucilage retained).",
      "None of these is objectively better — they're different tools for different results. When you're choosing a bag, process is often a better predictor of what you'll taste than roast level alone.",
    ],
  },
  {
    slug: "why-we-pay-above-composite",
    title: "Why We Pay Above the Composite Price, Every Harvest",
    excerpt:
      "The commodity price and a fair price for quality coffee are two different numbers. Here's how we think about the gap.",
    category: "Sourcing",
    date: "2026-06-02",
    readTime: "6 min read",
    author: "Memberridge Sourcing Team",
    image: images.storyHands,
    body: [
      "The 'C price' — the commodity market price for arabica coffee — is the number most farmers are offered by default. It's set by futures trading in New York, and it has almost nothing to do with the quality of any individual farmer's harvest.",
      "That disconnect is a problem. A farmer who invests in careful picking, meticulous processing, and lower yields per hectare to grow better coffee is, under a composite pricing model, paid the same as a farmer who doesn't. There's no financial incentive to do the harder, better work.",
      "We negotiate a price above the regional composite for every lot we buy, tied to cup quality rather than volume. In practice, that means our buying decisions happen at the cupping table first and the spreadsheet second — we taste a lot, score it, and set a price that reflects that score relative to the composite, not a flat markup.",
      "This isn't philanthropy — it's how we keep access to the lots we actually want. The farms producing coffee we're excited to roast have other buyers competing for their harvest, often including buyers willing to pay well above composite themselves. Paying fairly is table stakes for a long-term relationship, not a bonus feature.",
      "We publish the story behind the coffees we can, not because it's required, but because a price that shows up as a single number in a spec sheet is more honest if you know where it came from.",
    ],
  },
  {
    slug: "grind-size-mistakes",
    title: "The Grind Size Mistake Almost Everyone Makes",
    excerpt:
      "If your coffee tastes bitter one day and sour the next from the same bag, the problem probably isn't the coffee — it's the grind.",
    category: "Brewing",
    date: "2026-05-19",
    readTime: "4 min read",
    author: "Memberridge Roasting Team",
    image: images.brewPourOver,
    body: [
      "Grind size is the single biggest lever you have over how your coffee tastes, and it's the one most home brewers touch the least.",
      "Extraction — pulling flavor compounds out of ground coffee with water — happens fastest at the surface of each particle. Finer grinds have more surface area relative to volume, which means they extract faster. Coarser grinds extract slower. Every brew method is built around a target extraction time, and grind size is how you hit it.",
      "The most common mistake is using one grind setting for everything. A grind that's correct for a 3-minute pour over will under-extract in a 25-second espresso shot (sour, thin) and over-extract in a 4-hour cold brew steep if you're not adjusting for the longer contact time (though cold brew's cold water partially compensates).",
      "If your coffee tastes sour or weak, grind finer. If it tastes bitter or harsh, grind coarser. Change one variable at a time, and taste before you change anything else — ratio, water temperature, and brew time all matter, but grind size is where we'd tell you to start troubleshooting first.",
    ],
  },
  {
    slug: "storing-coffee-at-home",
    title: "How to Actually Store Coffee at Home",
    excerpt:
      "The bag your coffee shipped in is doing more work than you think — and most of the accessories sold to 'improve' storage make things worse.",
    category: "Brewing",
    date: "2026-04-30",
    readTime: "3 min read",
    author: "Memberridge Roasting Team",
    image: images.productFlatLay,
    body: [
      "Coffee's four enemies are oxygen, light, heat, and moisture. Good storage is just minimizing exposure to all four for as long as possible.",
      "Our bags use a one-way valve that lets CO2 escape during degassing without letting oxygen back in — which is why we recommend keeping coffee in the original bag, folded or clipped shut, rather than transferring it to a new container. Every transfer is a chance to introduce oxygen and lose the valve's benefit.",
      "Skip the refrigerator. Coffee is porous and absorbs odors readily, and the temperature cycling every time you open the fridge introduces condensation risk. Room temperature, away from direct sunlight and your stove, is the right environment.",
      "Buy less, more often. The single biggest factor in how your coffee tastes is how long it's been off the roast, not how it's stored in the meantime. We'd rather you buy a 250g bag every two weeks than a 1kg bag every two months.",
    ],
  },
];

export const locations = [
  {
    slug: "portland-flagship",
    name: "Portland Flagship & Roastery",
    address: "214 Ridge Street, Portland, OR 97209",
    phone: "(503) 555-0142",
    hours: [
      { days: "Monday – Friday", time: "7:00 AM – 6:00 PM" },
      { days: "Saturday – Sunday", time: "8:00 AM – 6:00 PM" },
    ],
    description:
      "Our original roastery and flagship café, where every lot is roasted, cupped, and packed on-site.",
    image: images.cafeInterior,
  },
  {
    slug: "seattle-capitol-hill",
    name: "Seattle — Capitol Hill",
    address: "1188 Pike Avenue, Seattle, WA 98122",
    phone: "(206) 555-0198",
    hours: [
      { days: "Monday – Friday", time: "6:30 AM – 6:00 PM" },
      { days: "Saturday – Sunday", time: "7:30 AM – 6:00 PM" },
    ],
    description:
      "A full espresso bar and pour-over station in the heart of Capitol Hill, with weekly cupping sessions open to the public.",
    image: images.espressoPull,
  },
  {
    slug: "san-francisco-hayes-valley",
    name: "San Francisco — Hayes Valley",
    address: "420 Hayes Street, San Francisco, CA 94102",
    phone: "(415) 555-0176",
    hours: [
      { days: "Monday – Friday", time: "7:00 AM – 5:00 PM" },
      { days: "Saturday – Sunday", time: "8:00 AM – 5:00 PM" },
    ],
    description:
      "Our newest location, focused on single-origin filter coffee and a rotating guest roaster program.",
    image: images.baristaPour,
  },
];

export const faqCategories = [
  {
    category: "Ordering & Shipping",
    questions: [
      {
        q: "How fresh is the coffee when it ships?",
        a: "Every order is roasted to order and ships within two business days of roasting. We print the roast date on every bag, so you always know exactly how fresh it is.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard shipping within the continental US takes 3–5 business days after your order ships. Express shipping (1–2 business days) is available at checkout.",
      },
      {
        q: "Do you ship internationally?",
        a: "Not yet — we currently ship within the United States only. We're evaluating international shipping and will announce it in the Journal when it's available.",
      },
      {
        q: "Can I change or cancel an order after placing it?",
        a: "Since roasting begins shortly after your order comes in, we can only accommodate changes within 2 hours of purchase. Contact us right away and we'll do what we can.",
      },
    ],
  },
  {
    category: "Subscriptions",
    questions: [
      {
        q: "How much do I save with a subscription?",
        a: "Most subscription coffees are discounted up to 10% off single-purchase pricing, applied automatically to every delivery.",
      },
      {
        q: "Can I change my coffee, size, or frequency later?",
        a: "Yes — subscriptions can be edited, paused, or canceled anytime from your account with no fees or minimum commitment.",
      },
      {
        q: "What happens if I need to skip a delivery?",
        a: "You can skip any upcoming delivery from your account up to 48 hours before it ships, with no penalty.",
      },
    ],
  },
  {
    category: "Brewing & Storage",
    questions: [
      {
        q: "What grind size should I choose?",
        a: "Select the grind option that matches your brew method at checkout — we grind to order. If you're unsure, our Brewing Guides walk through the right grind for each method.",
      },
      {
        q: "How should I store my coffee?",
        a: "Keep it in the original bag, sealed, at room temperature, away from direct light and heat. Avoid the refrigerator or freezer — condensation does more harm than good.",
      },
      {
        q: "How long does coffee stay fresh after opening?",
        a: "Flavor is best within 2–3 weeks of the roast date. We recommend buying only what you'll use in that window rather than stocking up.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What's your return policy?",
        a: "Because coffee is perishable, we don't accept returns on opened bags. If something arrived damaged or incorrect, contact us within 14 days and we'll make it right.",
      },
      {
        q: "My order arrived damaged — what do I do?",
        a: "Email us a photo of the damaged item at hello@memberridgecoffee.com and we'll send a replacement or refund, no questions asked.",
      },
    ],
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
