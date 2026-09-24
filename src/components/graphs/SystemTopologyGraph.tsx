import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  CloudLightning,
  Info,
  Cpu,
  Radio,
  ShieldAlert,
  Laptop,
  HardDrive,
  Filter,
} from 'lucide-react';

export type PipelineType = 'all' | 'observations' | 'models' | 'alerts';

export interface NodeData {
  id: string;
  title: string;
  category: string;
  tier: 'client' | 'services' | 'upstream';
  pipeline: 'observations' | 'models' | 'alerts' | 'shared';
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  tech: string[];
  specs: { label: string; value: string }[];
  status: string;
  accent: 'sky' | 'purple' | 'amber' | 'portal' | 'slate';
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  pipeline: 'observations' | 'models' | 'alerts' | 'shared';
  accent: 'sky' | 'purple' | 'amber' | 'slate';
  dashed?: boolean;
}

// =============================================================================
// SPACIOUS & GEOMETRICALLY OPTIMIZED TOPOLOGY
// Canvas space: 1180 x 740
// Card widths: 320px (Services & Upstream), 440px (Portal), 300px (SW Cache)
// Card heights: 164px across all tiers for generous internal breathing room
// =============================================================================

const NODES: NodeData[] = [
  // ---------------------------------------------------------------------------
  // TIER 1: CLIENT PRESENTATION LAYER (Y: 40, H: 164)
  // ---------------------------------------------------------------------------
  {
    id: 'client-portal',
    title: 'Weather Intelligence',
    category: 'Client Application',
    tier: 'client',
    pipeline: 'shared',
    x: 310,
    y: 40,
    width: 440,
    height: 164,
    description: 'High-performance React 19 SPA rendering real-time surface observations, hazard alerts, and forecast model rasters.',
    tech: ['React 19', 'MapLibre GL', 'Deck.gl', 'Tailwind v4'],
    specs: [
      { label: 'Domain', value: 'weather.cssl.ca' },
      { label: 'Rendering', value: 'WebGL Hardware Accelerated' },
      { label: 'Framerate', value: '60 FPS Target' },
      { label: 'Modes', value: 'Nowcast, Historical Scrub, Forecast' },
    ],
    status: 'Active · 60 FPS',
    accent: 'portal',
  },
  {
    id: 'client-sw',
    title: 'Service Worker Cache',
    category: 'Client Storage',
    tier: 'client',
    pipeline: 'models',
    x: 820,
    y: 40,
    width: 300,
    height: 164,
    description: 'Client-side raster tile caching engine preserving forecast model grids and radar frames across scrubbing sessions.',
    tech: ['CacheStorage', 'IndexedDB', 'SW Fetch'],
    specs: [
      { label: 'Scope', value: 'cyclone.cssl.ca/v1/tiles/*' },
      { label: 'Policy', value: 'Cache-First (immutable GRIB timesteps)' },
      { label: 'Storage', value: 'IndexedDB + Cache API' },
      { label: 'Latency', value: '< 5ms local cache hit' },
    ],
    status: 'Client-Side',
    accent: 'slate',
  },

  // ---------------------------------------------------------------------------
  // TIER 2: APPLICATION & COMPUTATION ENGINES (Y: 290, H: 164)
  // ---------------------------------------------------------------------------
  {
    id: 'raindrop-api',
    title: 'Raindrop Observation API',
    category: 'Backend Core',
    tier: 'services',
    pipeline: 'observations',
    x: 40,
    y: 290,
    width: 320,
    height: 164,
    description: 'Central ingestion gateway and station catalog service for surface weather observations across Canada.',
    tech: ['FastAPI', 'TimescaleDB', 'PostgreSQL'],
    specs: [
      { label: 'Domain', value: 'raindrop.cssl.ca' },
      { label: 'Protocols', value: 'REST JSON + Server-Sent Events' },
      { label: 'Throughput', value: '~15,000 obs / min' },
      { label: 'QC Filter', value: 'Range, Rate-of-Change, Buddy Checks' },
    ],
    status: 'Operational',
    accent: 'sky',
  },
  {
    id: 'cyclone-serve',
    title: 'Cyclone-serve Model Engine',
    category: 'Forecast Subsystem',
    tier: 'services',
    pipeline: 'models',
    x: 430,
    y: 290,
    width: 320,
    height: 164,
    description: 'High-speed raster tiling server computing thermodynamic diagnostics and rotated forecast grids.',
    tech: ['GRIB2 Decoders', 'GeoTIFF', 'DGZ Engine'],
    specs: [
      { label: 'Domain', value: 'cyclone.cssl.ca' },
      { label: 'Model Products', value: 'HRRR, RAP, RDPS, GDPS' },
      { label: 'Thermodynamics', value: 'CAPE, DGZ, Theta-e, Shear' },
      { label: 'Output', value: 'Mercator / ZXY Vector & Raster Tiles' },
    ],
    status: 'Operational',
    accent: 'purple',
  },
  {
    id: 'cap-alerts',
    title: 'CAP Alert Processor',
    category: 'Hazard Engine',
    tier: 'services',
    pipeline: 'alerts',
    x: 820,
    y: 290,
    width: 320,
    height: 164,
    description: 'Parses and projects ECCC Common Alerting Protocol XML feeds into geospatial hazard polygons in real time.',
    tech: ['CAP 1.2 XML', 'Turf.js', 'GeoJSON'],
    specs: [
      { label: 'Coverage', value: 'National (ECCC Public Feeds)' },
      { label: 'Refresh', value: '60-second polling loop' },
      { label: 'Geometry', value: 'MultiPolygon GeoJSON' },
      { label: 'Alert Types', value: 'Tornado, Severe Storm, Winter Hazard' },
    ],
    status: 'Streaming',
    accent: 'amber',
  },

  // ---------------------------------------------------------------------------
  // TIER 3: UPSTREAM DATA FEEDS & NETWORKS (Y: 540, H: 164)
  // ---------------------------------------------------------------------------
  {
    id: 'upstream-stations',
    title: 'CSSL & Partner Mesonets',
    category: 'Surface Observation',
    tier: 'upstream',
    pipeline: 'observations',
    x: 40,
    y: 540,
    width: 320,
    height: 164,
    description: 'Dense network of research weather stations with high-frequency 60s cellular data loggers across Southern Ontario.',
    tech: ['Cellular LTE-M', 'Campbell Sci', 'Modbus'],
    specs: [
      { label: 'Network', value: '120+ Southern Ontario sites' },
      { label: 'Sampling', value: '1-minute continuous interval' },
      { label: 'Sensors', value: 'Sonic wind, solar, pressure, rain' },
      { label: 'Ingestion Target', value: 'raindrop.cssl.ca' },
    ],
    status: '1-min Telemetry',
    accent: 'sky',
  },
  {
    id: 'upstream-noaa',
    title: 'NOAA NCEP & NWP Feeds',
    category: 'Numerical Modeling',
    tier: 'upstream',
    pipeline: 'models',
    x: 430,
    y: 540,
    width: 320,
    height: 164,
    description: 'High-Resolution Rapid Refresh (HRRR) and Rapid Refresh (RAP) raw model GRIB2 binary streams and Doppler radar.',
    tech: ['NOAA NOMADS', 'HRRR / RAP', 'GRIB2'],
    specs: [
      { label: 'Resolution', value: '3km convection-allowing' },
      { label: 'Cycles', value: 'Hourly model runs' },
      { label: 'Horizon', value: '0 to 48 forecast hours' },
      { label: 'Ingestion Target', value: 'cyclone.cssl.ca' },
    ],
    status: 'Upstream Provider',
    accent: 'purple',
  },
  {
    id: 'upstream-eccc',
    title: 'ECCC Datamart & CAP Feeds',
    category: 'External Agency',
    tier: 'upstream',
    pipeline: 'alerts',
    x: 820,
    y: 540,
    width: 320,
    height: 164,
    description: 'Environment and Climate Change Canada public alert feeds and national meteorological alert distributions.',
    tech: ['Datamart AMQP', 'GeoMet WMS', 'CAP XML'],
    specs: [
      { label: 'Source', value: 'Environment and Climate Change Canada' },
      { label: 'Products', value: 'CAP Alerts, Watches, Warnings' },
      { label: 'Protocol', value: 'AMQP & HTTP Pull' },
      { label: 'Ingestion Target', value: 'CAP Alert Processor' },
    ],
    status: 'Upstream Provider',
    accent: 'amber',
  },
];

// =============================================================================
// STREAM EDGES WITH ZERO CROSSINGS & CLEAN PALETTE
// =============================================================================
const EDGES: EdgeData[] = [
  // Pillar 1: Surface Observation Stream (Sky Blue)
  {
    id: 'e-stations-raindrop',
    source: 'upstream-stations',
    target: 'raindrop-api',
    label: '60s Telemetry',
    pipeline: 'observations',
    accent: 'sky',
    dashed: true,
  },
  {
    id: 'e-raindrop-portal',
    source: 'raindrop-api',
    target: 'client-portal',
    label: 'Obs JSON / SSE',
    pipeline: 'observations',
    accent: 'sky',
    dashed: true,
  },

  // Pillar 2: Forecast & Raster Stream (Purple)
  {
    id: 'e-noaa-cyclone',
    source: 'upstream-noaa',
    target: 'cyclone-serve',
    label: 'GRIB2 Ingestion',
    pipeline: 'models',
    accent: 'purple',
  },
  {
    id: 'e-cyclone-portal',
    source: 'cyclone-serve',
    target: 'client-portal',
    label: 'Vector / Raster Tiles',
    pipeline: 'models',
    accent: 'purple',
  },

  // Pillar 3: Severe Weather Alerts (Amber)
  {
    id: 'e-eccc-cap',
    source: 'upstream-eccc',
    target: 'cap-alerts',
    label: 'CAP 1.2 XML Pull',
    pipeline: 'alerts',
    accent: 'amber',
  },
  {
    id: 'e-cap-portal',
    source: 'cap-alerts',
    target: 'client-portal',
    label: 'GeoJSON Alerts',
    pipeline: 'alerts',
    accent: 'amber',
  },

  // Client Subsystem: Local Service Worker Cache (Slate)
  {
    id: 'e-portal-sw',
    source: 'client-portal',
    target: 'client-sw',
    label: 'Local Tile Cache',
    pipeline: 'models',
    accent: 'slate',
  },
];

export default function SystemTopologyGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [activePipeline, setActivePipeline] = useState<PipelineType>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Center & fit diagram automatically on mount and window resize
  const fitToView = () => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const diagramW = 1180;
    const diagramH = 780;

    const scaleX = (clientWidth - 48) / diagramW;
    const scaleY = (clientHeight - 48) / diagramH;
    const fittedScale = Math.min(1.15, Math.max(0.48, Math.min(scaleX, scaleY)));

    const fittedX = (clientWidth - diagramW * fittedScale) / 2;
    const fittedY = Math.max(16, (clientHeight - diagramH * fittedScale) / 2);

    setScale(+fittedScale.toFixed(3));
    setPosition({ x: Math.round(fittedX), y: Math.round(fittedY) });
  };

  useEffect(() => {
    fitToView();
    window.addEventListener('resize', fitToView);
    return () => window.removeEventListener('resize', fitToView);
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setScale((s) => Math.min(2.2, +(s + 0.15).toFixed(2)));
  const handleZoomOut = () => setScale((s) => Math.max(0.45, +(s - 0.15).toFixed(2)));

  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const positionRef = useRef(position);
  positionRef.current = position;

  // Strict non-passive wheel handler: zooms the graph while blocking window/page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const currentScale = scaleRef.current;
      const currentPosition = positionRef.current;
      const zoomFactor = -e.deltaY * 0.0012;
      const newScale = Math.min(2.2, Math.max(0.45, +(currentScale + zoomFactor).toFixed(3)));

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const dx = (mouseX - currentPosition.x) * (newScale / currentScale - 1);
      const dy = (mouseY - currentPosition.y) * (newScale / currentScale - 1);

      setPosition({ x: Math.round(currentPosition.x - dx), y: Math.round(currentPosition.y - dy) });
      setScale(newScale);
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Drag Panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change (e.g. Escape key)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      setTimeout(fitToView, 100);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Compute precise, non-crossing SVG edge paths
  const computeEdge = (edge: EdgeData) => {
    const source = NODES.find((n) => n.id === edge.source);
    const target = NODES.find((n) => n.id === edge.target);
    if (!source || !target) return { path: '', midX: 0, midY: 0 };

    // Case 1: Horizontal connection (client-portal <-> client-sw)
    if (source.id === 'client-portal' && target.id === 'client-sw') {
      const startX = source.x + source.width;
      const startY = source.y + source.height / 2;
      const endX = target.x;
      const endY = target.y + target.height / 2;
      const path = `M ${startX} ${startY} L ${endX} ${endY}`;
      return { path, midX: (startX + endX) / 2, midY: startY - 14 };
    }

    // Case 2: Upstream to Services (Tier 3 -> Tier 2: perfectly vertical lines)
    if (source.tier === 'upstream' && target.tier === 'services') {
      const startX = source.x + source.width / 2;
      const startY = source.y;
      const endX = target.x + target.width / 2;
      const endY = target.y + target.height;
      const path = `M ${startX} ${startY} L ${endX} ${endY}`;
      return { path, midX: startX, midY: (startY + endY) / 2 };
    }

    // Case 3: Services to Client Portal (Tier 2 -> Tier 1)
    if (target.id === 'client-portal') {
      const startX = source.x + source.width / 2;
      const startY = source.y;
      let endX: number;

      // Cleanly spaced anchor points into client-portal bottom
      if (source.id === 'raindrop-api') {
        endX = target.x + 95; // Left anchor (X: 405)
      } else if (source.id === 'cyclone-serve') {
        endX = target.x + target.width / 2 + 10; // Center anchor (X: 540)
      } else {
        endX = target.x + target.width - 45; // Right anchor (X: 705)
      }

      const endY = target.y + target.height;
      const dy = Math.abs(endY - startY) * 0.55;
      const path = `M ${startX} ${startY} C ${startX} ${startY - dy}, ${endX} ${endY + dy}, ${endX} ${endY}`;
      return { path, midX: (startX + endX) / 2, midY: (startY + endY) / 2 };
    }

    // Default fallback
    const startX = source.x + source.width / 2;
    const startY = source.y;
    const endX = target.x + target.width / 2;
    const endY = target.y + target.height;
    const path = `M ${startX} ${startY} L ${endX} ${endY}`;
    return { path, midX: (startX + endX) / 2, midY: (startY + endY) / 2 };
  };

  // Filter check helpers
  const isNodeVisibleInFilter = (node: NodeData) => {
    if (activePipeline === 'all') return true;
    if (node.pipeline === 'shared') return true;
    return node.pipeline === activePipeline;
  };

  const isEdgeVisibleInFilter = (edge: EdgeData) => {
    if (activePipeline === 'all') return true;
    return edge.pipeline === activePipeline;
  };

  return (
    <div
      ref={containerRef}
      className={`not-prose relative my-8 overflow-hidden rounded-2xl border border-zinc-800 bg-[#09090b] text-foreground select-none shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[720px] lg:h-[760px] w-full'
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        overscrollBehavior: 'none',
        touchAction: 'none',
      }}
    >
      {/* Keyframe animations for active flows */}
      <style>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -24px;
          }
        }
        @keyframes pulseBadge {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
      `}</style>

      {/* Subtle Neutral Dot Matrix Blueprint Grid */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25 dark:opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="topo-grid-dots"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${position.x % 28}, ${position.y % 28}) scale(1)`}
          >
            <circle cx="2" cy="2" r="1" fill="#71717a" fillOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-grid-dots)" />
      </svg>

      {/* Top Floating Controls Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Stream Filter Pills */}
        <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-[#121215]/90 p-1 backdrop-blur-md shadow-lg pointer-events-auto">
          <div className="flex items-center gap-1 px-2 text-[11px] font-semibold text-zinc-400">
            <Filter className="h-3 w-3 text-zinc-400" />
            <span className="hidden sm:inline">Stream:</span>
          </div>

          <button
            type="button"
            onClick={() => setActivePipeline('all')}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activePipeline === 'all'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-sm'
                : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
            }`}
          >
            All Systems
          </button>

          <button
            type="button"
            onClick={() => setActivePipeline('observations')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activePipeline === 'observations'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            Observations
          </button>

          <button
            type="button"
            onClick={() => setActivePipeline('models')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activePipeline === 'models'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-purple-400" />
            Forecast Models
          </button>

          <button
            type="button"
            onClick={() => setActivePipeline('alerts')}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
              activePipeline === 'alerts'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Hazard Alerts
          </button>
        </div>

        {/* Viewport Zoom & Reset Controls */}
        <div className="flex items-center gap-1 rounded-xl border border-zinc-800 bg-[#121215]/90 p-1 backdrop-blur-md shadow-lg pointer-events-auto">
          <button
            type="button"
            onClick={handleZoomIn}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
            title="Zoom In (+)"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
            title="Zoom Out (-)"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={fitToView}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
            title="Fit to Screen (Reset)"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <div className="mx-1 h-4 w-px bg-zinc-800" />
          <span className="px-1.5 font-mono text-[11px] font-semibold text-zinc-400">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Helper Legend on Bottom-Left */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 hidden items-center gap-3 rounded-lg border border-zinc-800/80 bg-[#121215]/85 px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-md sm:flex">
        <div className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-zinc-400" />
          <span>Click any card to inspect specs</span>
        </div>
        <span className="text-zinc-600">·</span>
        <span>Drag to pan</span>
        <span className="text-zinc-600">·</span>
        <span>Scroll to zoom</span>
      </div>

      {/* Main Pan / Zoom Viewport Canvas */}
      <div
        className="absolute top-0 left-0 transition-transform duration-75 ease-out origin-top-left"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        {/* ------------------------------------------------------------------- */}
        {/* THREE HORIZONTAL TIER ZONES (Z-0 BACKGROUND)                        */}
        {/* ------------------------------------------------------------------- */}

        {/* Tier 1: Presentation & Client Layer */}
        <div
          className="pointer-events-none absolute left-[20px] top-[18px] w-[1140px] rounded-2xl border border-dashed border-zinc-800/80 bg-zinc-900/20 p-4 z-0"
          style={{ height: '208px' }}
        >
          <div className="flex items-center justify-between text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <Laptop className="h-4 w-4 text-zinc-400" />
              Presentation &amp; Client Layer
            </span>
            <span className="text-[10px] tracking-normal font-normal text-zinc-500">
              React 19 WebGL Client · Service Worker Offline Cache
            </span>
          </div>
        </div>

        {/* Tier 2: Application & Processing Engines */}
        <div
          className="pointer-events-none absolute left-[20px] top-[268px] w-[1140px] rounded-2xl border border-dashed border-zinc-800/80 bg-zinc-900/20 p-4 z-0"
          style={{ height: '208px' }}
        >
          <div className="flex items-center justify-between text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-zinc-400" />
              Core Application &amp; Processing Engines
            </span>
            <span className="text-[10px] tracking-normal font-normal text-zinc-500">
              Decoupled High-Speed Observation, Model Tiling, and Hazard Pipelines
            </span>
          </div>
        </div>

        {/* Tier 3: Upstream Feeds & Ingestion Networks */}
        <div
          className="pointer-events-none absolute left-[20px] top-[518px] w-[1140px] rounded-2xl border border-dashed border-zinc-800/80 bg-zinc-900/20 p-4 z-0"
          style={{ height: '208px' }}
        >
          <div className="flex items-center justify-between text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-zinc-400" />
              Upstream Data Feeds &amp; Networks
            </span>
            <span className="text-[10px] tracking-normal font-normal text-zinc-500">
              National Radar, Cellular Station Loggers, NOAA NCEP GRIB2 Chunks
            </span>
          </div>
        </div>

        {/* Column Pipeline Headers at bottom */}
        <div className="pointer-events-none absolute left-[40px] top-[740px] flex w-[1100px] justify-between text-[10px] font-semibold tracking-wider text-muted-foreground uppercase z-0">
          <span className="w-[320px] text-center text-sky-400/80">
            Column 1: Observation Stream
          </span>
          <span className="w-[320px] text-center text-purple-400/80">
            Column 2: Forecast &amp; Raster Stream
          </span>
          <span className="w-[320px] text-center text-amber-400/80">
            Column 3: Severe Hazard Alerts
          </span>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* SVG CONNECTORS, ARROWHEADS & FLOW ANIMATIONS (Z-10)                 */}
        {/* ------------------------------------------------------------------- */}
        <svg
          className="pointer-events-none absolute top-0 left-0 overflow-visible z-10"
          width="1180"
          height="780"
        >
          <defs>
            {/* Arrowhead Markers per stream */}
            <marker
              id="marker-sky"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0ea5e9" />
            </marker>

            <marker
              id="marker-purple"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#a855f7" />
            </marker>

            <marker
              id="marker-amber"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#f59e0b" />
            </marker>

            <marker
              id="marker-slate"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#64748b" />
            </marker>

            <marker
              id="marker-dimmed"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 2 L 8 5 L 0 8 z" fill="#3f3f46" />
            </marker>
          </defs>

          {/* Render Flow Edges */}
          {EDGES.map((edge) => {
            const { path, midX, midY } = computeEdge(edge);
            const isVisible = isEdgeVisibleInFilter(edge);
            const isSourceSelected = selectedNode?.id === edge.source;
            const isTargetSelected = selectedNode?.id === edge.target;
            const isHighlighted = isSourceSelected || isTargetSelected;

            // Stream stroke color
            let strokeColor = 'rgba(113, 113, 122, 0.4)';
            let markerId = 'marker-dimmed';

            if (isVisible) {
              if (edge.accent === 'sky') {
                strokeColor = isHighlighted ? '#38bdf8' : '#0ea5e9';
                markerId = 'marker-sky';
              } else if (edge.accent === 'purple') {
                strokeColor = isHighlighted ? '#c084fc' : '#a855f7';
                markerId = 'marker-purple';
              } else if (edge.accent === 'amber') {
                strokeColor = isHighlighted ? '#fbbf24' : '#f59e0b';
                markerId = 'marker-amber';
              } else if (edge.accent === 'slate') {
                strokeColor = isHighlighted ? '#94a3b8' : '#64748b';
                markerId = 'marker-slate';
              }
            }

            return (
              <g
                key={edge.id}
                className="transition-all duration-300"
                style={{ opacity: isVisible ? 1 : 0.15 }}
              >
                {/* Glow underlay when highlighted */}
                {isHighlighted && (
                  <path
                    d={path}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={5}
                    strokeOpacity={0.2}
                  />
                )}

                {/* Primary Connection Line */}
                <path
                  d={path}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={isHighlighted ? 2.5 : 1.75}
                  strokeDasharray={edge.dashed ? '6,6' : undefined}
                  style={edge.dashed ? { animation: 'flowDash 12s linear infinite' } : undefined}
                  markerEnd={`url(#${markerId})`}
                />

                {/* Edge Annotation Pill */}
                {edge.label && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-60"
                      y="-11"
                      width="120"
                      height="22"
                      rx="6"
                      fill="#121215"
                      stroke={isHighlighted ? strokeColor : '#27272a'}
                      strokeWidth="1"
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={isHighlighted ? '#ffffff' : '#d4d4d8'}
                      fontSize="9.5"
                      fontFamily="ui-sans-serif, system-ui, sans-serif"
                      fontWeight="600"
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* ------------------------------------------------------------------- */}
        {/* INTERACTIVE NODE CARDS (ALL 164px HEIGHT, GUARANTEED TAG ROOM)     */}
        {/* ------------------------------------------------------------------- */}
        {NODES.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          const isVisible = isNodeVisibleInFilter(node);

          // Subtle, tasteful borders and glows per node accent
          let accentBorder = 'border-zinc-800/90 hover:border-zinc-700';
          let selectedGlow = 'ring-1 ring-zinc-500 border-zinc-400 shadow-xl';
          let iconColor = 'text-zinc-400';
          let statusDotColor = 'bg-zinc-400';

          if (node.accent === 'sky') {
            accentBorder = 'border-sky-500/30 hover:border-sky-500/70';
            selectedGlow = 'ring-1 ring-sky-500 border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.2)]';
            iconColor = 'text-sky-400';
            statusDotColor = 'bg-sky-400';
          } else if (node.accent === 'purple') {
            accentBorder = 'border-purple-500/30 hover:border-purple-500/70';
            selectedGlow = 'ring-1 ring-purple-500 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]';
            iconColor = 'text-purple-400';
            statusDotColor = 'bg-purple-400';
          } else if (node.accent === 'amber') {
            accentBorder = 'border-amber-500/30 hover:border-amber-500/70';
            selectedGlow = 'ring-1 ring-amber-500 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]';
            iconColor = 'text-amber-400';
            statusDotColor = 'bg-amber-400';
          } else if (node.accent === 'portal') {
            accentBorder = 'border-zinc-700/80 hover:border-zinc-500';
            selectedGlow = 'ring-1 ring-zinc-400 border-zinc-300 shadow-[0_0_20px_rgba(255,255,255,0.08)]';
            iconColor = 'text-zinc-200';
            statusDotColor = 'bg-emerald-400';
          } else if (node.accent === 'slate') {
            accentBorder = 'border-zinc-800 hover:border-zinc-700';
            selectedGlow = 'ring-1 ring-zinc-500 border-zinc-400 shadow-xl';
            iconColor = 'text-zinc-400';
            statusDotColor = 'bg-blue-400';
          }

          const visibleTechCount = node.width > 350 ? 4 : 3;

          return (
            <div
              key={node.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(node);
              }}
              style={{
                position: 'absolute',
                left: `${node.x}px`,
                top: `${node.y}px`,
                width: `${node.width}px`,
                height: `${node.height}px`,
                opacity: isVisible ? 1 : 0.25,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              className={`group flex flex-col justify-between rounded-xl border bg-[#111114] px-4 py-3.5 transition-all duration-200 cursor-pointer shadow-xl ${
                isSelected
                  ? `z-30 scale-[1.02] bg-[#16161a] ${selectedGlow}`
                  : `z-20 ${accentBorder} hover:bg-[#151518]`
              }`}
            >
              {/* Card Top: Category & Status Badge */}
              <div className="shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase truncate">
                    {node.category}
                  </span>
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-[#16161c] px-2 py-0.5 text-[9.5px] font-medium text-zinc-300 leading-none">
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${statusDotColor}`}
                      style={{ animation: 'pulseBadge 2.5s infinite' }}
                    />
                    <span>{node.status}</span>
                  </span>
                </div>

                {/* Card Title & Icon */}
                <h4 className="mt-2 flex items-center gap-2 text-sm font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
                  {node.accent === 'portal' && (
                    <CloudLightning className="h-4 w-4 shrink-0 text-tempest" />
                  )}
                  {node.accent === 'sky' && (
                    <Radio className={`h-4 w-4 shrink-0 ${iconColor}`} />
                  )}
                  {node.accent === 'purple' && <Cpu className={`h-4 w-4 shrink-0 ${iconColor}`} />}
                  {node.accent === 'amber' && (
                    <ShieldAlert className={`h-4 w-4 shrink-0 ${iconColor}`} />
                  )}
                  {node.accent === 'slate' && (
                    <HardDrive className={`h-4 w-4 shrink-0 ${iconColor}`} />
                  )}
                  <span className="truncate">{node.title}</span>
                </h4>

                {/* Description with comfortable line height */}
                <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-zinc-400">
                  {node.description}
                </p>
              </div>

              {/* Technologies chip tags pinned to bottom - ALWAYS VISIBLE, NEVER SQUEEZED */}
              <div className="mt-auto shrink-0 pt-2 flex items-center gap-1.5 flex-wrap">
                {node.tech.slice(0, visibleTechCount).map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[9.5px] font-medium leading-none text-zinc-200 bg-zinc-800/90 border border-zinc-700/70 shadow-xs"
                  >
                    {t}
                  </span>
                ))}
                {node.tech.length > visibleTechCount && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md font-mono text-[9.5px] font-medium leading-none text-zinc-400 bg-zinc-800/60 border border-zinc-700/50">
                    +{node.tech.length - visibleTechCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* SELECTED NODE INSPECTOR DRAWER (SPACIOUS & WRAP-SAFE)                 */}
      {/* --------------------------------------------------------------------- */}
      {selectedNode && (
        <div className="absolute bottom-4 right-4 z-40 w-88 max-w-[calc(100%-2rem)] rounded-xl border border-zinc-800 bg-[#121215]/95 p-4.5 text-xs backdrop-blur-md shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3">
          <div className="flex items-start justify-between border-b border-zinc-800/80 pb-2.5">
            <div>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                {selectedNode.category}
              </span>
              <h4 className="text-sm font-bold text-white">{selectedNode.title}</h4>
            </div>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
              title="Close details"
            >
              ✕
            </button>
          </div>

          <p className="mt-2.5 leading-relaxed text-zinc-400">
            {selectedNode.description}
          </p>

          <div className="mt-3.5 space-y-2 border-t border-zinc-800/60 pt-3">
            {selectedNode.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between items-start gap-2 text-[11px]">
                <span className="text-zinc-400 shrink-0 font-medium">{spec.label}</span>
                <span className="font-mono font-medium text-zinc-200 text-right break-all">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3.5 border-t border-zinc-800/60 pt-3">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Tech Stack</span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selectedNode.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] font-medium leading-none text-zinc-200 bg-zinc-800/90 border border-zinc-700/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
