import React from 'react';
import { colors } from '../../theme/tokens';
import type { VehicleCategory, RideMode } from '../../types/passenger';
import { Users, User, Clock, Check, Sparkles, Leaf, Zap } from 'lucide-react';

interface VehicleSelectionProps {
  rideMode: RideMode;
  onSelectRideMode: (mode: RideMode) => void;
  selectedCategory: VehicleCategory;
  onSelectCategory: (category: VehicleCategory) => void;
  distanceKm?: number;
}

interface DynamicTierConfig {
  id: VehicleCategory;
  name: string;
  hindiName: string;
  soloTitle: string;
  sharedTitle: string;
  soloDesc: string;
  sharedDesc: string;
  soloCapacity: string;
  sharedCapacity: string;
  baseFare: number;
  perKmRate: number;
  sharedBaseFare: number;
  sharedPerKmRate: number;
  arrivalMin: number;
  accentColor: string;
  soloBadge: string;
  sharedBadge: string;
}

const VEHICLE_CONFIGS: DynamicTierConfig[] = [
  {
    id: 'auto',
    name: 'Auto',
    hindiName: 'ऑटो',
    soloTitle: 'SOLO AUTO',
    sharedTitle: 'SHARED AUTO',
    soloDesc: 'Direct point-to-point rickshaw for quick city hops with zero surge.',
    sharedDesc: 'Share route seat with a co-rider along the way when available.',
    soloCapacity: '3 seats',
    sharedCapacity: '1-2 seats',
    baseFare: 29,
    perKmRate: 11,
    sharedBaseFare: 22,
    sharedPerKmRate: 8,
    arrivalMin: 2,
    accentColor: colors.doodleYellow,
    soloBadge: 'Zero Surge',
    sharedBadge: 'Shared Auto',
  },
  {
    id: 'small_cab',
    name: 'Small Cab',
    hindiName: 'मिनी',
    soloTitle: 'SOLO HATCHBACK',
    sharedTitle: 'POOL HATCHBACK',
    soloDesc: 'Private budget hatchback with chilled AC for affordable solo commutes.',
    sharedDesc: 'Pool with a verified commuter heading in the same direction.',
    soloCapacity: '4 seats',
    sharedCapacity: '1-2 seats',
    baseFare: 49,
    perKmRate: 14,
    sharedBaseFare: 36,
    sharedPerKmRate: 10,
    arrivalMin: 4,
    accentColor: '#E2F0D9',
    soloBadge: 'Value Pick',
    sharedBadge: 'Carpool',
  },
  {
    id: 'compact_cab',
    name: 'Compact Cab',
    hindiName: 'प्राइम',
    soloTitle: 'SOLO SEDAN',
    sharedTitle: 'SMART CARPOOL',
    soloDesc: 'Private spacious sedan with top-rated captains for business & airport.',
    sharedDesc: 'Comfortable shared sedan carpool with verified corporate commuters.',
    soloCapacity: '4 seats',
    sharedCapacity: '1-2 seats',
    baseFare: 69,
    perKmRate: 17,
    sharedBaseFare: 52,
    sharedPerKmRate: 12,
    arrivalMin: 3,
    accentColor: colors.pureWhite,
    soloBadge: 'Top Rated',
    sharedBadge: 'Eco Sedan',
  },
  {
    id: 'suv',
    name: 'SUV',
    hindiName: 'एक्सएल',
    soloTitle: 'SOLO SUV',
    sharedTitle: 'SHARED SUV',
    soloDesc: 'Private spacious 6-seater with huge boot space for family & luggage.',
    sharedDesc: 'Group ride-pooling with extra legroom and dedicated co-rider seats.',
    soloCapacity: '6 seats',
    sharedCapacity: '1-3 seats',
    baseFare: 99,
    perKmRate: 23,
    sharedBaseFare: 74,
    sharedPerKmRate: 16,
    arrivalMin: 6,
    accentColor: colors.freshLime,
    soloBadge: 'Extra Room',
    sharedBadge: 'Group Pool',
  },
];

export const VehicleSelection: React.FC<VehicleSelectionProps> = ({
  rideMode,
  onSelectRideMode,
  selectedCategory,
  onSelectCategory,
  distanceKm = 5.2,
}) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
      role="radiogroup"
      aria-label="Vehicle Categories"
    >
      {/* 1. Solo vs Shared Ride Mode Selector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          backgroundColor: colors.warmIvory,
          border: `2px solid ${colors.deepForest}`,
          borderRadius: '16px',
          padding: '4px',
          boxShadow: '1px 2px 0px #172B2A',
        }}
      >
        {/* Solo Ride Button */}
        <button
          type="button"
          onClick={() => onSelectRideMode('solo')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px 10px',
            borderRadius: '12px',
            border: rideMode === 'solo' ? `2px solid ${colors.deepForest}` : '1.5px solid transparent',
            backgroundColor: rideMode === 'solo' ? colors.pureWhite : 'transparent',
            color: colors.deepForest,
            cursor: 'pointer',
            boxShadow: rideMode === 'solo' ? '1px 2px 0px #172B2A' : 'none',
            transition: 'all 0.18s ease',
          }}
        >
          <User size={15} color={colors.deepForest} strokeWidth={2.4} />
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              Solo Ride
            </div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: colors.mutedGrey }}>
              Private • Direct
            </div>
          </div>
        </button>

        {/* Shared Ride Button */}
        <button
          type="button"
          onClick={() => onSelectRideMode('shared')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '8px 10px',
            borderRadius: '12px',
            border: rideMode === 'shared' ? `2px solid ${colors.deepForest}` : '1.5px solid transparent',
            backgroundColor: rideMode === 'shared' ? colors.freshLime : 'transparent',
            color: colors.deepForest,
            cursor: 'pointer',
            boxShadow: rideMode === 'shared' ? '1px 2px 0px #172B2A' : 'none',
            position: 'relative',
            transition: 'all 0.18s ease',
          }}
        >
          <Users size={15} color={colors.deepForest} strokeWidth={2.4} />
          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 800,
                lineHeight: 1.1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Shared Ride</span>
              <span
                style={{
                  fontSize: '8px',
                  fontWeight: 800,
                  backgroundColor: colors.deepForest,
                  color: colors.freshLime,
                  padding: '1px 4px',
                  borderRadius: '4px',
                }}
              >
                POOL
              </span>
            </div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: colors.deepForest }}>
              Co-rider Sharing
            </div>
          </div>
        </button>
      </div>

      {/* Mode Sub-banner Info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {rideMode === 'shared' ? (
            <Leaf size={12} color="#166534" />
          ) : (
            <Zap size={12} color={colors.deepForest} />
          )}
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {rideMode === 'shared' ? 'SHARED RIDE TIERS (CO-RIDER POOLING)' : 'SOLO TIERS (DIRECT DISPATCH)'}
          </span>
        </div>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: colors.mutedGrey,
          }}
        >
          {distanceKm.toFixed(1)} km route
        </span>
      </div>

      {/* Vehicle Cards Grid */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
        }}
      >
        {VEHICLE_CONFIGS.map((option) => {
          const isSelected = selectedCategory === option.id;
          // Calculate fare based on mode
          const fare = rideMode === 'shared'
            ? Math.round(option.sharedBaseFare + distanceKm * option.sharedPerKmRate)
            : Math.round(option.baseFare + distanceKm * option.perKmRate);

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectCategory(option.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '16px',
                backgroundColor: isSelected ? '#FAF8F3' : colors.pureWhite,
                border: isSelected
                  ? `2px solid ${colors.deepForest}`
                  : `1.5px solid ${colors.softBorder}`,
                boxShadow: isSelected ? '1px 3px 0px #172B2A' : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative',
                transform: isSelected ? 'translateY(-1.5px)' : 'none',
                transition: 'all 0.18s ease',
              }}
            >
              {/* Left Column: Custom SVG Vehicle Illustration + Details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                {/* Custom SVG Vehicle Badge */}
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: option.accentColor,
                    border: `1.5px solid ${colors.deepForest}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '1px 1px 0px #172B2A',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {/* AUTO SVG */}
                  {option.id === 'auto' && (
                    <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                      <path d="M 6 15 L 12 28 L 34 28 L 35 15 L 28 8 L 14 8 Z" fill={colors.deepForest} stroke={colors.deepForest} strokeWidth="1" />
                      <path d="M 12 8 Q 22 5, 28 8 L 27 12 L 12 12 Z" fill={colors.doodleYellow} />
                      <circle cx="12" cy="28" r="4" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                      <circle cx="28" cy="28" r="4" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                    </svg>
                  )}

                  {/* SMALL CAB SVG */}
                  {option.id === 'small_cab' && (
                    <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                      <path d="M 6 20 C 10 14, 15 12, 22 12 L 28 14 C 33 16, 35 18, 35 24 L 5 24 Z" fill={colors.deepForest} />
                      <rect x="16" y="8" width="8" height="3" rx="1.5" fill={colors.freshLime} />
                      <circle cx="12" cy="24" r="4" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                      <circle cx="28" cy="24" r="4" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                    </svg>
                  )}

                  {/* COMPACT CAB (SEDAN) SVG */}
                  {option.id === 'compact_cab' && (
                    <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                      <path d="M 4 22 C 8 16, 14 12, 22 12 L 28 12 C 34 14, 37 18, 37 24 L 3 24 Z" fill={colors.deepForest} />
                      <rect x="17" y="8" width="6" height="3" rx="1" fill={colors.doodleYellow} />
                      <circle cx="11" cy="24" r="4" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                      <circle cx="29" cy="24" r="4" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                    </svg>
                  )}

                  {/* SUV SVG */}
                  {option.id === 'suv' && (
                    <svg viewBox="0 0 40 40" width="30" height="30" fill="none">
                      <path d="M 4 24 L 6 12 L 28 12 L 35 16 L 36 24 Z" fill={colors.deepForest} />
                      <rect x="7" y="14" width="7" height="5" rx="1" fill={colors.pureWhite} />
                      <rect x="16" y="14" width="7" height="5" rx="1" fill={colors.pureWhite} />
                      <circle cx="11" cy="25" r="4.5" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                      <circle cx="29" cy="25" r="4.5" fill={colors.pureWhite} stroke={colors.deepForest} strokeWidth="2" />
                    </svg>
                  )}
                </div>

                {/* Details Column */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '13px',
                        fontWeight: 800,
                        color: colors.deepForest,
                      }}
                    >
                      {rideMode === 'shared' ? `Shared ${option.name}` : option.name}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: colors.mutedGrey,
                      }}
                    >
                      {option.hindiName}
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        backgroundColor: rideMode === 'shared' ? colors.freshLime : (option.id === 'auto' ? colors.doodleYellow : colors.warmIvory),
                        color: colors.deepForest,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        border: `1px solid ${colors.deepForest}`,
                      }}
                    >
                      {rideMode === 'shared' ? option.sharedBadge : option.soloBadge}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '11px',
                      color: colors.mutedGrey,
                      margin: '0 0 3px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {rideMode === 'shared' ? option.sharedDesc : option.soloDesc}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.deepForest }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 700 }}>
                      <Clock size={11} color={colors.deepForest} />
                      {option.arrivalMin} min away
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 700 }}>
                      <Users size={11} color={colors.deepForest} />
                      {rideMode === 'shared' ? option.sharedCapacity : option.soloCapacity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Estimated Fare & Selection Checkmark */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '4px',
                  flexShrink: 0,
                  marginLeft: '8px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '14px',
                      fontWeight: 800,
                      color: colors.deepForest,
                      lineHeight: 1.1,
                    }}
                  >
                    ₹{fare}
                  </span>
                  {rideMode === 'shared' && (
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#166534' }}>
                      Shared Tier
                    </span>
                  )}
                </div>

                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: `1.5px solid ${colors.deepForest}`,
                    backgroundColor: isSelected ? colors.deepForest : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && <Check size={12} color={colors.freshLime} strokeWidth={3} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '0 4px',
          fontSize: '10px',
          color: colors.mutedGrey,
          fontWeight: 600,
        }}
      >
        <Sparkles size={11} color={colors.deepForest} />
        <span>
          {rideMode === 'shared'
            ? 'Shared pooling matches you with verified commuters along your path when available.'
            : 'Solo ride guarantees private point-to-point journey with zero detour.'}
        </span>
      </div>
    </div>
  );
};

export const VEHICLE_OPTIONS = VEHICLE_CONFIGS;
