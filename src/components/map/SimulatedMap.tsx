import React, { useMemo } from 'react';
import { colors } from '../../theme/tokens';
import type { MapAdapterProps } from '../../types/map';
import { Navigation } from 'lucide-react';

export const SimulatedMap: React.FC<MapAdapterProps> = ({
  mode,
  pickup,
  destination,
  driverMarker,
  progressPercent = 0,
  rideMode = 'solo',
  style,
}) => {
  // SVG Canvas dimensions: 400x320
  const width = 400;
  const height = 300;

  // Coordinate projections for the schematic urban grid
  // Pickup default: (80, 220), Destination default: (320, 80)
  const pickupPos = useMemo(() => ({ x: 85, y: 215 }), []);
  const destPos = useMemo(() => ({ x: 315, y: 85 }), []);
  const driverStartPos = useMemo(() => ({ x: 260, y: 265 }), []);

  // Approach curve from driver starting spot to pickup
  const approachPath = useMemo(() => {
    return `M ${driverStartPos.x} ${driverStartPos.y} C 200 280, 140 250, ${pickupPos.x} ${pickupPos.y}`;
  }, [driverStartPos, pickupPos]);

  // Main trip route curve from pickup to destination
  const tripPath = useMemo(() => {
    return `M ${pickupPos.x} ${pickupPos.y} C 120 120, 240 180, ${destPos.x} ${destPos.y}`;
  }, [pickupPos, destPos]);

  // Interpolated driver position based on mode & progressPercent (0 to 1)
  const currentDriverPos = useMemo(() => {
    const t = Math.max(0, Math.min(1, progressPercent));

    if (mode === 'driver_approaching') {
      // Bezier interpolation along approach curve
      // P0=(260,265), P1=(200,280), P2=(140,250), P3=(85,215)
      const u = 1 - t;
      const x = u * u * u * 260 + 3 * u * u * t * 200 + 3 * u * t * t * 140 + t * t * t * pickupPos.x;
      const y = u * u * u * 265 + 3 * u * u * t * 280 + 3 * u * t * t * 250 + t * t * t * pickupPos.y;
      const angle = -140; // pointing northwest toward pickup
      return { x, y, angle };
    }

    if (mode === 'trip_active' || mode === 'trip_completed') {
      // Bezier interpolation along trip curve
      // P0=(85,215), P1=(120,120), P2=(240,180), P3=(315,85)
      const u = 1 - t;
      const x = u * u * u * pickupPos.x + 3 * u * u * t * 120 + 3 * u * t * t * 240 + t * t * t * destPos.x;
      const y = u * u * u * pickupPos.y + 3 * u * u * t * 120 + 3 * u * t * t * 180 + t * t * t * destPos.y;
      const angle = 45; // pointing northeast toward destination
      return { x, y, angle };
    }

    // Default driver position near pickup
    return { x: driverStartPos.x, y: driverStartPos.y, angle: -110 };
  }, [mode, progressPercent, pickupPos, destPos, driverStartPos]);

  return (
    <div
      style={{
        width: '100%',
        height: '240px',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#EAE6DB',
        border: `2px solid ${colors.deepForest}`,
        boxShadow: '1px 3px 0px #172B2A',
        boxSizing: 'border-box',
        ...style,
      }}
      aria-label="Interactive Simulated Urban Map"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          userSelect: 'none',
        }}
      >
        {/* Background Urban Blocks / Schematic Road Grid */}
        <defs>
          <pattern id="urbanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#E8E4D9" />
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DBD5C6" strokeWidth="1.5" />
          </pattern>

          {/* Glow filter for route line */}
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#172B2A" floodOpacity="0.25" />
          </filter>
        </defs>

        <rect width={width} height={height} fill="url(#urbanGrid)" />

        {/* Primary City Arterial Roads */}
        <path d="M -20 160 Q 180 130, 420 170" stroke="#FFFFFF" strokeWidth="16" fill="none" />
        <path d="M -20 160 Q 180 130, 420 170" stroke="#D3CDC0" strokeWidth="2" strokeDasharray="6 6" fill="none" />

        <path d="M 160 -20 Q 190 140, 210 320" stroke="#FFFFFF" strokeWidth="14" fill="none" />
        <path d="M 160 -20 Q 190 140, 210 320" stroke="#D3CDC0" strokeWidth="2" strokeDasharray="6 6" fill="none" />

        <path d="M 40 40 Q 220 220, 380 260" stroke="#FFFFFF" strokeWidth="12" fill="none" />

        {/* Green Parks / Landmark Zones */}
        <rect x="20" y="20" width="70" height="50" rx="12" fill="#D8ECD5" stroke="#C2DFC0" strokeWidth="1.5" />
        <text x="55" y="48" fontSize="9" fontWeight="700" fill="#4B6E4A" textAnchor="middle" fontFamily="sans-serif">
          CITY PARK
        </text>

        <rect x="280" y="190" width="90" height="60" rx="14" fill="#E5DFD0" stroke="#D3CDC0" strokeWidth="1.5" />
        <text x="325" y="224" fontSize="9" fontWeight="700" fill="#756E61" textAnchor="middle" fontFamily="sans-serif">
          METRO HUB
        </text>

        {/* DRIVER APPROACH ROUTE (When driver is travelling to pickup) */}
        {mode === 'driver_approaching' && (
          <path
            d={approachPath}
            fill="none"
            stroke={colors.doodleBlue}
            strokeWidth="4.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
            filter="url(#routeGlow)"
          />
        )}

        {/* ACTIVE MAIN TRIP ROUTE (Overview, In-Trip, Completed) */}
        {(mode === 'route_overview' || mode === 'trip_active' || mode === 'trip_completed') && (
          <>
            {/* Background Route Glow */}
            <path
              d={tripPath}
              fill="none"
              stroke="#0E1C1B"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.3"
            />
            {/* High-visibility Lime Trip Route */}
            <path
              d={tripPath}
              fill="none"
              stroke={colors.freshLime}
              strokeWidth="4.5"
              strokeLinecap="round"
              filter="url(#routeGlow)"
            />
            {/* Progress indicator along route if active */}
            {mode === 'trip_active' && (
              <path
                d={tripPath}
                fill="none"
                stroke={colors.deepForest}
                strokeWidth="4.5"
                strokeDasharray={`${progressPercent * 280} 500`}
                strokeLinecap="round"
              />
            )}
          </>
        )}

        {/* PICKUP POINT MARKER */}
        <g transform={`translate(${pickupPos.x}, ${pickupPos.y})`}>
          {/* Pulsing beacon circle */}
          <circle cx="0" cy="0" r="16" fill="rgba(34, 197, 94, 0.22)" stroke="#22C55E" strokeWidth="1.5">
            <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Pin body */}
          <circle cx="0" cy="0" r="10" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="2.5" />
          <circle cx="0" cy="0" r="4" fill={colors.freshLime} />
          {/* Label Pill */}
          <rect x="-34" y="-30" width="68" height="18" rx="9" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="1.5" />
          <text x="0" y="-18" fontSize="8" fontWeight="800" fill={colors.deepForest} textAnchor="middle" fontFamily="sans-serif">
            {pickup ? 'PICKUP' : 'YOU'}
          </text>
        </g>

        {/* DESTINATION POINT MARKER */}
        {(mode === 'route_overview' || mode === 'trip_active' || mode === 'trip_completed') && (
          <g transform={`translate(${destPos.x}, ${destPos.y})`}>
            {/* Coral Pin body */}
            <circle cx="0" cy="0" r="11" fill={colors.doodleCoral} stroke={colors.pureWhite} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4" fill={colors.pureWhite} />
            {/* Label Pill */}
            <rect x="-28" y="-30" width="56" height="18" rx="9" fill={colors.deepForest} stroke={colors.pureWhite} strokeWidth="1.5" />
            <text x="0" y="-18" fontSize="8" fontWeight="800" fill={colors.pureWhite} textAnchor="middle" fontFamily="sans-serif">
              {destination ? 'DROP' : 'DEST'}
            </text>
          </g>
        )}

        {/* SHARED RIDE CO-RIDER WAYPOINT NODE */}
        {rideMode === 'shared' && (mode === 'route_overview' || mode === 'trip_active' || mode === 'trip_completed') && (
          <g transform="translate(195, 145)">
            <circle cx="0" cy="0" r="14" fill={colors.freshLime} stroke={colors.deepForest} strokeWidth="2" />
            <circle cx="-3" cy="-2" r="2" fill={colors.deepForest} />
            <circle cx="3" cy="-2" r="2" fill={colors.deepForest} />
            <path d="M-4 3 Q 0 7, 4 3" stroke={colors.deepForest} strokeWidth="1.5" fill="none" />
            <rect x="-38" y="16" width="76" height="15" rx="7.5" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="1.2" />
            <text x="0" y="27" fontSize="7" fontWeight="800" fill={colors.deepForest} textAnchor="middle" fontFamily="sans-serif">
              CO-RIDER POOL
            </text>
          </g>
        )}

        {/* ANIMATED DRIVER VEHICLE MARKER */}
        {(mode === 'driver_approaching' || mode === 'trip_active' || mode === 'trip_completed') && (
          <g
            transform={`translate(${currentDriverPos.x}, ${currentDriverPos.y})`}
            style={{ transition: 'transform 0.25s linear' }}
          >
            {/* White outline halo */}
            <circle cx="0" cy="0" r="16" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
            {/* Center Vehicle Color Badge */}
            <circle
              cx="0"
              cy="0"
              r="12"
              fill={driverMarker?.category === 'auto' ? colors.doodleYellow : colors.freshLime}
            />
            {/* Vehicle Icon / Heading Indicator */}
            <g transform={`rotate(${currentDriverPos.angle})`}>
              <polygon points="0,-7 5,6 0,3 -5,6" fill={colors.deepForest} />
            </g>
          </g>
        )}

        {/* AMBIENT NEARBY CABS / AUTOS (Idle Mode) */}
        {mode === 'idle' && (
          <>
            <g transform="translate(180, 160)">
              <circle cx="0" cy="0" r="10" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="6" fill={colors.doodleYellow} />
            </g>
            <g transform="translate(240, 90)">
              <circle cx="0" cy="0" r="10" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="6" fill={colors.freshLime} />
            </g>
            <g transform="translate(130, 240)">
              <circle cx="0" cy="0" r="10" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="6" fill={colors.doodleYellow} />
            </g>
          </>
        )}
      </svg>

      {/* Floating Map Mode Badge */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          border: `1.5px solid ${colors.deepForest}`,
          borderRadius: '9999px',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '10px',
          fontWeight: 800,
          color: colors.deepForest,
          fontFamily: 'var(--font-display)',
          boxShadow: '1px 2px 0px #172B2A',
        }}
      >
        <Navigation size={11} color={colors.deepForest} />
        <span>
          {mode === 'idle' && 'LIVE METRO RADAR'}
          {mode === 'route_overview' && 'SIMULATED DEMO ROUTE'}
          {mode === 'driver_approaching' && 'DRIVER EN ROUTE TO PICKUP'}
          {mode === 'trip_active' && 'TRIP IN PROGRESS'}
          {mode === 'trip_completed' && 'ARRIVED AT DESTINATION'}
        </span>
      </div>

      {/* Demo Map Watermark Tag */}
      <div
        style={{
          position: 'absolute',
          bottom: '8px',
          right: '10px',
          backgroundColor: 'rgba(23, 43, 42, 0.8)',
          borderRadius: '6px',
          padding: '2px 6px',
          fontSize: '9px',
          fontWeight: 700,
          color: colors.pureWhite,
          letterSpacing: '0.4px',
        }}
      >
        Simulated Vector Map • Replaceable
      </div>
    </div>
  );
};
