import React from 'react';
import { colors } from '../theme/tokens';
import { Car, Zap, Users } from 'lucide-react';

interface MobilityOption {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const MobilityBadges: React.FC = () => {
  const options: MobilityOption[] = [
    {
      id: 'cab',
      label: 'Cab',
      sublabel: 'City & Outstation',
      icon: <Car size={16} strokeWidth={2.2} color={colors.deepForest} />,
    },
    {
      id: 'auto',
      label: 'Auto',
      sublabel: 'Fast Local Commute',
      icon: <Zap size={16} strokeWidth={2.2} color={colors.deepForest} />,
    },
    {
      id: 'pool',
      label: 'Ride Pool',
      sublabel: 'Shared & Smart',
      icon: <Users size={16} strokeWidth={2.2} color={colors.deepForest} />,
    },
  ];

  return (
    <section
      aria-label="Mobility Services"
      style={{
        width: '100%',
        marginTop: '16px',
        marginBottom: '18px',
      }}
    >
      {/* Supporting Mobility Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <div style={{ height: '1px', flex: 1, backgroundColor: colors.softBorder, maxWidth: '40px' }} />
        <p
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: colors.mutedGrey,
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Everyday rides. Smarter shared journeys.
        </p>
        <div style={{ height: '1px', flex: 1, backgroundColor: colors.softBorder, maxWidth: '40px' }} />
      </div>

      {/* 3 Subtle Pill Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          width: '100%',
        }}
      >
        {options.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: colors.pureWhite,
              border: `1px solid ${colors.softBorder}`,
              borderRadius: '12px',
              padding: '10px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(23, 43, 42, 0.04)',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: colors.warmIvory,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '6px',
              }}
              aria-hidden="true"
            >
              {item.icon}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 700,
                color: colors.deepForest,
                lineHeight: 1.2,
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: '10px',
                color: colors.mutedGrey,
                marginTop: '2px',
                lineHeight: 1.2,
              }}
            >
              {item.sublabel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
