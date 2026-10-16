import React, { useMemo } from 'react';
import { colors, shadows } from '../../theme/tokens';
import type { MapPoint } from '../../types/map';
import type { DriverTripLifecycleState } from '../../types/driver';
import type { VehicleCategory } from '../../types/passenger';
import { Navigation, MapPin } from 'lucide-react';

interface DriverNavigationMapProps {
  state: DriverTripLifecycleState;
  pickup?: MapPoint | null;
  destination?: MapPoint | null;
  progressPercent: number; // 0 to 1
  vehicleCategory?: VehicleCategory;
  isOnline: boolean;
  style?: React.CSSProperties;
}

export const DriverNavigationMap: React.FC<DriverNavigationMapProps> = ({
  state,
  pickup,
  destination,
  progressPercent,
  vehicleCategory = 'compact_cab',
  isOnline,
  style,
}) => {
  const width = 420;
  const height = 280;

  // Key schematic road coordinate anchors
  // Base driver station: (310, 230)
  // Pickup anchor: (100, 190)
  // Destination anchor: (320, 60)
  const driverBasePos = useMemo(() => ({ x: 320, y: 220 }), []);
  const pickupPos = useMemo(() => ({ x: 95, y: 185 }), []);
  const destPos = useMemo(() => ({ x: 325, y: 65 }), []);

  // Approach curve: Driver Base -> Pickup
  const approachPath = useMemo(() => {
    return `M ${driverBasePos.x} ${driverBasePos.y} C 240 260, 160 230, ${pickupPos.x} ${pickupPos.y}`;
  }, [driverBasePos, pickupPos]);

  // Main Trip curve: Pickup -> Destination
  const tripPath = useMemo(() => {
    return `M ${pickupPos.x} ${pickupPos.y} C 110 90, 230 140, ${destPos.x} ${destPos.y}`;
  }, [pickupPos, destPos]);

  // Current interpolated driver coordinates & rotation
  const currentVehicle = useMemo(() => {
    const t = Math.max(0, Math.min(1, progressPercent));

    if (state === 'approaching_pickup') {
      // Approach path bezier interpolation
      const u = 1 - t;
      const x = u * u * u * driverBasePos.x + 3 * u * u * t * 240 + 3 * u * t * t * 160 + t * t * t * pickupPos.x;
      const y = u * u * u * driverBasePos.y + 3 * u * u * t * 260 + 3 * u * t * t * 230 + t * t * t * pickupPos.y;
      // Heading towards pickup (roughly -135deg)
      const angle = -135;
      return { x, y, angle };
    }

    if (state === 'arrived_at_pickup') {
      return { x: pickupPos.x, y: pickupPos.y, angle: -45 };
    }

    if (state === 'trip_started' || state === 'trip_in_progress') {
      // Trip path bezier interpolation
      const u = 1 - t;
      const x = u * u * u * pickupPos.x + 3 * u * u * t * 110 + 3 * u * t * t * 230 + t * t * t * destPos.x;
      const y = u * u * u * pickupPos.y + 3 * u * u * t * 90 + 3 * u * t * t * 140 + t * t * t * destPos.y;
      const angle = 45; // heading toward northeast destination
      return { x, y, angle };
    }

    if (state === 'trip_completed') {
      return { x: destPos.x, y: destPos.y, angle: 45 };
    }

    // Default standby location
    return { x: driverBasePos.x, y: driverBasePos.y, angle: -90 };
  }, [state, progressPercent, driverBasePos, pickupPos, destPos]);

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
        boxShadow: shadows.doodleSticker,
        boxSizing: 'border-box',
        userSelect: 'none',
        ...style,
      }}
      role="img"
      aria-label="Schematic Commercial Driver Navigation Map"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      >
        <defs>
          {/* Schematic city grid pattern */}
          <pattern id="driverUrbanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#E8E4D9" />
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DBD5C6" strokeWidth="1.2" />
          </pattern>

          {/* Glow filter */}
          <filter id="driverRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#172B2A" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Urban grid base */}
        <rect width={width} height={height} fill="url(#driverUrbanGrid)" />

        {/* Major schematic road arteries */}
        <path d="M -10 140 L 430 140" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
        <path d="M -10 140 L 430 140" stroke="#CFC8B8" strokeWidth="2" strokeDasharray="8 6" />

        <path d="M 210 -10 L 210 290" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
        <path d="M 210 -10 L 210 290" stroke="#CFC8B8" strokeWidth="2" strokeDasharray="8 6" />

        {/* Ring Road diagonal bypass */}
        <path d="M 40 270 Q 180 180 380 40" stroke="#F4F1E8" strokeWidth="20" fill="none" opacity="0.8" />

        {/* Active Route Path depending on lifecycle */}
        {state === 'approaching_pickup' && (
          <path
            d={approachPath}
            stroke={colors.freshLime}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            filter="url(#driverRouteGlow)"
            strokeDasharray="7 5"
          />
        )}

        {(state === 'trip_started' || state === 'trip_in_progress' || state === 'trip_completed') && (
          <path
            d={tripPath}
            stroke={colors.doodleBlue}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            filter="url(#driverRouteGlow)"
          />
        )}

        {/* Pickup Pin Marker */}
        {(state !== 'idle' && pickup) && (
          <g transform={`translate(${pickupPos.x}, ${pickupPos.y})`}>
            {/* Pulsing ring when arrived */}
            {state === 'arrived_at_pickup' && (
              <circle cx="0" cy="0" r="22" fill={colors.freshLime} opacity="0.35">
                <animate attributeName="r" values="16;28;16" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx="0" cy="0" r="14" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="6" fill={colors.freshLime} />
            <text
              x="0"
              y="26"
              textAnchor="middle"
              fill={colors.deepForest}
              fontSize="10"
              fontWeight="800"
              fontFamily="var(--font-display)"
            >
              PICKUP
            </text>
          </g>
        )}

        {/* Destination Pin Marker */}
        {(destination && (state === 'trip_started' || state === 'trip_in_progress' || state === 'trip_completed' || state === 'request_received')) && (
          <g transform={`translate(${destPos.x}, ${destPos.y})`}>
            <circle cx="0" cy="0" r="14" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="6" fill={colors.doodleCoral} />
            <text
              x="0"
              y="26"
              textAnchor="middle"
              fill={colors.deepForest}
              fontSize="10"
              fontWeight="800"
              fontFamily="var(--font-display)"
            >
              DESTINATION
            </text>
          </g>
        )}

        {/* Driver Vehicle Live Marker */}
        <g
          transform={`translate(${currentVehicle.x}, ${currentVehicle.y}) rotate(${currentVehicle.angle})`}
          style={{ transition: 'transform 0.25s linear' }}
        >
          {/* Radar ripple if online */}
          {isOnline && (
            <circle cx="0" cy="0" r="20" fill="none" stroke={colors.freshLime} strokeWidth="2" opacity="0.6">
              <animate attributeName="r" values="12;26;12" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Vehicle Outer Puck */}
          <circle
            cx="0"
            cy="0"
            r="16"
            fill={colors.deepForest}
            stroke={isOnline ? colors.freshLime : '#94A3B8'}
            strokeWidth="2.5"
            filter="url(#driverRouteGlow)"
          />

          {/* Direction indicator arrow */}
          <polygon points="0,-12 6,-2 0,-5 -6,-2" fill={colors.freshLime} />

          {/* Central Dot */}
          <circle cx="0" cy="2" r="4.5" fill={colors.pureWhite} />
        </g>
      </svg>

      {/* Top HUD Status Badge */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(23, 43, 42, 0.88)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201, 243, 106, 0.4)',
            color: colors.pureWhite,
            fontSize: '10px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Navigation size={11} color={colors.freshLime} />
          <span>
            {state === 'idle' && (isOnline ? 'GPS ACTIVE • PATROLLING' : 'OFFLINE • STANDBY')}
            {state === 'request_received' && 'NEW DISPATCH INCOMING'}
            {state === 'approaching_pickup' && 'EN ROUTE TO COMMUTER PICKUP'}
            {state === 'arrived_at_pickup' && 'ARRIVED AT PICKUP LOCATION'}
            {state === 'trip_in_progress' && 'COMMERCIAL TRIP IN PROGRESS'}
            {state === 'trip_completed' && 'JOURNEY SAFELY COMPLETED'}
          </span>
        </div>

        <div
          style={{
            padding: '4px 8px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: `1px solid ${colors.deepForest}`,
            fontSize: '9px',
            fontWeight: 800,
            color: colors.deepForest,
          }}
        >
          SCHEMATIC DEMO
        </div>
      </div>

      {/* Bottom Route Indicator Pill */}
      {state !== 'idle' && (
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '12px',
            right: '12px',
            padding: '6px 10px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.94)',
            border: `1.5px solid ${colors.deepForest}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            fontWeight: 700,
            color: colors.deepForest,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
            <MapPin size={13} color={colors.doodleCoral} style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {state === 'approaching_pickup' && (pickup?.name || 'Pickup Point')}
              {state === 'arrived_at_pickup' && 'At Pickup • Passenger Boarding'}
              {(state === 'trip_in_progress' || state === 'trip_completed') && (destination?.name || 'Destination')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 800,
                padding: '2px 5px',
                borderRadius: '4px',
                backgroundColor: '#EDE9DE',
                color: colors.deepForest,
                textTransform: 'uppercase',
              }}
            >
              {vehicleCategory === 'auto' ? 'AUTO' : 'CAB'}
            </span>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '6px',
                backgroundColor: colors.freshLime,
                color: colors.deepForest,
              }}
            >
              {Math.round(progressPercent * 100)}% Route
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
