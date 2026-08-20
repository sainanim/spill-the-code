import type { OfferingBase } from "./offerings";

// Blix kits sold through the shop. These resolve through the same
// getOfferingById() registry as courses and camps, because the checkout API
// re-prices every cart line from that registry server-side and rejects the
// whole order if an id doesn't resolve. A product that only existed in the
// shop page's own state would add to the cart fine and then fail at checkout.
export interface ProductOffering extends OfferingBase {
  category: "product";
  description: string;
  parts: string[];
  // Derived, not authored - see the mapping at the bottom of this file.
  slug: string;
  images: string[];
  // Thumbnail for the shop grid; always images[0].
  imagePath: string;
}

// Source of truth: "Blix Website Catalogue.xlsx". Each entry carries only the
// four authored attributes — id, category and shortLabel are derived below so
// there is nothing to keep in sync by hand.
interface CatalogueEntry {
  title: string;
  priceCents: number;
  description: string;
  parts: string[];
}

const CATALOGUE: CatalogueEntry[] = [
  {
    title: "Amusement Park",
    priceCents: 11198,
    description:
      "Build your own theme park on the living room floor. Seven motorized rides — modeled on real park attractions — come together from 340+ parts, and the spare wheels and connectors mean the building never has to stop at seven.",
    parts: [
      "340+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "2.4GHz Transmitter (Controller) & Receiver",
      "3V Battery Box",
      "DC Motor",
    ],
  },
  {
    title: "Minis: Bike",
    priceCents: 1243,
    description:
      "Start small and finish fast. Blix Minis Bike snaps together into a detailed little motorcycle in minutes \u2014 the perfect quick hit of building for an afternoon that has time to spare.",
    parts: ["45+ Premium Blix Building Parts", "Step-By-Step Instruction Manual"],
  },
  {
    title: "Minis: Ferris Wheel",
    priceCents: 1243,
    description:
      "A Ferris wheel is fun to ride and even better to build. Assemble your own, give the lever a turn to set it spinning, then leave it out on a shelf \u2014 it earns the space.",
    parts: ["50+ Premium Blix Building Parts", "Step-By-Step Instruction Manual"],
  },
  {
    title: "Minis: Disco Bot",
    priceCents: 1243,
    description:
      "The smallest dancer in the Blix lineup. Turn the lever and Disco Bot springs into a goofy little routine that keeps going for as long as you keep cranking.",
    parts: ["35+ Premium Blix Building Parts", "Step-By-Step Instruction Manual"],
  },
  {
    title: "Boffin AI/ML",
    priceCents: 33596,
    description:
      "Real artificial intelligence, assembled by hand. Kids build systems that use computer vision and machine learning to recognize objects, tell living things from non-living, and swing a robotic arm on voice command — turning abstract AI into something they can watch make decisions.",
    parts: [
      "120+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "DC Motor Board",
      "DC Motor",
      "ESP Board",
      "Limit Switch",
      "IR Sensor",
      "6V Battery Box",
      "Programming Cable",
      "Servo Motor",
      "Mudguards",
    ],
  },
  {
    title: "Buddy",
    priceCents: 2764,
    description:
      "A waving robot, a trotting horse, and plenty more besides. Blix Buddy turns 61 parts into a run of builds that put motion front and center, so kids can see exactly which mechanism is doing the work each time.",
    parts: ["61 Premium Blix Building Parts", "Step-By-Step Instruction Manual"],
  },
  {
    title: "Build A Machine",
    priceCents: 3732,
    description:
      "Seven builds drawn straight from the machines that run the real world. Kids assemble each one, work out why it moves the way it does, and walk away with problem-solving instincts that outlast the kit.",
    parts: [
      "70+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "Wheels",
      "Powered Screw",
    ],
  },
  {
    title: "Crawlers",
    priceCents: 4838,
    description:
      "Walking looks simple right up until you have to engineer it. Build two-legged and four-legged crawlers, then watch gears and linkages cooperate to produce a stride — the same problem engineers solve to make robots walk.",
    parts: [
      "70+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "DC Motor",
      "3V Battery Box",
    ],
  },
  {
    title: "Forklift",
    priceCents: 4976,
    description:
      "The machine that keeps every warehouse moving, shrunk to tabletop scale. The lift genuinely works, and cranking it teaches rack-and-pinion mechanics far better than any diagram could.",
    parts: ["185+ Premium Blix Building Parts", "Step-By-Step Instruction Manual"],
  },
  {
    title: "Forklift Power",
    priceCents: 7465,
    description:
      "The warehouse workhorse, now under motor power. Kids build a working lift and watch electricity become genuine mechanical muscle, hauling and stacking just like the industrial machine it's modeled on.",
    parts: [
      "180+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "3V Battery Box",
      "DC Motor",
    ],
  },
  {
    title: "Gear Box",
    priceCents: 6773,
    description:
      "Gears are how machines share their strength. Assemble the box, watch the teeth mesh, then change the ratio and feel power and speed trade places — arguably the most useful mechanical idea a kid can hold in their hands.",
    parts: [
      "100+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "DC Motor",
      "3V Battery Box",
    ],
  },
  {
    title: "Junior",
    priceCents: 7603,
    description:
      "Kit, Laya, and their robot Rob need help crossing crocodile rivers and pulling off jungle rescues. Every mission hides a real concept — aerodynamics, scissor mechanisms, algorithms, codes — folded so neatly into the story that kids never notice they're learning.",
    parts: [
      "90+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "Mudguards",
      "Suspension",
      "Wheels",
    ],
  },
  {
    title: "Marble Run 2",
    priceCents: 10507,
    description:
      "A marble run where the marbles never stop. A motor carries them back to the top while pillars, curves, and slopes let kids build 4 different courses — then tear them down and engineer a faster one.",
    parts: [
      "220+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "Special Marble Run Parts",
      "DC Motor",
      "3V Battery Box",
      "Stencil Sheets",
      "Tracks",
      "Marbles",
    ],
  },
  {
    title: "Power Screw",
    priceCents: 7880,
    description:
      "Seven working machines, including a dumper truck, a scissor lift, and a pressing machine. Each shows how a power screw converts spin into lift and push, and 200+ versatile parts keep the inventing going long after the manual runs out.",
    parts: [
      "200+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "3V Battery Box",
      "DC Motor",
    ],
  },
  {
    title: "Queaky",
    priceCents: 3040,
    description:
      "Everything kids already love about Queaky, now rechargeable. Turn any household object into an instrument or set up the perfect harmless prank — with no batteries to hunt down mid-mischief.",
    // TODO: the catalogue spreadsheet lists no parts for this kit. Renders as
    // no "What's Inside?" section until one is supplied.
    parts: [],
  },
  {
    title: "Rc Explorers",
    priceCents: 11198,
    description:
      "Build it, drive it, take it apart, build something else. A 2.4GHz remote and 120+ parts yield 6+ different robots, and every one of them handles a little differently once you get it moving.",
    parts: [
      "120+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "2.4GHz Transmitter (Controller) & Receiver",
      "6V Battery Box",
      "DC Motor",
    ],
  },
  {
    title: "Rc Mega Structures",
    priceCents: 26130,
    description:
      "Heavy machinery is fascinating from a distance and far better from the inside. 750+ pieces and a 2.4GHz remote let kids build and operate 8 industrial giants, watching the mechanisms behind real megastructures work up close.",
    parts: [
      "750+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "2.4GHz Transmitter & Receiver",
      "6V Battery Box",
      "DC Motor",
      "Thread and Hook",
    ],
  },
  {
    title: "Rc Rover",
    priceCents: 11198,
    description:
      "Tracks, sprockets, and a 2.4GHz remote add up to 5 builds that go where wheels can't. Kids drive their creation over obstacles and up inclines, picking up exactly what makes a tracked machine climb.",
    parts: [
      "180+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "5V Rechargeable Battery Box",
      "Bot Face 2.4GHz Receiver",
      "2.4GHz Transmitter (Controller)",
      "DC Motor",
    ],
  },
  {
    title: "Rover",
    priceCents: 5253,
    description:
      "A dedicated track system, 4 models, and terrain to conquer. Kids build a motorized rover out of tracks and sprockets, then send it rolling and climbing over whatever they put in its way.",
    parts: [
      "150+ Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "5V Rechargeable Battery Box",
      "DC Motor",
      "Bot Face",
    ],
  },
  {
    title: "Discovering Motions",
    priceCents: 13134,
    description:
      "Some ideas only click once you can watch them move. 176 parts build working models of the mechanisms hiding inside everyday machines, turning abstract physics into something kids can crank, observe, and finally understand.",
    parts: [
      "176 Premium Blix Building Parts",
      "Step-By-Step Instruction Manual",
      "DC Motor",
      "3V Battery Box",
    ],
  },
  // "Boffin Starter" has a flyer in public/Blix and a row in the catalogue
  // spreadsheet, but is discontinued and deliberately not sold here.
];

// Ids are derived from the title and are the only thing the cart persists, so
// editing a title changes the id and silently drops that kit from any cart
// already saved in a customer's browser. Rename with that in mind.
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Every product photo, keyed by slug. The first entry is the hero: it is what
// the shop grid shows as the thumbnail and what the detail gallery opens on,
// so reordering this list changes the thumbnail. Filenames are listed verbatim
// because the supplied ones don't follow a single convention.
const GALLERY: Record<string, string[]> = {
  "amusement-park": [
    "/Blix/products/amusement-park.webp",
    "/Blix/products/Amusement_Park_1.webp",
    "/Blix/products/Amusement_Park_2.webp",
  ],
  "boffin-ai-ml": [
    "/Blix/products/boffin-ai-ml.webp",
  ],
  buddy: [
    "/Blix/products/blix_buddy_3.webp",
    "/Blix/products/blix_buddy.webp",
    "/Blix/products/blix_buddy_1.webp",
    "/Blix/products/blix_buddy_2.webp",
    "/Blix/products/buddy_4.webp",
    "/Blix/products/buddy.webp",
  ],
  "build-a-machine": [
    "/Blix/products/build-a-machine.webp",
    "/Blix/products/Build-a-machine1.webp",
    "/Blix/products/Build-a-machine4.webp",
    "/Blix/products/Build-a-machine5.webp",
  ],
  crawlers: [
    "/Blix/products/crawlers.webp",
  ],
  "discovering-motions": [
    "/Blix/products/discovering-motions.webp",
  ],
  forklift: [
    "/Blix/products/forklift.webp",
    "/Blix/products/Blix_Forklift_Adjustable_Bed.webp",
    "/Blix/products/Blix_Forklift_Horizontal_Gate.webp",
    "/Blix/products/Blix_Forklift_Stacker.webp",
    "/Blix/products/Blix_Forklift_Steering_Car.webp",
  ],
  "forklift-power": [
    "/Blix/products/forklift-power.webp",
    "/Blix/products/Blix_Forklift_Power_1.webp",
    "/Blix/products/Blix_Forklift_Power_Adjustable_Bed.webp",
    "/Blix/products/Blix_Forklift_Power_Horizontal_Gate.avif",
    "/Blix/products/Blix_Forklift_Power_Stacker.avif",
  ],
  "gear-box": [
    "/Blix/products/gear-box.webp",
    "/Blix/products/Gear_box_1.webp",
    "/Blix/products/Gear_box_3.webp",
  ],
  junior: [
    "/Blix/products/junior.webp",
  ],
  "marble-run-2": [
    "/Blix/products/marble-run-2.webp",
    "/Blix/products/Marble_Run_2_With_Tracks_2.webp",
    "/Blix/products/Marble_Run_2_With_Tracks_3.webp",
    "/Blix/products/Marble_Run_2_With_Tracks_4.webp",
  ],
  "minis-bike": [
    "/Blix/products/Blix_Minis_Bike_Box.webp",
  ],
  "minis-disco-bot": [
    "/Blix/products/Blix_Minis_Disco_Bot.webp",
    "/Blix/products/minis.webp",
  ],
  "minis-ferris-wheel": [
    "/Blix/products/Blix_Minis_Ferris_Wheel.webp",
  ],
  "power-screw": [
    "/Blix/products/power-screw.webp",
    "/Blix/products/power-screw_3.webp",
    "/Blix/products/power-screw_4.webp",
    "/Blix/products/power-screw_5.webp",
  ],
  queaky: [
    "/Blix/products/queaky.webp",
    "/Blix/products/BlixQueakyCharge-Goofy.webp",
    "/Blix/products/BlixQueakyCharge-Sleepy1.webp",
    "/Blix/products/QueakyCharge-Flirty.webp",
    "/Blix/products/QueakyCharge-Happy.avif",
  ],
  "rc-explorers": [
    "/Blix/products/rc-explorers.webp",
    "/Blix/products/Blix_RC_Explorers.webp",
    "/Blix/products/Blix_RC_Explorers_1.webp",
  ],
  "rc-mega-structures": [
    "/Blix/products/rc-mega-structures.webp",
    "/Blix/products/Rc_Megastructure_1.webp",
    "/Blix/products/Rc_Megastructure_3.webp",
    "/Blix/products/Rc_Megastructure_4.webp",
  ],
  "rc-rover": [
    "/Blix/products/rc-rover.webp",
    "/Blix/products/Blix_RC_Rover_2.webp",
    "/Blix/products/Blix_RC_Rover_3.webp",
    "/Blix/products/Blix_RC_Rover_4.webp",
  ],
  rover: [
    "/Blix/products/rover.webp",
    "/Blix/products/Blix_Rover_2.webp",
    "/Blix/products/Blix_Rover_3.webp",
    "/Blix/products/Blix_Rover_4.webp",
  ],
};

export const PRODUCT_OFFERINGS: ProductOffering[] = CATALOGUE.map((entry) => {
  const slug = slugify(entry.title);
  // Falls back to the single hero cut-out extracted from the flyer PDF.
  // Every kit is listed in GALLERY; the fallback only guards a new catalogue
  // entry added before its photos land.
  const images = GALLERY[slug] ?? [`/Blix/products/${slug}.webp`];
  return {
    ...entry,
    slug,
    id: `product-${slug}`,
    category: "product",
    shortLabel: entry.title,
    images,
    imagePath: images[0],
  };
});

const PRODUCTS_BY_SLUG = new Map(PRODUCT_OFFERINGS.map((p) => [p.slug, p]));

export function getProductBySlug(slug: string): ProductOffering | undefined {
  return PRODUCTS_BY_SLUG.get(slug);
}
