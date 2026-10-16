import React, { useState, useEffect } from 'react';
import { colors, shadows } from '../../theme/tokens';
import type { SimulatedRideRequest } from '../../types/driver';
import { IndianRupee, Users, Clock, Check, X } from 'lucide-react';

interface DriverRideRequestCardProps {
  request: SimulatedRideRequest;
  onAccept: (request: SimulatedRideRequest) => void;
  onReject: (request: SimulatedRideRequest) => void;
}

export const DriverRideRequestCard: React.FC<DriverRideRequestCardProps> = ({
  request,
  onAccept,
  onReject,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(request.expiresInSeconds || 25);
  const [isAccepting, setIsAccepting] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReject(request);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [request, onReject]);

  const handleAcceptClick = () => {
    if (isAccepting) return;
    setIsAccepting(true);
    onAccept(request);
  };

  const timerPercent = (secondsRemaining / (request.expiresInSeconds || 25)) * 100;

  return (
    <div
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '24px',
        backgroundColor: colors.pureWhite,
        border: `2px solid ${colors.deepForest}`,
        boxShadow: shadows.floating,
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      role="region"
      aria-label="Incoming simulated ride dispatch"
    >
      {/* Top Countdown Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          backgroundColor: '#EBE7DC',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${timerPercent}%`,
            backgroundColor: secondsRemaining < 8 ? colors.doodleCoral : colors.freshLime,
            transition: 'width 1s linear, background-color 0.3s ease',
          }}
        />
      </div>

      {/* Header: Dispatch alert & Estimated Fare */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '4px',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '3px 8px',
              borderRadius: '8px',
              backgroundColor: colors.freshLime,
              color: colors.deepForest,
              fontSize: '10px',
              fontWeight: 800,
              border: `1px solid ${colors.deepForest}`,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Clock size={11} /> {secondsRemaining}s to respond
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: colors.mutedGrey,
            }}
          >
            (Simulated Dispatch)
          </span>
        </div>

        {/* Fare Pill */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '2px',
              color: colors.deepForest,
            }}
          >
            <IndianRupee size={16} strokeWidth={2.8} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {request.estimatedFare}
            </span>
          </div>
          <span style={{ fontSize: '9px', fontWeight: 600, color: colors.mutedGrey }}>
            Estimated Net Payout
          </span>
        </div>
      </div>

      {/* Commuter / Trip Tag Banner */}
      <div
        style={{
          padding: '8px 10px',
          borderRadius: '12px',
          backgroundColor: '#F5F3ED',
          border: '1px solid #E3DFD3',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: colors.deepForest,
              color: colors.pureWhite,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={13} />
          </div>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: colors.deepForest }}>
              {request.passengerName}
            </span>
            <span style={{ fontSize: '10px', color: colors.mutedGrey, display: 'block' }}>
              {request.passengerCount} Rider • {request.paymentMode}
            </span>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: colors.deepForest }}>
            {request.distanceKm} km
          </span>
          <span style={{ fontSize: '10px', color: colors.mutedGrey, display: 'block' }}>
            ~{request.estimatedDurationMin} mins
          </span>
        </div>
      </div>

      {/* Visual Route Points (Pickup -> Destination) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        {/* Pickup Location */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: colors.freshLime,
                border: `2px solid ${colors.deepForest}`,
              }}
            />
            <div
              style={{
                width: '2px',
                height: '24px',
                backgroundColor: colors.softBorder,
                margin: '2px 0',
              }}
            />
          </div>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: colors.mutedGrey, textTransform: 'uppercase' }}>
              PICKUP LOCATION
            </span>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: '13px',
                fontWeight: 700,
                color: colors.deepForest,
                lineHeight: 1.25,
              }}
            >
              {request.pickup.name}
            </p>
            {request.pickup.address && (
              <span style={{ fontSize: '11px', color: colors.mutedGrey }}>{request.pickup.address}</span>
            )}
          </div>
        </div>

        {/* Destination Location */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <div style={{ marginTop: '2px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: colors.doodleCoral,
                border: `2px solid ${colors.deepForest}`,
              }}
            />
          </div>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: colors.mutedGrey, textTransform: 'uppercase' }}>
              DESTINATION DROP-OFF
            </span>
            <p
              style={{
                margin: '2px 0 0',
                fontSize: '13px',
                fontWeight: 700,
                color: colors.deepForest,
                lineHeight: 1.25,
              }}
            >
              {request.destination.name}
            </p>
            {request.destination.address && (
              <span style={{ fontSize: '11px', color: colors.mutedGrey }}>{request.destination.address}</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons: Accept & Reject */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
        {/* Reject / Pass Button */}
        <button
          type="button"
          onClick={() => onReject(request)}
          aria-label="Decline ride request"
          style={{
            height: '48px',
            borderRadius: '16px',
            backgroundColor: '#F3F0EA',
            border: `2px solid ${colors.deepForest}`,
            color: colors.deepForest,
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          <X size={16} strokeWidth={2.5} />
          <span>Pass</span>
        </button>

        {/* Accept Button */}
        <button
          type="button"
          onClick={handleAcceptClick}
          disabled={isAccepting}
          aria-label="Accept ride request"
          style={{
            height: '48px',
            borderRadius: '16px',
            backgroundColor: colors.freshLime,
            border: `2px solid ${colors.deepForest}`,
            boxShadow: shadows.doodleSticker,
            color: colors.deepForest,
            fontSize: '14px',
            fontWeight: 800,
            cursor: isAccepting ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.15s ease',
          }}
        >
          <Check size={18} strokeWidth={3} />
          <span>{isAccepting ? 'ACCEPTING...' : 'ACCEPT RIDE'}</span>
        </button>
      </div>
    </div>
  );
};
