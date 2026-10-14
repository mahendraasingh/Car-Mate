import React, { useState } from 'react';
import { colors, shadows, dimensions } from '../theme/tokens';
import { ArrowRight, Info, X } from 'lucide-react';

export const ActionButtons: React.FC = () => {
  const [feedbackInfo, setFeedbackInfo] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setFeedbackInfo(`${label} placeholder: Authentication and ride booking will open in the next phase.`);
    const timer = setTimeout(() => {
      setFeedbackInfo(null);
    }, 4000);
    return () => clearTimeout(timer);
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: 'auto',
      }}
    >
      {/* Honest Accessible Toast Feedback */}
      {feedbackInfo && (
        <div
          role="status"
          aria-live="polite"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '14px',
            padding: '12px 14px',
            fontSize: '12px',
            fontWeight: 600,
            color: colors.deepForest,
            boxShadow: shadows.doodleSticker,
            animation: 'fadeIn 0.25s ease-out forwards',
          }}
        >
          <Info size={16} color={colors.deepForest} strokeWidth={2.4} />
          <span style={{ flex: 1, lineHeight: 1.35 }}>{feedbackInfo}</span>
          <button
            type="button"
            onClick={() => setFeedbackInfo(null)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: colors.mutedGrey,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
            }}
            aria-label="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Primary Action Button: GET STARTED */}
      <button
        id="btn-get-started"
        type="button"
        onClick={() => handleAction('Get Started')}
        aria-label="Get Started with SAFAR"
        style={{
          width: '100%',
          height: dimensions.primaryButtonHeight,
          minHeight: '48px',
          backgroundColor: colors.deepForest,
          color: colors.pureWhite,
          borderRadius: '16px',
          border: `2px solid ${colors.deepForest}`,
          fontSize: '16px',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          letterSpacing: '0.4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          boxShadow: shadows.doodleSticker,
          transition: 'transform 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0px 1px 0px #172B2A';
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
          (e.currentTarget as HTMLElement).style.boxShadow = shadows.doodleSticker;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
          (e.currentTarget as HTMLElement).style.boxShadow = shadows.doodleSticker;
        }}
      >
        <span>Get Started</span>
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: colors.freshLime,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1.5px solid ${colors.deepForest}`,
          }}
          aria-hidden="true"
        >
          <ArrowRight size={14} color={colors.deepForest} strokeWidth={3} />
        </div>
      </button>

      {/* Secondary Authentication Placeholders */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          width: '100%',
        }}
      >
        <button
          id="btn-login"
          type="button"
          onClick={() => handleAction('Log In')}
          aria-label="Log In"
          style={{
            height: dimensions.secondaryButtonHeight,
            minHeight: '44px',
            backgroundColor: colors.pureWhite,
            color: colors.deepForest,
            borderRadius: '14px',
            border: `1.5px solid ${colors.softBorder}`,
            fontSize: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(23, 43, 42, 0.04)',
            transition: 'all 0.15s ease',
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          Log In
        </button>

        <button
          id="btn-signup"
          type="button"
          onClick={() => handleAction('Sign Up')}
          aria-label="Sign Up"
          style={{
            height: dimensions.secondaryButtonHeight,
            minHeight: '44px',
            backgroundColor: colors.warmIvory,
            color: colors.deepForest,
            borderRadius: '14px',
            border: `1.5px solid ${colors.deepForest}`,
            fontSize: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
