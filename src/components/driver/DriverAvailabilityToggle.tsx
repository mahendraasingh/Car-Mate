import React from 'react';
import { colors, shadows } from '../../theme/tokens';
import { Power, ShieldAlert, Sparkles } from 'lucide-react';

interface DriverAvailabilityToggleProps {
  isOnline: boolean;
  onToggle: (newStatus: boolean) => void;
  hasActiveTrip?: boolean;
  disabled?: boolean;
}

export const DriverAvailabilityToggle: React.FC<DriverAvailabilityToggleProps> = ({
  isOnline,
  onToggle,
  hasActiveTrip = false,
  disabled = false,
}) => {
  const handleToggleClick = () => {
    if (disabled) return;
    if (hasActiveTrip && isOnline) {
      alert('You have an active trip in progress! Complete or resolve your current trip before going offline.');
      return;
    }
    onToggle(!isOnline);
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '12px 14px',
        borderRadius: '20px',
        backgroundColor: isOnline ? colors.pureWhite : '#F1EFEA',
        border: `2px solid ${colors.deepForest}`,
        boxShadow: shadows.doodleSticker,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Visual Indicator Status Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: isOnline ? colors.driverOnline : colors.driverOffline,
            boxShadow: isOnline ? '0 0 10px rgba(16, 185, 129, 0.7)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          {isOnline && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: colors.pureWhite,
                animation: 'pulse 1.6s infinite',
              }}
            />
          )}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '15px',
                fontWeight: 800,
                color: isOnline ? colors.deepForest : '#5A605D',
                letterSpacing: '0.2px',
              }}
            >
              {isOnline ? 'ONLINE & READY' : 'OFFLINE'}
            </span>

            {isOnline ? (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: colors.freshLime,
                  color: colors.deepForest,
                  border: `1px solid ${colors.deepForest}`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Sparkles size={10} /> DISPATCH LIVE
              </span>
            ) : (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: '#E2DFD6',
                  color: '#69706D',
                }}
              >
                RESTING
              </span>
            )}
          </div>

          <p
            style={{
              margin: '2px 0 0',
              fontSize: '11px',
              color: isOnline ? colors.mutedGrey : '#7D8582',
              fontWeight: 500,
            }}
          >
            {hasActiveTrip
              ? 'Trip in progress • Cannot go offline now'
              : isOnline
              ? 'Searching for nearby commuter requests in Delhi NCR'
              : 'Switch online to start receiving ride bookings'}
          </p>
        </div>
      </div>

      {/* Tactile Push Slider / Button */}
      <button
        type="button"
        onClick={handleToggleClick}
        disabled={disabled}
        aria-label={isOnline ? 'Go Offline' : 'Go Online'}
        title={hasActiveTrip ? 'Active trip ongoing' : isOnline ? 'Tap to go offline' : 'Tap to go online'}
        style={{
          width: '74px',
          height: '38px',
          borderRadius: '9999px',
          backgroundColor: isOnline ? colors.deepForest : '#DCD9CE',
          border: `2px solid ${colors.deepForest}`,
          position: 'relative',
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)',
          transition: 'all 0.25s ease',
          outline: 'none',
        }}
      >
        {/* Sliding Knob */}
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: isOnline ? colors.freshLime : colors.pureWhite,
            border: `2px solid ${colors.deepForest}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.deepForest,
            transform: isOnline ? 'translateX(36px)' : 'translateX(0px)',
            transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          }}
        >
          {hasActiveTrip ? (
            <ShieldAlert size={14} strokeWidth={2.5} color={colors.deepForest} />
          ) : (
            <Power size={14} strokeWidth={2.6} />
          )}
        </div>
      </button>
    </div>
  );
};
