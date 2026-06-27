// John Deere Nepal — 5-Series tractor line-up sold by MV Dugar.

import img5075e from '../assets/5075e-4wd-trem- iv-001-5053.avif'
import img5405e from '../assets/john-deere-5405-tractor-termiv.jpeg'
import img5310mfwd from '../assets/john_deere_india_trem4_5310_right_angle_large_1a5dd6f40ebd3c6aac80321ed0a29f52e44dbe57.avif'
import img5310e from '../assets/john_deere_india_trem4_5310_right_angle_large_1a5dd6f40ebd3c6aac80321ed0a29f52e44dbe57 (1)e.avif'
import img5050d from '../assets/5050d_large_cc106457ecc18698f1788e23df3db14e776405e7.avif'
import img5045dfwd from '../assets/john-deere-india-d-series-tractors 5045d.avif'
import img5045dreverse from '../assets/5045d_2_large_0a647ddeee97819a6d9e43032dd85cd18689a8ed.avif'
import img5045ddual from '../assets/tractor_5045d_campo1_large_ed2760b5297c0960b3c8543d2fb4cf487019a06f.avif'
import img5045dsingle from '../assets/tractor_5045d_campo2_large_b2f5baf37a5e6bc74a95606328e3374bf00488db.avif'
import img5036d from '../assets/7469975a-e360-4d06-af81-0062afa6bae3-small-New Project (1).webp'

export const products = [
  {
    id: '5075e-mfwd',
    name: '5075E',
    trim: 'MFWD',
    hp: 75,
    drive: 'MFWD',
    clutch: 'Dual',
    tagline: 'Top of the line. EQRL hydraulics, dual PTO, sync shuttle.',
    description:
      'The flagship of the 5-Series. Sync shuttle transmission, EQRL rockshaft with Go-Home and 5-in-1 MFD make this the tractor to reach for when the work-day is long and the loads are heavy.',
    image: img5075e,
    features: [
      'Dual clutch',
      'MFWD paddy-sealed',
      'Sync shuttle (TSS)',
      'Tilt steering',
      'Dual PTO',
      'JD EQRL rockshaft',
      'Single SCV',
      'ROPS · 5-in-1 MFD',
      'Arm-rest seat',
      'In-line FIP · Heater',
    ],
    specs: [
      { label: 'Power', value: '75 HP' },
      { label: 'Drive', value: 'MFWD' },
      { label: 'Transmission', value: 'Sync shuttle' },
      { label: 'Front tire', value: '12.4×24 / 18.4×30' },
    ],
  },
  {
    id: '5405e-mfwd',
    name: '5405E',
    trim: 'MFWD',
    hp: 63,
    drive: 'MFWD',
    clutch: 'Dual',
    tagline: '12×4 speed, deluxe seat, paddy-sealed MFWD.',
    description:
      '63 HP of refined cabin comfort. Deluxe seat, 5-in-1 cluster display and an air pre-heater make long Terai sessions noticeably easier on the operator.',
    image: img5405e,
    features: [
      'Dual clutch',
      'MFWD paddy-sealed',
      '12×4 speed',
      'Collar shift',
      'Tilt steering',
      'Dual PTO',
      'Single SCV',
      'JD Standard rockshaft',
      'Deluxe seat',
      'Sway bar · Air pre-heater',
    ],
    specs: [
      { label: 'Power', value: '63 HP' },
      { label: 'Drive', value: 'MFWD' },
      { label: 'Transmission', value: '12×4 collar shift' },
      { label: 'Front tire', value: '11.2×24 / 16.9×30' },
    ],
  },
  {
    id: '5310-mfwd',
    name: '5310',
    trim: 'MFWD',
    hp: 55,
    drive: 'MFWD',
    clutch: 'Dual',
    tagline: '55 HP MFWD muscle with paddy-sealed transmission.',
    description:
      'Built for the rice belt. Hydraulic steering, paddy-sealed MFWD axle and the proven JD Standard rockshaft handle puddled fields and heavy implements without complaint.',
    image: img5310mfwd,
    features: [
      'Dual clutch',
      'MFWD paddy-sealed',
      'Collar shift',
      'Hydraulic steering',
      'Single SCV',
      'Standard PTO',
      'JD Standard rockshaft',
      'Standard seat',
      'Standard display',
    ],
    specs: [
      { label: 'Power', value: '55 HP' },
      { label: 'Drive', value: 'MFWD' },
      { label: 'Transmission', value: 'Collar shift' },
      { label: 'Front tire', value: '9.5×24 / 16.9×28' },
    ],
  },
  {
    id: '5310-e',
    name: '5310',
    trim: 'E',
    hp: 55,
    drive: '2WD',
    clutch: 'Dual',
    tagline: '55 HP 2WD with reverse PTO for puddling and rotavating.',
    description:
      'Reverse PTO is the headline — it turns the 5310 E into a serious puddling and rotavating tractor. 4-pinion oiled rear axle for durability through the wet season.',
    image: img5310e,
    features: [
      'Dual clutch',
      '2WD fixed-track axle',
      'Oiled 4-pinion rear',
      'Collar shift',
      'Open op. station',
      'Hydraulic steering',
      'Reverse PTO',
      'JD MQRL rockshaft',
      'Heater',
    ],
    specs: [
      { label: 'Power', value: '55 HP' },
      { label: 'Drive', value: '2WD' },
      { label: 'PTO', value: 'Reverse' },
      { label: 'Front tire', value: '6.5×20 / 16.9×28' },
    ],
  },
  {
    id: '5050d',
    name: '5050D',
    trim: null,
    hp: 50,
    drive: '2WD',
    clutch: 'Single',
    tagline: '50 HP 2WD economy. Naturally aspirated, easy to service.',
    description:
      'A dependable workhorse. Naturally aspirated, single-clutch and the MITA Standard rockshaft keep parts simple and repairs quick — a favourite of farmer cooperatives.',
    image: img5050d,
    features: [
      'Single clutch',
      '2WD fixed-track axle',
      'Oiled rear axle',
      'Collar shift',
      'Open op. station',
      'Hydraulic steering',
      'Standard PTO',
      'MITA Standard rockshaft',
      'Naturally aspirated',
    ],
    specs: [
      { label: 'Power', value: '50 HP' },
      { label: 'Drive', value: '2WD' },
      { label: 'Engine', value: 'Naturally aspirated' },
      { label: 'Front tire', value: '7.5×16 / 16.9×28' },
    ],
  },
  {
    id: '5045dfwd',
    name: '5045D',
    trim: 'FWD',
    hp: 45,
    drive: 'MFWD',
    clutch: 'Dual',
    tagline: '45 HP MFWD with dual PTO and JD MQRL rockshaft.',
    description:
      'The compact end of MFWD. Paddy-sealed front axle and dual PTO let it punch above its weight on rotavators and heavy puddlers in tight plots.',
    image: img5045dfwd,
    features: [
      'Dual clutch',
      'MFWD paddy-sealed',
      'Oiled 2-pinion rear',
      'Collar shift',
      'Open op. station',
      'Hydraulic steering',
      'Dual PTO',
      'JD MQRL rockshaft',
    ],
    specs: [
      { label: 'Power', value: '45 HP' },
      { label: 'Drive', value: 'MFWD' },
      { label: 'PTO', value: 'Dual' },
      { label: 'Front tire', value: '8×18 / 14.9×28' },
    ],
  },
  {
    id: '5045d-reverse-pto',
    name: '5045D',
    trim: 'Reverse PTO',
    hp: 46,
    drive: '2WD',
    clutch: 'Dual',
    tagline: '46 HP 2WD with reverse PTO — puddling specialist.',
    description:
      'Reverse PTO meets a dual clutch and JD MQRL hitch. Built for the operator who spends most of the season behind a rotavator in flooded paddies.',
    image: img5045dreverse,
    features: [
      'Dual clutch',
      'Reverse PTO',
      '2WD fixed-track axle',
      'Oiled rear axle',
      'Collar shift',
      'Hydraulic steering',
      'Dual PTO',
      'JD MQRL rockshaft',
    ],
    specs: [
      { label: 'Power', value: '46 HP' },
      { label: 'Drive', value: '2WD' },
      { label: 'PTO', value: 'Reverse + Dual' },
      { label: 'Front tire', value: '6.0×16 / 14.9×28' },
    ],
  },
  {
    id: '5045d-dual-clutch',
    name: '5045D',
    trim: 'Dual Clutch',
    hp: 46,
    drive: '2WD',
    clutch: 'Dual',
    tagline: '46 HP 2WD with dual PTO and MQRL hitch.',
    description:
      'The mid-tier 5045D. Dual clutch and dual PTO bring smoother implement work, while the JD MQRL hitch keeps lift action precise.',
    image: img5045ddual,
    features: [
      'Dual clutch',
      '2WD fixed-track axle',
      'Oiled rear axle',
      'Collar shift',
      'Hydraulic steering',
      'Dual PTO',
      'JD MQRL rockshaft',
    ],
    specs: [
      { label: 'Power', value: '46 HP' },
      { label: 'Drive', value: '2WD' },
      { label: 'PTO', value: 'Dual' },
      { label: 'Front tire', value: '6.0×16 / 14.9×28' },
    ],
  },
  {
    id: '5045d-single-clutch',
    name: '5045D',
    trim: 'Single Clutch',
    hp: 46,
    drive: '2WD',
    clutch: 'Single',
    tagline: '46 HP 2WD entry build with MITA rockshaft.',
    description:
      'Simplest 5045D in the line-up. Single clutch, MITA Standard rockshaft and standard PTO — the lowest cost of ownership entry to the 46 HP class.',
    image: img5045dsingle,
    features: [
      'Single clutch',
      '2WD fixed-track axle',
      'Oiled rear axle',
      'Collar shift',
      'Hydraulic steering',
      'Standard PTO',
      'MITA Standard rockshaft',
    ],
    specs: [
      { label: 'Power', value: '46 HP' },
      { label: 'Drive', value: '2WD' },
      { label: 'Clutch', value: 'Single' },
      { label: 'Front tire', value: '6.0×16 / 14.9×28' },
    ],
  },
  {
    id: '5036d',
    name: '5036D',
    trim: null,
    hp: 36,
    drive: '2WD',
    clutch: 'Single',
    tagline: 'Entry-point 5-Series. 36 HP built simple, built to last.',
    description:
      'The most accessible 5-Series. Light enough for terraced fields, simple enough to service anywhere in Nepal, and built on the same chassis logic as its bigger siblings.',
    image: img5036d,
    features: [
      'Single clutch',
      '2WD fixed-track axle',
      'Oiled rear axle',
      'Collar shift',
      'Open op. station',
      'Hydraulic steering',
      'Standard PTO',
      'MITA Standard rockshaft',
      'LH-traffic headlights',
    ],
    specs: [
      { label: 'Power', value: '36 HP' },
      { label: 'Drive', value: '2WD' },
      { label: 'Clutch', value: 'Single' },
      { label: 'Front tire', value: '6.0×16 / 13.6×28' },
    ],
  },
]

export const categories = ['All', 'MFWD', '2WD', 'Dual Clutch', 'Single Clutch']

export function filterProducts(filter) {
  if (filter === 'All') return products
  if (filter === 'MFWD' || filter === '2WD') return products.filter((p) => p.drive === filter)
  if (filter === 'Dual Clutch') return products.filter((p) => p.clutch === 'Dual')
  if (filter === 'Single Clutch') return products.filter((p) => p.clutch === 'Single')
  return products
}
