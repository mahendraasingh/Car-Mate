import React from 'react';
import { colors } from '../../theme/tokens';
import type { VehicleCategory, VehicleOption } from '../../types/passenger';
import { Users, Clock, Check, Sparkles } from 'lucide-react';

interface VehicleSelectionProps {
  selectedCategory: VehicleCategory;
  onSelectCategory: (category: VehicleCategory) => void;
  distanceKm?: number;
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'auto',
    name: 'Auto',
    hindiName: 'ऑटो',
    categoryTitle: 'GULLY MASTER',
    description: 'Quick point-to-point rickshaw for short city hops with zero surge.',
    capacity: '3 seats',
    demoBaseFare: 29,
    demoPerKmRate: 11,
    estimatedArrivalMin: 2,
    accentColor: colors.doodleYellow,
    badgeText: 'Zero Surge',
  },
  {
    id: 'small_cab',
    name: 'Small Cab',
    hindiName: 'मिनी',
    categoryTitle: 'ECONOMICAL CAR',
    description: 'Budget hatchback with chilled AC for affordable solo commutes.',
    capacity: '4 seats',
    demoBaseFare: 49,
    demoPerKmRate: 14,
    estimatedArrivalMin: 4,
    accentColor: '#E2F0D9',
    badgeText: 'Value Pick',
  },
  {
    id: 'compact_cab',
    name: 'Compact Cab',
    hindiName: 'प्राइम',
    categoryTitle: 'EVERYDAY SEDAN',
    description: 'Spacious sedan with top-rated captains for business & airport trips.',
    capacity: '4 seats',
    demoBaseFare: 69,
    demoPerKmRate: 17,
    estimatedArrivalMin: 3,
    accentColor: colors.pureWhite,
    badgeText: 'Top Rated',
  },
  {
    id: 'suv',
    name: 'SUV',
    hindiName: 'एक्सएल',
    categoryTitle: 'EXTRA CAPACITY',
    description: 'Spacious 6-seater with extra boot space for family & luggage.',
    capacity: '6 seats',
    demoBaseFare: 99,
    demoPerKmRate: 23,
    estimatedArrivalMin: 6,
    accentColor: colors.freshLime,
    badgeText: 'Extra Room',
  },
];

export const VehicleSelection: React.FC<VehicleSelectionProps> = ({
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
            }}
          >
            AVAILABLE RIDE TIERS
          </span>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 800,
              backgroundColor: colors.freshLime,
              color: colors.deepForest,
              padding: '1px 6px',
              borderRadius: '6px',
              border: `1px solid ${colors.deepForest}`,
            }}
          >
            DEMO FARES
          </span>
        </div>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: colors.mutedGrey,
          }}
        >
          {distanceKm.toFixed(1)} km estimated route
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
        {VEHICLE_OPTIONS.map((option) => {
          const isSelected = selectedCategory === option.id;
          // Calculate estimated demo fare: baseFare + (distance * perKmRate)
          const calculatedDemoFare = Math.round(option.demoBaseFare + distanceKm * option.demoPerKmRate);

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
                      {option.name}
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
                        backgroundColor: option.id === 'auto' ? colors.doodleYellow : colors.freshLime,
                        color: colors.deepForest,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        border: `1px solid ${colors.deepForest}`,
                      }}
                    >
                      {option.badgeText}
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
                    {option.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: colors.deepForest }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 700 }}>
                      <Clock size={11} color={colors.deepForest} />
                      {option.estimatedArrivalMin} min away
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '10px', fontWeight: 700 }}>
                      <Users size={11} color={colors.deepForest} />
                      {option.capacity}
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
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: colors.deepForest,
                  }}
                >
                  ₹{calculatedDemoFare}
                </span>
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
        <span>Fares shown are demo estimates based on distance. No hidden surge.</span>
      </div>
    </div>
  );
};
