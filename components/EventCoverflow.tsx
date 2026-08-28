"use client"

import { CoverflowCarousel, type CoverflowSlide } from '@/components/ui/coverflow-carousel'
import { events } from '@/lib/data'

const tilePaths = [
  '/events/robo-wars.png',
  '/events/micromouse-maze.png',
  '/events/autonomous-rover.png',
  '/events/drone-dash.png',
  '/events/line-follower-x.png',
  '/events/innovation-expo.png',
]

const tileAlts = [
  'Pixel-art battle robots on a cream tile for the Robo Wars event',
  'Pixel-art maze robot on a light-blue tile for the Micromouse Maze event',
  'Pixel-art sensor rover on a peach tile for the Autonomous Rover event',
  'Pixel-art racing drone on a light-blue tile for the Drone Dash event',
  'Pixel-art track robot on a cream tile for the Line Follower X event',
  'Pixel-art exhibition board on a peach tile for the Innovation Expo event',
]

const slides: CoverflowSlide[] = events.map(([level, title, description, team, difficulty], index) => ({
  src: tilePaths[index],
  alt: tileAlts[index],
  title,
  subtitle: `Level ${level} · ${description}`,
  meta: [
    { label: 'Team', value: team },
    { label: 'Level', value: difficulty },
    { label: 'Prize Pool', value: 'TBA' },
  ],
}))

export default function EventCoverflow() {
  return (
    <div className="mb-20 w-full overflow-hidden border-y-4 border-[#2A1454] bg-[#FFF6DC]/90 py-6 shadow-[0_7px_0_0_#2A1454] [background-image:radial-gradient(#2A145433_1px,transparent_1px)] [background-size:16px_16px]">
      <CoverflowCarousel slides={slides} />
    </div>
  )
}
