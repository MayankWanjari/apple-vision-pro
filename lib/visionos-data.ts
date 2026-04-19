export type Environment = {
  id: string
  name: string
  description: string
  image: string
}

export const ENVIRONMENTS: Environment[] = [
  {
    id: 'mount-hood',
    name: 'Mount Hood',
    description: 'Stand at the summit of an Oregon peak.',
    image: '/assets/visionos/env-mount-hood.webp',
  },
  {
    id: 'joshua-tree',
    name: 'Joshua Tree',
    description: 'Watch the sun set over a desert landscape.',
    image: '/assets/visionos/env-joshua-tree.jpg',
  },
  {
    id: 'yosemite',
    name: 'Yosemite Valley',
    description: 'Stand among ancient granite walls and towering pines.',
    image: '/assets/visionos/Yosemite-Valley-USA.jpg',
  },
  {
    id: 'moon',
    name: 'Moon',
    description: 'Look back at Earth from the lunar surface.',
    image: '/assets/visionos/env-moon.webp',
  },
  {
    id: 'white-sands',
    name: 'White Sands',
    description: 'Immerse yourself in vast gypsum dunes.',
    image: '/assets/visionos/env-white-sands.avif',
  },
  {
    id: 'haleakala',
    name: 'Haleakalā',
    description: 'Above the clouds on a Hawaiian volcano.',
    image: '/assets/visionos/env-haleakala.png',
  },
]
