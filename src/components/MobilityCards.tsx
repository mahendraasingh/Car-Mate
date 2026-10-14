import React, { useState } from 'react';
import { colors, shadows } from '../theme/tokens';
import { Car, Zap, Users, Check, ShieldCheck, Clock, Leaf } from 'lucide-react';

interface MobilityItem {
  id: string;
  name: string;
  category: string;
  story: string;
  perk: string;
  badge: string;
  icon: React.ReactNode;
  perkIcon: React.ReactNode;
  accentColor: string;
}

export const MobilityCards: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<string>('pool');

  const modes: MobilityItem[] = [
    {
      id: 'auto',
      name: 'Auto-Rickshaw',
      category: 'GULLY MASTER',
      story: 'Zips through city bottlenecks and narrow lanes with zero fuss.',
      perk: 'Direct point-to-point',
      badge: 'Zero Surge',
      icon: <Zap size={22} color={colors.deepForest} strokeWidth={2.6} />,
      perkIcon: <Clock size={13} color={colors.deepForest} />,
      accentColor: colors.doodleYellow,
    },
    {
      id: 'cab',
      name: 'City Cab',
      category: 'ALL-WEATHER COMFORT',
      story: 'Clean AC sedans & hatchbacks for airport trips and client commutes.',
      perk: 'Spacious & chilled',
      badge: 'Top Rated',
      icon: <Car size={22} color={colors.deepForest} strokeWidth={2.6} />,
      perkIcon: <ShieldCheck size={13} color={colors.deepForest} />,
      accentColor: colors.pureWhite,
    },
    {
      id: 'pool',
      name: 'Ride Pooling',
      category: 'SMART TOGETHER',
      story: 'Share route & fare with verified riders heading in your direction.',
      perk: 'Save 40% & cut CO₂',
      badge: 'Eco Choice',
      icon: <Users size={22} color={colors.deepForest} strokeWidth={2.6} />,
      perkIcon: <Leaf size={13} color={colors.deepForest} />,
      accentColor: colors.freshLime,
    },
  ];

  return (
    <section
      aria-label="Mobility Modes"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '24px auto',
        padding: '0 8px',
      }}
    >
      {/* Section Story Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '16px',
          padding: '0 4px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 800,
              color: colors.deepForest,
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
            }}
          >
            CHOOSE HOW YOU MOVE
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 800,
              color: colors.deepForest,
              margin: '2px 0 0',
              lineHeight: 1.2,
            }}
          >
            Everyday rides. Smarter shared journeys.
          </h3>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '9999px',
            padding: '6px 14px',
            boxShadow: shadows.doodleSticker,
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colors.freshLime,
              border: `1.5px solid ${colors.deepForest}`,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 800,
              color: colors.deepForest,
            }}
          >
            TAP TO EXPLORE PERKS
          </span>
        </div>
      </div>

      {/* 3 Story-Driven Feature Cards */}
      <div
        role="radiogroup"
        aria-label="Select Mobility Service"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '18px',
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
                backgroundColor: colors.pureWhite,
                border: isSelected
                  ? `2.5px solid ${colors.deepForest}`
                  : `1.5px solid ${colors.softBorder}`,
                borderRadius: '24px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                cursor: 'pointer',
                position: 'relative',
                boxShadow: isSelected ? shadows.doodleStickerLg : shadows.card,
                transform: isSelected ? 'translateY(-4px)' : 'none',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Category & Badge Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '14px',
                    backgroundColor: item.accentColor,
                    border: `1.5px solid ${colors.deepForest}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '1px 2px 0px #172B2A',
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>

                <div
                  style={{
                    backgroundColor: item.accentColor,
                    color: colors.deepForest,
                    fontSize: '11px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: `1.5px solid ${colors.deepForest}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {isSelected && <Check size={12} strokeWidth={3} />}
                  <span>{item.badge}</span>
                </div>
              </div>

              {/* Title & Category Label */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  color: colors.mutedGrey,
                  textTransform: 'uppercase',
                }}
              >
                {item.category}
              </span>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: colors.deepForest,
                  margin: '4px 0 8px',
                  lineHeight: 1.2,
                }}
              >
                {item.name}
              </h4>

              {/* Story Narrative */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: colors.mutedGrey,
                  lineHeight: 1.5,
                  margin: '0 0 16px',
                  flex: 1,
                }}
              >
                {item.story}
              </p>

              {/* Perk Pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: colors.warmIvory,
                  border: `1px solid ${colors.softBorder}`,
                  padding: '6px 12px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: colors.deepForest,
                  width: '100%',
                }}
              >
                {item.perkIcon}
                <span>{item.perk}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
