import './entry-common'

import persist from '@alpinejs/persist'
import Alpine from 'alpinejs'
import { Simulation } from './simulation'
import type { AlpineThis } from './types'

interface Card {
  id: string
  title: string
  name: string
  date: string
  url: string
  icons: string[]
  class: string
}

interface Link {
  icon: string
  url: string
  alt: string
}

const links: Link[] = [
  {
    icon: 'carbon:logo-github',
    url: 'https://github.com/calico32',
    alt: 'GitHub',
  },
  {
    icon: 'carbon:logo-linkedin',
    url: 'https://linkedin.com/in/caleb-chan-ma',
    alt: 'LinkedIn',
  },
  {
    icon: 'carbon:logo-keybase',
    url: 'https://keybase.io/calico32',
    alt: 'Keybase',
  },
  {
    icon: 'carbon:at',
    url: 'mailto:cchan@hey.com',
    alt: 'Email',
  },
  // {
  //   icon: 'carbon:document',
  //   url: '/resume.pdf',
  //   alt: 'Resume',
  // },
]

const cards: Card[] = [
  {
    id: 'x-toaster',
    title: 'A zero-dependency vanilla JS toast notification library',
    name: 'x-toaster',
    date: '2025',
    url: 'https://github.com/calico32/x-toaster',
    icons: [
      'simple-icons:html5',
      'simple-icons:typescript',
      'simple-icons:webcomponentsdotorg',
    ],
    class: 'hover:bg-red-700 [.active]:bg-red-700',
  },
  {
    id: 'authie',
    title:
      'A token-based session management library with minimal server-side state',
    name: 'authie',
    date: '2025',
    url: 'https://github.com/calico32/authie',
    icons: ['simple-icons:go'],
    class: 'hover:bg-red-700 [.active]:bg-red-700',
  },
  {
    id: 'kdl-go',
    title: 'A set of bindings for parsing and writing KDL documents in Go',
    name: 'kdl-go',
    date: '2025',
    url: 'https://github.com/calico32/kdl-go',
    icons: ['simple-icons:go'],
    class: 'hover:bg-teal-700 [.active]:bg-teal-700',
  },
  {
    id: 'waybar-niri-windows',
    title: 'A simple focus indicator for Niri + Waybar',
    name: 'waybar-niri-windows',
    date: '2025',
    url: 'https://github.com/calico32/waybar-niri-windows',
    icons: ['simple-icons:go', 'simple-icons:linux'],
    class: 'hover:bg-yellow-700 [.active]:bg-yellow-700',
  },
  {
    id: 'libresume',
    title: 'A clean and modern resume template in Typst',
    name: 'libresume',
    date: '2025',
    url: 'https://github.com/calico32/libresume',
    icons: ['simple-icons:typst'],
    class: 'hover:bg-cyan-800 [.active]:bg-cyan-800',
  },
  {
    id: 'colors.calico.lol',
    title: 'An offline-ready color converter and palette generator',
    name: 'colors.calico.lol',
    date: '2025',
    url: 'https://colors.calico.lol',
    icons: [
      'simple-icons:typescript',
      'simple-icons:alpinedotjs',
      'simple-icons:tailwindcss',
      'simple-icons:vite',
      'simple-icons:pwa',
      'simple-icons:cloudflarepages',
    ],
    class: 'hover:bg-orange-700 [.active]:bg-orange-700',
  },
  {
    id: 'texty',
    title: 'A program to display text and animations on your desktop',
    name: 'texty',
    date: '2025',
    url: 'https://github.com/calico32/texty',
    icons: ['simple-icons:go', 'simple-icons:gtk'],
    class: 'hover:bg-pink-700 [.active]:bg-pink-700',
  },
  {
    id: 'genpass',
    title: 'A simple program to generate passwords on the command line',
    name: 'genpass',
    date: '2025',
    url: 'https://github.com/calico32/genpass',
    icons: ['simple-icons:go'],
    class: 'hover:bg-lime-700 [.active]:bg-lime-700',
  },
  {
    id: 'goose',
    title: 'A programming language focused on ease of use',
    name: 'goose',
    date: '2022-',
    url: 'https://github.com/calico32/goose',
    icons: ['simple-icons:go', 'simple-icons:llvm'],
    class: 'hover:bg-orange-700 [.active]:bg-orange-700',
  },
  {
    id: 'calebc.co',
    title: 'A portfolio website with animated project cards',
    name: 'calebc.co',
    date: '2025',
    url: 'https://github.com/calico32/calebc.co',
    icons: [
      'simple-icons:typescript',
      'simple-icons:alpinedotjs',
      'simple-icons:tailwindcss',
      'simple-icons:vite',
      'simple-icons:pwa',
      'simple-icons:cloudflarepages',
    ],
    class: 'hover:bg-zinc-900 [.active]:bg-zinc-900',
  },
  {
    id: 'ebnf-language-support',
    title: 'A VSCode extension for highlighting and validating EBNF',
    name: 'ebnf-language-support',
    date: '2023',
    url: 'https://github.com/calico32/ebnf-language-support',
    icons: ['simple-icons:typescript', 'simple-icons:visualstudiocode'],
    class: 'hover:bg-emerald-700 [.active]:bg-emerald-700',
  },
  {
    id: 'battleship',
    title: 'An online multiplayer version of Battleship played in the terminal',
    name: 'battleship',
    date: '2022',
    url: 'https://github.com/calico32/battleship',
    icons: ['simple-icons:dart'],
    class: 'hover:bg-amber-700 [.active]:bg-amber-700',
  },
]

shuffle(cards)

const isLarge = window.matchMedia(`(width >= 48rem)`).matches

const sim = new Simulation({
  initialTransform: `translate(40vw, 100vh) rotate(0deg)`,
  initialAnimationEasing: 'ease-out',
  initialAnimationDuration: 500,
  initialAnimationStagger: 30,
  initialMargin: isLarge
    ? { left: 50, bottom: 50, right: 50, top: 200 }
    : { left: 20, bottom: 20, right: 20, top: 100 },
  pageMargin: isLarge ? 25 : 0,
  movementClamp: isLarge ? 150 : 75,
  friction: 0.8,
  accelerationFriction: 0.6,
  minVelocity: 0.001,
  pushFactor: 0.2,
})

Alpine.data('main', () => ({ links, cards }))

Alpine.data('draggable', function (this: AlpineThis<unknown>, index: number) {
  const d = sim.new(this.$el)
  return {
    state: d,
    init() {
      sim.init()
      d.init(index + 5)
    },
    destroy() {
      d.destroy()
    },
  }
})

Alpine.plugin(persist)
Alpine.start()

/** shuffle shuffles an array in place. */
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
