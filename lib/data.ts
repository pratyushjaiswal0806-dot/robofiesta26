export type EventDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type EventRecord = {
  slug: string
  level: string
  title: string
  description: string
  teamSize: string
  difficulty: EventDifficulty
  icon: string
  artwork: string
  artworkWidth: number
  artworkHeight: number
  prizePool: string
  timing: string
  duration: string
  format: string
  rules: readonly string[]
}

export const fest = {
  name: 'ROBOFIESTA’26',
  date: '16–18 October 2026',
  venue: 'RVITM, Bangalore',
  registrationDeadline: '2026-10-05T23:59:59+05:30',
} as const

// This catalogue is intentionally plain data so it can be replaced with a CMS response later.
export const events = [
  {
    slug: 'robo-wars',
    level: '01',
    title: 'Robo Wars',
    description: 'Compact steel warriors in a no-holds-barred arena.',
    teamSize: '2–5 builders',
    difficulty: 'Advanced',
    icon: '⚙',
    artwork: '/events/robo-wars.png',
    artworkWidth: 512,
    artworkHeight: 512,
    prizePool: 'Details TBA',
    timing: 'Day 2 · 02:00 PM — eliminations',
    duration: 'Two-day battle bracket',
    format: 'Head-to-head arena rounds',
    rules: [
      'Bring one competition-ready robot per registered team.',
      'Teams advance through qualifier and elimination rounds.',
      'Final technical specifications will be published in the rulebook.',
    ],
  },
  {
    slug: 'micromouse-maze',
    level: '02',
    title: 'Micromouse Maze',
    description: 'Code a clever path through a shifting circuit maze.',
    teamSize: '1–3 builders',
    difficulty: 'Intermediate',
    icon: '⌘',
    artwork: '/events/micromouse-maze.png',
    artworkWidth: 512,
    artworkHeight: 512,
    prizePool: 'Details TBA',
    timing: 'Day 2 · 09:00 AM — prelims',
    duration: 'Timed maze attempts',
    format: 'Autonomous speed run',
    rules: [
      'The mouse must sense and solve the maze without manual steering.',
      'Fastest valid run wins the round.',
      'Sensor and size limits will be confirmed in the rulebook.',
    ],
  },
  {
    slug: 'autonomous-rover',
    level: '03',
    title: 'Autonomous Rover',
    description: 'Navigate red-rock terrain with sensors and smarts.',
    teamSize: '2–4 builders',
    difficulty: 'Advanced',
    icon: '◈',
    artwork: '/events/autonomous-rover.png',
    artworkWidth: 512,
    artworkHeight: 512,
    prizePool: 'Details TBA',
    timing: 'Day 2 · 05:00 PM — challenge',
    duration: 'Timed terrain mission',
    format: 'Sensor-led navigation',
    rules: [
      'Complete the course using onboard sensing and control logic.',
      'Teams are scored on checkpoints, accuracy, and completion time.',
      'Course dimensions and scoring details are coming with the rulebook.',
    ],
  },
  {
    slug: 'waste-drift',
    level: '04',
    title: 'Waste Drift',
    description: 'Build a scrappy racer and chase the fastest clean run.',
    teamSize: '1–3 builders',
    difficulty: 'Intermediate',
    icon: '✦',
    artwork: '/events/waste-drift-poster.png',
    artworkWidth: 1414,
    artworkHeight: 2000,
    prizePool: '₹3,000',
    timing: '25 Nov 2026 · RVITH',
    duration: 'Timed drift-course challenge',
    format: 'Build-and-race challenge',
    rules: [
      'Teams of 1–3 builders compete with one race-ready vehicle.',
      'The fastest valid run through the marked course takes the top slot.',
      'Vehicle requirements and safety checks will be published before registration.',
    ],
  },
  {
    slug: 'line-follower-x',
    level: '05',
    title: 'Line Follower X',
    description: 'Tune your bot for speed, precision, and sharp turns.',
    teamSize: '1–3 builders',
    difficulty: 'Beginner',
    icon: '➰',
    artwork: '/events/line-follower-x.png',
    artworkWidth: 512,
    artworkHeight: 512,
    prizePool: 'Details TBA',
    timing: 'Schedule to be announced',
    duration: 'Timed track attempts',
    format: 'Autonomous line race',
    rules: [
      'Build a bot that follows the marked track without manual input.',
      'The quickest clean attempt sets the benchmark.',
      'Track and hardware specifications are coming in the rulebook.',
    ],
  },
  {
    slug: 'innovation-expo',
    level: '06',
    title: 'Innovation Expo',
    description: 'Put your wildest prototype on the demo floor.',
    teamSize: '1–4 creators',
    difficulty: 'Beginner',
    icon: '▣',
    artwork: '/events/innovation-expo.png',
    artworkWidth: 512,
    artworkHeight: 512,
    prizePool: 'Details TBA',
    timing: 'Day 3 · 01:00 PM — showcase',
    duration: 'Demo floor showcase',
    format: 'Prototype presentation',
    rules: [
      'Show a working prototype or a clearly demonstrated concept.',
      'Explain the problem, build, and next upgrade to the review panel.',
      'Judging criteria and presentation time will be listed in the rulebook.',
    ],
  },
] as const satisfies readonly EventRecord[]

export const schedule = {
  'Day 1 — Ignite': [
    ['09:00 AM', 'Opening Ceremony'],
    ['10:30 AM', 'Robotics Workshops Begin'],
    ['01:00 PM', 'Innovation Expo Setup'],
    ['03:00 PM', 'Qualifier Rounds'],
    ['06:00 PM', 'Creator Networking Night'],
  ],
  'Day 2 — Compete': [
    ['09:00 AM', 'Micromouse Maze Prelims'],
    ['11:00 AM', 'Waste Drift Trials'],
    ['02:00 PM', 'Robo Wars Eliminations'],
    ['05:00 PM', 'Autonomous Rover Challenge'],
  ],
  'Day 3 — Celebrate': [
    ['10:00 AM', 'Final Battle Rounds'],
    ['01:00 PM', 'Innovation Expo Showcase'],
    ['03:30 PM', 'Grand Finale'],
    ['05:00 PM', 'Prize Distribution & Closing Ceremony'],
  ],
} as const

export const faqs = [
  {
    question: 'Who can participate in RoboFiesta’26?',
    answer: 'Students from any recognized college or school are welcome. Each event page will list its own eligibility rules.',
  },
  {
    question: 'Can students from other colleges participate?',
    answer: 'Absolutely. RoboFiesta is an open inter-college arena.',
  },
  {
    question: 'What is the maximum team size?',
    answer: 'It varies by event, from solo pilot challenges up to five-member battle teams.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'Final registration details and fees will be published in the rulebook.',
  },
  {
    question: 'Are accommodation facilities available?',
    answer: 'Limited accommodation information will be shared with registered outstation teams.',
  },
  {
    question: 'Where can I find the rulebooks?',
    answer: 'Use the rulebook link in the transmission panel or the event challenge cards.',
  },
] as const

export const sponsors = [
  {
    tier: 'Title Sponsor',
    partners: [{ name: 'Title sponsor slot', logoSrc: null, alt: 'Title sponsor logo slot open' }],
  },
  {
    tier: 'Gold Partners',
    partners: [
      { name: 'Gold partner slot 01', logoSrc: null, alt: 'Gold partner logo slot open' },
      { name: 'Gold partner slot 02', logoSrc: null, alt: 'Gold partner logo slot open' },
      { name: 'Gold partner slot 03', logoSrc: null, alt: 'Gold partner logo slot open' },
    ],
  },
  {
    tier: 'Community Partners',
    partners: [
      { name: 'Community slot 01', logoSrc: null, alt: 'Community partner logo slot open' },
      { name: 'Community slot 02', logoSrc: null, alt: 'Community partner logo slot open' },
      { name: 'Community slot 03', logoSrc: null, alt: 'Community partner logo slot open' },
      { name: 'Community slot 04', logoSrc: null, alt: 'Community partner logo slot open' },
    ],
  },
  {
    tier: 'Media Partners',
    partners: [
      { name: 'Media slot 01', logoSrc: null, alt: 'Media partner logo slot open' },
      { name: 'Media slot 02', logoSrc: null, alt: 'Media partner logo slot open' },
      { name: 'Media slot 03', logoSrc: null, alt: 'Media partner logo slot open' },
      { name: 'Media slot 04', logoSrc: null, alt: 'Media partner logo slot open' },
    ],
  },
] as const

export const prizeCategories = [
  { id: 'champion', label: 'Champion', summary: 'Cash prize + trophy', detail: 'Amount to be announced' },
  { id: 'runner-up', label: 'Runner-Up', summary: 'Cash prize + trophy', detail: 'Amount to be announced' },
  { id: 'special-awards', label: 'Special Awards', summary: 'Best Design, Best Innovation, Crowd Favorite', detail: 'Categories to be confirmed' },
] as const

// Names and photos are intentionally not invented before the organising team releases them.
// Replace these records with real profiles when the roster is approved.
export const teamPlaceholders = [
  { id: 'faculty-01', role: 'FACULTY', avatar: 'visor', tone: 'cyan' },
  { id: 'faculty-02', role: 'FACULTY', avatar: 'antenna', tone: 'yellow' },
  { id: 'faculty-03', role: 'FACULTY', avatar: 'cube', tone: 'pink' },
  { id: 'core-01', role: 'CORE TEAM', avatar: 'visor', tone: 'pink' },
  { id: 'core-02', role: 'CORE TEAM', avatar: 'antenna', tone: 'cyan' },
  { id: 'core-03', role: 'CORE TEAM', avatar: 'cube', tone: 'yellow' },
  { id: 'tech-01', role: 'TECH TEAM', avatar: 'cube', tone: 'cyan' },
  { id: 'tech-02', role: 'TECH TEAM', avatar: 'visor', tone: 'yellow' },
  { id: 'tech-03', role: 'TECH TEAM', avatar: 'antenna', tone: 'pink' },
  { id: 'media-01', role: 'MEDIA', avatar: 'antenna', tone: 'pink' },
  { id: 'media-02', role: 'MEDIA', avatar: 'cube', tone: 'cyan' },
  { id: 'media-03', role: 'MEDIA', avatar: 'visor', tone: 'yellow' },
] as const
