import {
  Bell,
  BookOpen,
  Boxes,
  Code,
  Crosshair,
  Database,
  FileDown,
  FileText,
  Globe,
  Grid2x2,
  Image,
  KeyRound,
  Layers,
  Map,
  MapPin,
  Monitor,
  PenLine,
  Radar,
  Rocket,
  Satellite,
  Server,
  Thermometer,
  Waypoints,
} from 'lucide-astro';

// Icon names usable in page frontmatter (`icon:`) and on <Card icon="…">.
export const icons = {
  bell: Bell,
  'book-open': BookOpen,
  boxes: Boxes,
  code: Code,
  crosshair: Crosshair,
  database: Database,
  'file-down': FileDown,
  'file-text': FileText,
  globe: Globe,
  grid: Grid2x2,
  image: Image,
  key: KeyRound,
  layers: Layers,
  map: Map,
  'map-pin': MapPin,
  monitor: Monitor,
  pen: PenLine,
  radar: Radar,
  rocket: Rocket,
  satellite: Satellite,
  server: Server,
  thermometer: Thermometer,
  waypoints: Waypoints,
} as const;

export type IconName = keyof typeof icons;

export function getIcon(name?: string) {
  return (name && icons[name as IconName]) || FileText;
}
