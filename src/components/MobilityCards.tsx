import React, { useState } from 'react';
import { colors } from '../theme/tokens';
import { Car, Zap, Users, Check } from 'lucide-react';

interface MobilityItem {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  fare: string;
  badge: string;
  icon: React.ReactNode;
  accentColor: string;
}

export const MobilityCards: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('pool');

  const modes: MobilityItem[] = [
    {
      id: 'auto',
      name: 'Auto Rickshaw',
      hindiName: 'ऑटो',
      tagline: 'Zips through city traffic & narrow lanes',
      fare: 'From ₹29',
      badge: 'Zero Surge',
      icon: <Zap size={18} color={colors.deepForest} strokeWidth={2.8} />,
      accentColor: colors.doodleYellow,
    },
    {
      id: 'cab',
      name: 'City Cab',
      hindiName: 'कैब',
      tagline: 'Clean AC sedan for airport & office commutes',
      fare: 'From ₹69',
      badge: 'Top Rated',
      icon: <Car size={18} color={colors.deepForest} strokeWidth={2.8} />,
      accentColor: colors.pureWhite,
    },
    {
      id: 'pool',
      name: 'Ride Pooling',
      hindiName: 'शेयरिंग',
      tagline: 'Share route with verified commuters & save 40%',
      fare: 'From ₹45',
      badge: 'Save 40%',
      icon: <Users size={18} color={colors.deepForest} strokeWidth={2.8} />,
      accentColor: colors.freshLime,
    },
  ];

  return (
    <section
      aria-label="Mobility Modes"
      style={{
        width: '100%',
        margin: '6px 0',
        padding: '0 4px',
        boxSizing: 'border-box',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
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
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            CHOOSE RIDE MODE
          </span>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: colors.freshLime,
              border: `1px solid ${colors.deepForest}`,
            }}
          />
        </div>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: colors.mutedGrey,
          }}
        >
          Tap to preview fare
        </span>
      </div>

      {/* Vertical Mobile App Card Stack */}
      <div
        role="radiogroup"
        aria-label="Select Mobility Service"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
        }}
      >
        {modes.map((item) => {
          const isSelected = selectedMode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedMode(item.id)}
              style={{
                backgroundColor: isSelected ? '#FAF8F3' : colors.pureWhite,
                border: isSelected
                  ? `2px solid ${colors.deepForest}`
                  : `1.5px solid ${colors.softBorder}`,
                borderRadius: '18px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative',
                boxShadow: isSelected ? '1px 3px 0px #172B2A' : 'none',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                transition: 'all 0.18s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                {/* Mode Icon */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    backgroundColor: item.accentColor,
                    border: `1.5px solid ${colors.deepForest}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '1px 1px 0px #172B2A',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '14px',
                        fontWeight: 800,
                        color: colors.deepForest,
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 700,
                        color: colors.mutedGrey,
                      }}
                    >
                      {item.hindiName}
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        padding: '1px 6px',
                        borderRadius: '6px',
                        backgroundColor: item.id === 'pool' ? colors.freshLime : colors.warmIvory,
                        color: colors.deepForest,
                        border: `1px solid ${colors.deepForest}`,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: '11px',
                      color: colors.mutedGrey,
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.tagline}
                  </p>
                </div>
              </div>

              {/* Fare & Radio Check */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: colors.deepForest,
                  }}
                >
                  {item.fare}
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
    </section>
  );
};
