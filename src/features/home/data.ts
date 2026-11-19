import type { Dossier } from '@/types/domain'

/** Sample case files shown on the homepage (no API — Phase 2 wires real data). */
export const sampleDossiers: Dossier[] = [
  {
    id: '1091500',
    title: 'Cyberpunk 2077',
    synopsis:
      'Open-world RPG set in Night City. Watch the price drop before you commit to the chrome.',
    price: 17.99,
    savingsPercent: 70,
    rating: 86,
    status: 'on-sale',
  },
  {
    id: '1145360',
    title: 'Hades',
    synopsis:
      'Roguelike dungeon crawler with razor-sharp combat. Rare: critical acclaim at a fair price.',
    price: 24.99,
    savingsPercent: 0,
    rating: 93,
    status: 'verified',
  },
  {
    id: '1245620',
    title: 'Elden Ring',
    synopsis:
      'FromSoftware epic. High retail price, sporadic discounts — a case worth surveilling.',
    price: 59.99,
    savingsPercent: 15,
    rating: 96,
    status: 'surveillance',
  },
]
