import React, { useState } from 'react';
import { colors, shadows } from '../theme/tokens';
import { Car, Zap, Users, Check } from 'lucide-react';

interface MobilityItem {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  icon: React.ReactNode;
  accentColor: string;
}

export const MobilityCards: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('pool');

  const categories: MobilityItem[] = [
    {
      id: 'auto',
      name: 'Auto',
      tagline: 'Fast Point-to-Point',
      badge: 'Local First',
      icon: <Zap size={18} color={colors.deepForest} strokeWidth={2.4} />,
      accentColor: colors.doodleYellow,
    },
    {
      id: 'cab',
      name: 'Cab',
      tagline: 'City & Airport Comfort',
      badge: 'Private',
      icon: <Car size={18} color={colors.deepForest} strokeWidth={2.4} />,
      accentColor: colors.pureWhite,
    },
    {
      id: 'pool',
      name: 'Ride Pool',
      tagline: 'Shared Smart Journeys',
      badge: 'Popular',
      icon: <Users size={18} color={colors.deepForest} strokeWidth={2.4} />,
      accentColor: colors.freshLime,
    },
  ];

  return (
    <section
      aria-label="Mobility Categories"
      style={{
        width: '100%',
        marginTop: '16px',
        marginBottom: '16px',
      }}
    >
      {/* Supporting Label with Doodle Star */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4px',
          marginBottom: '10px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '12px',
            fontWeight: 700,
            color: colors.deepForest,
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
          }}
        >
          Everyday rides. Smarter shared journeys.
        </span>

        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: colors.deepForest,
            backgroundColor: colors.freshLime,
            padding: '2px 8px',
            borderRadius: '12px',
            border: `1px solid ${colors.deepForest}`,
          }}
        >
          3 RIDE MODES
        </span>
      </div>

      {/* 3 Interactive Cards */}
      <div
        role="radiogroup"
        aria-label="Transit Mode Selector"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          width: '100%',
        }}
      >
        {categories.map((item) => {
          const isSelected = activeCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setActiveCategory(item.id)}
              style={{
                backgroundColor: colors.pureWhite,
                border: isSelected
                  ? `2px solid ${colors.deepForest}`
                  : `1.5px solid ${colors.softBorder}`,
                borderRadius: '16px',
                padding: '12px 8px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isSelected ? shadows.doodleSticker : '0 1px 3px rgba(23, 43, 42, 0.04)',
                transform: isSelected ? 'translateY(-2px)' : 'none',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Selected Check Badge */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-7px',
                    right: '-7px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: colors.freshLime,
                    border: `1.5px solid ${colors.deepForest}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <Check size={11} color={colors.deepForest} strokeWidth={3} />
                </div>
              )}

              {/* Icon Container with Accent Glow */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: item.accentColor === colors.pureWhite ? colors.warmIvory : item.accentColor,
                  border: `1.5px solid ${colors.deepForest}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px',
                }}
                aria-hidden="true"
              >
                {item.icon}
              </div>

              {/* Title */}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 800,
                  color: colors.deepForest,
                  lineHeight: 1.2,
                }}
              >
                {item.name}
              </span>

              {/* Subtitle */}
              <span
                style={{
                  fontSize: '10px',
                  color: colors.mutedGrey,
                  marginTop: '3px',
                  lineHeight: 1.2,
                }}
              >
                {item.tagline}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
