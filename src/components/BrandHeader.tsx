import React from 'react';
import { colors, shadows } from '../theme/tokens';
import { Compass, Radio } from 'lucide-react';

export const BrandHeader: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '18px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(245, 242, 234, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.softBorder}`,
      }}
      aria-label="Application Header"
    >
      {/* Brand Monogram + Bilingual Typographic Mark */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            backgroundColor: colors.deepForest,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: shadows.doodleSticker,
            border: `2px solid ${colors.deepForest}`,
            position: 'relative',
          }}
          aria-hidden="true"
        >
          <Compass size={26} color={colors.freshLime} strokeWidth={2.4} />
          {/* Subtle doodle highlight dot */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colors.freshLime,
            }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '1px',
                color: colors.deepForest,
                lineHeight: 1,
              }}
            >
              SAFAR
            </span>
            <span
              style={{
                backgroundColor: colors.freshLime,
                color: colors.deepForest,
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '8px',
                border: `1.5px solid ${colors.deepForest}`,
                letterSpacing: '0.4px',
              }}
            >
              सफ़र
            </span>
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.8px',
              color: colors.mutedGrey,
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '4px',
            }}
          >
            India's Smart Ride Network
          </span>
        </div>
      </div>

      {/* Live Transit Network Status Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '9999px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            boxShadow: shadows.doodleSticker,
          }}
        >
          <Radio size={14} color={colors.doodleCoral} className="animate-pulse" />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: colors.deepForest,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.4px',
            }}
          >
            DISPATCH ACTIVE
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
      </div>
    </header>
  );
};
