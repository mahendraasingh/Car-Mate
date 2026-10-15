import React, { useState } from 'react';
import { colors } from '../theme/tokens';
import { ArrowRight, Smartphone, ShieldCheck, CheckCircle2, X } from 'lucide-react';

interface ActionButtonsProps {
  onEnterApp?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onEnterApp }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      if (!isOtpSent) {
        setIsOtpSent(true);
        setStatusMessage(`OTP 4821 sent to +91 ${phoneNumber}! Click below to enter.`);
      } else {
        if (onEnterApp) {
          onEnterApp();
        }
      }
    } else {
      setStatusMessage('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleQuickExplore = () => {
    if (onEnterApp) {
      onEnterApp();
    } else {
      setStatusMessage('Connected as Guest Commuter! Auto & Pool dispatch ready.');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        margin: '8px auto',
        padding: '0 4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxSizing: 'border-box',
      }}
    >
      {/* Toast Notification */}
      {statusMessage && (
        <div
          role="status"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            borderRadius: '14px',
            padding: '10px 12px',
            fontSize: '11px',
            fontWeight: 700,
            color: colors.deepForest,
            boxShadow: '1px 2px 0px #172B2A',
            animation: 'fadeIn 0.2s ease-out forwards',
          }}
        >
          <CheckCircle2 size={16} color={colors.deepForest} />
          <span style={{ flex: 1 }}>{statusMessage}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: colors.mutedGrey,
              padding: '2px',
            }}
            aria-label="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Mobile Number Fast Login Card */}
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          backgroundColor: colors.pureWhite,
          border: `2px solid ${colors.deepForest}`,
          borderRadius: '20px',
          padding: '14px',
          boxShadow: '1px 3px 0px #172B2A',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label
            htmlFor="phone-input"
            style={{
              fontSize: '11px',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              color: colors.deepForest,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
            }}
          >
            ENTER PHONE TO START
          </label>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.mutedGrey,
            }}
          >
            Instant OTP • 1-Tap
          </span>
        </div>

        {/* Input Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: colors.warmIvory,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '14px',
            padding: '4px 10px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 800,
              color: colors.deepForest,
              fontFamily: 'var(--font-display)',
              borderRight: `1px solid ${colors.softBorder}`,
              paddingRight: '8px',
            }}
          >
            🇮🇳 +91
          </span>
          <input
            id="phone-input"
            type="tel"
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 10-digit number"
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: 700,
              color: colors.deepForest,
              fontFamily: 'var(--font-body)',
              outline: 'none',
              padding: '6px 0',
            }}
          />
        </div>

        {/* Primary Submit Button */}
        <button
          id="btn-get-started"
          type="submit"
          aria-label="Continue with Mobile Number"
          style={{
            width: '100%',
            height: '46px',
            backgroundColor: colors.deepForest,
            color: colors.pureWhite,
            borderRadius: '14px',
            border: `2px solid ${colors.deepForest}`,
            fontSize: '14px',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '1px 2px 0px #172B2A',
            transition: 'transform 0.15s ease',
          }}
          onMouseDown={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(2px)';
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
          }}
        >
          <span>{isOtpSent ? 'Verify OTP & Enter App' : 'Get Started with SAFAR'}</span>
          <ArrowRight size={16} color={colors.freshLime} strokeWidth={2.6} />
        </button>
      </form>

      {/* Guest Explore Button */}
      <button
        type="button"
        onClick={handleQuickExplore}
        style={{
          width: '100%',
          height: '42px',
          backgroundColor: colors.pureWhite,
          color: colors.deepForest,
          borderRadius: '14px',
          border: `1.5px solid ${colors.deepForest}`,
          fontSize: '12px',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          boxShadow: '1px 1px 0px #172B2A',
        }}
      >
        <Smartphone size={14} color={colors.deepForest} />
        <span>Open Passenger Booking App</span>
      </button>

      {/* Micro Trust Strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '2px',
          color: colors.mutedGrey,
          fontSize: '10px',
          fontWeight: 700,
        }}
      >
        <ShieldCheck size={12} color={colors.deepForest} />
        <span>Govt. Approved Rates • Verified Drivers • SOS Shield</span>
      </div>
    </div>
  );
};
