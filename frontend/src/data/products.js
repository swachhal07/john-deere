// Product catalogue for John Deere Nepal.
// Imagery uses Unsplash agricultural/machinery photography as placeholders —
// swap `image` URLs for official John Deere brand assets before launch.

export const products = [
  {
    id: '5e-series',
    name: '5E Series Tractor',
    category: 'Tractors',
    power: '45–75 HP',
    tagline: 'The backbone of the Nepali farm.',
    description:
      'Built for terraced fields and tight orchards alike. The 5E balances raw pulling power with the agility small and mid-size holdings demand.',
    image:
      'https://images.unsplash.com/photo-1591741535018-d042766c62eb?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'Engine', value: '3-cyl turbocharged' },
      { label: 'Transmission', value: '9F + 3R Collarshift' },
      { label: 'Lift capacity', value: '2,000 kg' },
    ],
  },
  {
    id: '5d-series',
    name: '5D Series Tractor',
    category: 'Tractors',
    power: '36–55 HP',
    tagline: 'Reliable economy, day after day.',
    description:
      'Low running costs, simple maintenance and proven durability — the workhorse chosen by thousands of Nepali farmers.',
    image:
      'https://images.unsplash.com/photo-1605338803155-8b46c2a9f8e0?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'Engine', value: '3-cyl diesel' },
      { label: 'Transmission', value: '8F + 2R' },
      { label: 'Fuel tank', value: '60 L' },
    ],
  },
  {
    id: 'w70-harvester',
    name: 'W70 Combine Harvester',
    category: 'Harvesters',
    power: '75 HP',
    tagline: 'Bring the harvest home, faster.',
    description:
      'Compact combine engineered for paddy and wheat across Nepal’s Terai belt. High throughput with minimal grain loss.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'Cutting width', value: '2.0 m' },
      { label: 'Grain tank', value: '1,400 L' },
      { label: 'Threshing', value: 'Tangential + axial' },
    ],
  },
  {
    id: 'rotary-tiller',
    name: 'Rotary Tiller',
    category: 'Implements',
    power: 'PTO driven',
    tagline: 'Seedbed-ready in a single pass.',
    description:
      'Pulverises and levels soil in one go, cutting preparation time dramatically. Matched precisely to John Deere tractor PTOs.',
    image:
      'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'Working width', value: '1.25–1.75 m' },
      { label: 'Blades', value: '36–54 L-type' },
      { label: 'Gearbox', value: 'Multi-speed' },
    ],
  },
  {
    id: 'disc-plough',
    name: 'Disc Plough',
    category: 'Implements',
    power: 'Mounted',
    tagline: 'Break the toughest ground.',
    description:
      'Cuts cleanly through hard, dry and root-bound soils where conventional ploughs stall. Built for Nepal’s varied terrain.',
    image:
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'Discs', value: '2 / 3 furrow' },
      { label: 'Disc size', value: '26 in' },
      { label: 'Penetration', value: 'High-clearance' },
    ],
  },
  {
    id: 'seed-drill',
    name: 'Seed Drill',
    category: 'Implements',
    power: 'Mounted',
    tagline: 'Precision sowing, even rows.',
    description:
      'Accurate seed and fertiliser placement for higher germination and uniform crops. Less waste, stronger yields.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'Rows', value: '9 / 11 / 13' },
      { label: 'Metering', value: 'Fluted roller' },
      { label: 'Hopper', value: 'Seed + fertiliser' },
    ],
  },
]

export const categories = ['All', 'Tractors', 'Harvesters', 'Implements']
