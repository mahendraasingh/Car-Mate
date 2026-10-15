import React, { useState } from 'react';
import { colors } from '../../theme/tokens';
import type { BookingStatus, DriverInfo } from '../../types/passenger';
import { Phone, MessageSquare, Star, ShieldCheck, ArrowRight, X, CheckCircle2, RotateCcw } from 'lucide-react';

interface DriverInfoPanelProps {
  status: BookingStatus;
  driver: DriverInfo;
  estimatedFare: number;
  progressPercent: number;
  rideMode?: 'solo' | 'shared';
  onCancelBooking: () => void;
  onStartTrip: () => void;
  onCompleteTrip: () => void;
  onResetToHome: () => void;
}

export const DriverInfoPanel: React.FC<DriverInfoPanelProps> = ({
  status,
  driver,
  estimatedFare,
  progressPercent,
  rideMode = 'solo',
  onCancelBooking,
  onStartTrip,
  onCompleteTrip,
  onResetToHome,
}) => {
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const showDemoNotice = (feature: string) => {
    setDemoNotice(`${feature} is a non-functional placeholder in demo mode. No real call/message placed.`);
    setTimeout(() => setDemoNotice(null), 3500);
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: colors.pureWhite,
        border: `2px solid ${colors.deepForest}`,
        borderRadius: '22px',
        padding: '14px',
        boxShadow: '1px 3px 0px #172B2A',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
      aria-label="Driver Information and Trip Controls"
    >
      {/* Notice Toast */}
      {demoNotice && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.warmIvory,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '12px',
            padding: '8px 12px',
            fontSize: '11px',
            fontWeight: 700,
            color: colors.deepForest,
          }}
        >
          <span>{demoNotice}</span>
          <button
            type="button"
            onClick={() => setDemoNotice(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Top Status Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colors.softBorder}`,
          paddingBottom: '10px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              fontWeight: 800,
              color: colors.mutedGrey,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            TRIP STATUS
          </span>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: 800,
              color: colors.deepForest,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {status === 'driver_assigned' && (
              <>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: colors.doodleBlue,
                    animation: 'pulse 1.5s infinite',
                  }}
                />
                <span>Captain is arriving • ~2 min</span>
              </>
            )}

            {status === 'driver_arrived' && (
              <>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22C55E',
                  }}
                />
                <span style={{ color: '#166534' }}>Captain has arrived at pickup!</span>
              </>
            )}

            {status === 'trip_in_progress' && (
              <>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: colors.freshLime,
                    border: `1px solid ${colors.deepForest}`,
                  }}
                />
                <span>En Route to Destination</span>
              </>
            )}

            {status === 'trip_completed' && (
              <>
                <CheckCircle2 size={16} color="#166534" />
                <span style={{ color: '#166534' }}>You have reached your destination!</span>
              </>
            )}
          </div>
        </div>

        {/* OTP PIN Pill for Ride Safety */}
        {(status === 'driver_assigned' || status === 'driver_arrived') && (
          <div
            style={{
              backgroundColor: colors.warmIvory,
              border: `1.5px solid ${colors.deepForest}`,
              borderRadius: '12px',
              padding: '4px 10px',
              textAlign: 'center',
              boxShadow: '1px 1px 0px #172B2A',
            }}
          >
            <div style={{ fontSize: '9px', fontWeight: 700, color: colors.mutedGrey }}>START OTP</div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: colors.deepForest, letterSpacing: '2px' }}>
              4821
            </div>
          </div>
        )}
      </div>

      {/* Shared Ride Active Banner */}
      {rideMode === 'shared' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ECFDF5',
            border: `1.5px solid #059669`,
            borderRadius: '12px',
            padding: '6px 10px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#065F46',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🌱</span>
            <span>Ride Pooling: Co-rider Ananya onboard (1 seat)</span>
          </div>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 800,
              backgroundColor: '#059669',
              color: '#FFFFFF',
              padding: '1px 5px',
              borderRadius: '6px',
            }}
          >
            SHARED POOL
          </span>
        </div>
      )}

      {/* Driver & Vehicle Details Card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        }}
      >
        {/* Left: Driver Avatar + Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Fictional Driver Doodle Avatar */}
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: colors.freshLime,
              border: `2px solid ${colors.deepForest}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '1px 2px 0px #172B2A',
              fontSize: '18px',
              fontWeight: 800,
              color: colors.deepForest,
              flexShrink: 0,
            }}
          >
            VS
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: colors.deepForest,
                }}
              >
                {driver.name}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: '10px',
                  fontWeight: 800,
                  backgroundColor: colors.warmIvory,
                  border: `1px solid ${colors.deepForest}`,
                  borderRadius: '6px',
                  padding: '1px 4px',
                }}
              >
                <Star size={10} color={colors.deepForest} fill={colors.doodleYellow} />
                {driver.rating.toFixed(1)}
              </span>
            </div>

            <div style={{ fontSize: '11px', color: colors.mutedGrey, fontWeight: 600 }}>
              {driver.vehicleModel} • {driver.vehicleColor}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '9px',
                fontWeight: 800,
                color: colors.deepForest,
                backgroundColor: colors.surfaceHighlight,
                padding: '1px 5px',
                borderRadius: '4px',
                border: `1px solid ${colors.softBorder}`,
                marginTop: '2px',
              }}
            >
              <span>{driver.licensePlate}</span>
            </div>
          </div>
        </div>

        {/* Right: Demo Call / Message Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => showDemoNotice('Phone Call')}
            title="Demo Call Captain"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              backgroundColor: colors.warmIvory,
              border: `1.5px solid ${colors.deepForest}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '1px 1px 0px #172B2A',
            }}
          >
            <Phone size={15} color={colors.deepForest} />
          </button>

          <button
            type="button"
            onClick={() => showDemoNotice('Chat Message')}
            title="Demo Message Captain"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              backgroundColor: colors.warmIvory,
              border: `1.5px solid ${colors.deepForest}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '1px 1px 0px #172B2A',
            }}
          >
            <MessageSquare size={15} color={colors.deepForest} />
          </button>
        </div>
      </div>

      {/* Progress Bar (During In-Trip) */}
      {status === 'trip_in_progress' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, color: colors.deepForest }}>
            <span>Journey Progress</span>
            <span>{Math.round(progressPercent * 100)}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '9999px',
              backgroundColor: colors.warmIvory,
              border: `1px solid ${colors.deepForest}`,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progressPercent * 100}%`,
                height: '100%',
                backgroundColor: colors.freshLime,
                transition: 'width 0.25s linear',
              }}
            />
          </div>
        </div>
      )}

      {/* Dynamic Action Buttons based on lifecycle status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
        {status === 'driver_assigned' && (
          <>
            <button
              type="button"
              onClick={onCancelBooking}
              style={{
                flex: 1,
                height: '42px',
                borderRadius: '12px',
                backgroundColor: colors.pureWhite,
                border: `1.5px solid ${colors.deepForest}`,
                color: colors.deepForest,
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
              }}
            >
              Cancel Ride
            </button>
            <div
              style={{
                flex: 1.5,
                height: '42px',
                borderRadius: '12px',
                backgroundColor: colors.warmIvory,
                border: `1.5px solid ${colors.deepForest}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                fontSize: '12px',
                fontWeight: 800,
                color: colors.deepForest,
              }}
            >
              <RotateCcw size={13} className="animate-spin" />
              <span>Driver on the way</span>
            </div>
          </>
        )}

        {status === 'driver_arrived' && (
          <button
            type="button"
            onClick={onStartTrip}
            style={{
              width: '100%',
              height: '44px',
              borderRadius: '14px',
              backgroundColor: colors.deepForest,
              color: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              fontSize: '13px',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '1px 2px 0px #172B2A',
            }}
          >
            <span>Start Simulated Trip</span>
            <ArrowRight size={15} color={colors.freshLime} strokeWidth={2.6} />
          </button>
        )}

        {status === 'trip_in_progress' && (
          <button
            type="button"
            onClick={onCompleteTrip}
            style={{
              width: '100%',
              height: '44px',
              borderRadius: '14px',
              backgroundColor: colors.deepForest,
              color: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              fontSize: '13px',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '1px 2px 0px #172B2A',
            }}
          >
            <span>Complete Trip (Simulate Arrival)</span>
            <CheckCircle2 size={15} color={colors.freshLime} />
          </button>
        )}

        {status === 'trip_completed' && (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: colors.warmIvory,
                borderRadius: '12px',
                padding: '8px 12px',
                border: `1.5px solid ${colors.deepForest}`,
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: colors.deepForest }}>Demo Fare Settled:</span>
              <span style={{ fontSize: '15px', fontWeight: 800, color: colors.deepForest }}>₹{estimatedFare}</span>
            </div>
            <button
              type="button"
              onClick={onResetToHome}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: colors.deepForest,
                color: colors.pureWhite,
                border: `2px solid ${colors.deepForest}`,
                fontSize: '13px',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '1px 2px 0px #172B2A',
              }}
            >
              <span>Back to Passenger Home</span>
              <ArrowRight size={15} color={colors.freshLime} />
            </button>
          </div>
        )}
      </div>

      {/* Safety Notice Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '10px',
          color: colors.mutedGrey,
          fontWeight: 600,
          borderTop: `1px solid ${colors.softBorder}`,
          paddingTop: '6px',
        }}
      >
        <ShieldCheck size={12} color={colors.deepForest} />
        <span>SAFAR 24/7 Safety Shield Active • Live Telemetry Recorded</span>
      </div>
    </div>
  );
};
