import {
  Briefcase,
  ChartColumn,
  Eye,
  Radar,
  Search,
  Swords,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  /** Short mono descriptor rendered beside the label (e.g. "HQ", "CASE"). */
  code: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Headquarters', code: 'HQ', icon: Briefcase },
  { to: '/discover', label: 'Open a Case', code: 'CASE', icon: Search },
  { to: '/deals', label: 'Deals Radar', code: 'RADAR', icon: Radar },
  { to: '/watchlist', label: 'Surveillance', code: 'WATCH', icon: Eye },
  { to: '/budget', label: 'Field Budget', code: 'BUDGET', icon: Wallet },
  { to: '/faceoff', label: 'Game Face-Off', code: 'VS', icon: Swords },
  { to: '/intel', label: 'Intelligence', code: 'INTEL', icon: ChartColumn },
]
