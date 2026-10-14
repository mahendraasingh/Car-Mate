import React, { useState } from 'react';
import { colors, shadows, dimensions } from '../theme/tokens';
import { ArrowRight, Info, X, Zap } from 'lucide-react';

export const ActionButtons: React.FC = () => {
  const [feedbackInfo, setFeedbackInfo] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setFeedbackInfo(`${label} placeholder: Authentication and live booking will open in the next release phase.`);
    const timer = setTimeout(() => {
      setFeedbackInfo(null);
    }, 4000);
    return () => clearTimeout(timer);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '580px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        padding: '8px 16px',
      }}
    >
      {/* Honest Accessible Toast Feedback */}
      {feedbackInfo && (
        <div
          role="status"
          aria-live="polite"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '16px',
            padding: '12px 18px',
            fontSize: '13px',
            fontWeight: 700,
            color: colors.deepForest,
            boxShadow: shadows.doodleSticker,
            animation: 'fadeIn 0.25s ease-out forwards',
          }}
        >
          <Info size={18} color={colors.deepForest} strokeWidth={2.4} />
          <span style={{ flex: 1, lineHeight: 1.4 }}>{feedbackInfo}</span>
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
            <X size={16} />
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
          minHeight: '52px',
          backgroundColor: colors.deepForest,
          color: colors.pureWhite,
          borderRadius: '18px',
          border: `2.5px solid ${colors.deepForest}`,
          fontSize: '17px',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          letterSpacing: '0.4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: shadows.doodleStickerLg,
          transition: 'transform 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(3px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '1px 2px 0px #172B2A';
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
          (e.currentTarget as HTMLElement).style.boxShadow = shadows.doodleStickerLg;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
          (e.currentTarget as HTMLElement).style.boxShadow = shadows.doodleStickerLg;
        }}
      >
        <span>Get Started — Instant Free Ride Pass</span>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: colors.freshLime,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1.5px solid ${colors.deepForest}`,
          }}
          aria-hidden="true"
        >
          <ArrowRight size={16} color={colors.deepForest} strokeWidth={3} />
        </div>
      </button>

      {/* Secondary Authentication Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
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
            minHeight: '48px',
            backgroundColor: colors.pureWhite,
            color: colors.deepForest,
            borderRadius: '16px',
            border: `2px solid ${colors.deepForest}`,
            fontSize: '15px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: shadows.doodleSticker,
            transition: 'all 0.15s ease',
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '1px 1px 0px #172B2A';
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
          Log In
        </button>

        <button
          id="btn-signup"
          type="button"
          onClick={() => handleAction('Sign Up')}
          aria-label="Sign Up"
          style={{
            height: dimensions.secondaryButtonHeight,
            minHeight: '48px',
            backgroundColor: colors.freshLime,
            color: colors.deepForest,
            borderRadius: '16px',
            border: `2px solid ${colors.deepForest}`,
            fontSize: '15px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: shadows.doodleSticker,
            transition: 'all 0.15s ease',
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '1px 1px 0px #172B2A';
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
          Sign Up
        </button>
      </div>

      {/* Reassurance Micro-Copy */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          fontWeight: 600,
          color: colors.mutedGrey,
          marginTop: '4px',
        }}
      >
        <Zap size={12} color={colors.deepForest} />
        <span>Takes 20 seconds • No payment required to browse</span>
      </div>
    </div>
  );
};
