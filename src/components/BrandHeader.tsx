import React from 'react';
import { colors } from '../theme/tokens';
import { Compass } from 'lucide-react';

export const BrandHeader: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '16px 20px',
        borderBottom: `1px solid ${colors.softBorder}`,
        backgroundColor: colors.warmIvory,
        position: 'relative',
        zIndex: 10,
      }}
      aria-label="Application Header"
    >
      {/* Brand Identity */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Brand Icon Mark */}
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: colors.deepForest,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 3px 0px rgba(23, 43, 42, 0.25)',
            border: `1.5px solid ${colors.deepForest}`,
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-hidden="true"
        >
          {/* Subtle Fresh Lime corner fold / accent */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '20px',
              height: '20px',
              backgroundColor: colors.freshLime,
              transform: 'rotate(45deg)',
            }}
          />
          <Compass size={22} color={colors.freshLime} strokeWidth={2.4} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '1px',
                color: colors.deepForest,
                lineHeight: 1,
                margin: 0,
              }}
            >
              SAFAR
            </h1>
            <span
              style={{
                backgroundColor: colors.freshLime,
                color: colors.deepForest,
                fontSize: '9px',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: '6px',
                letterSpacing: '0.5px',
                border: `1px solid ${colors.deepForest}`,
              }}
            >
              सफ़र
            </span>
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.6px',
              color: colors.mutedGrey,
              textTransform: 'uppercase',
              display: 'block',
              marginTop: '4px',
            }}
          >
            Urban Mobility India
          </span>
        </div>
      </div>

      {/* Live City Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '9999px',
          backgroundColor: colors.pureWhite,
          border: `1px solid ${colors.softBorder}`,
          boxShadow: '0 1px 3px rgba(23, 43, 42, 0.05)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: colors.freshLime,
            border: `1.5px solid ${colors.deepForest}`,
            boxShadow: '0 0 6px rgba(201, 243, 106, 0.8)',
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: colors.deepForest,
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.4px',
          }}
        >
          INDIA LIVE
        </span>
      </div>
    </header>
  );
};
