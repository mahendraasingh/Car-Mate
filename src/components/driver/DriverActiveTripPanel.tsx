import React, { useState } from 'react';
import { colors, shadows } from '../../theme/tokens';
import type { ActiveDriverTrip } from '../../types/driver';
import {
  MapPin,
  Navigation,
  CheckCircle2,
  Phone,
  MessageSquare,
  AlertTriangle,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  Check,
} from 'lucide-react';

interface DriverActiveTripPanelProps {
  trip: ActiveDriverTrip;
  onArriveAtPickup: () => void;
  onStartTrip: () => void;
  onCompleteTrip: () => void;
  onCancelTrip: () => void;
}

export const DriverActiveTripPanel: React.FC<DriverActiveTripPanelProps> = ({
  trip,
  onArriveAtPickup,
  onStartTrip,
  onCompleteTrip,
  onCancelTrip,
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
  const otpInput = '4289';

  const { state, request, progressPercent } = trip;

  const handleCancelClick = () => {
    if (showCancelConfirm) {
      onCancelTrip();
    } else {
      setShowCancelConfirm(true);
    }
  };

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
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* State-Specific Status Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '8px',
              backgroundColor:
                state === 'arrived_at_pickup'
                  ? colors.freshLime
                  : state === 'trip_in_progress'
                  ? colors.doodleBlue
                  : state === 'trip_completed'
                  ? colors.driverOnline
                  : colors.deepForest,
              color:
                state === 'arrived_at_pickup'
                  ? colors.deepForest
                  : colors.pureWhite,
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {state === 'approaching_pickup' && <Navigation size={12} />}
            {state === 'arrived_at_pickup' && <CheckCircle2 size={12} />}
            {state === 'trip_in_progress' && <Navigation size={12} />}
            {state === 'trip_completed' && <Check size={12} />}

            {state === 'approaching_pickup' && 'En Route to Pickup'}
            {state === 'arrived_at_pickup' && 'Arrived at Pickup'}
            {state === 'trip_in_progress' && 'Trip in Progress'}
            {state === 'trip_completed' && 'Trip Completed'}
          </span>
        </div>

        {/* Fare Display */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', color: colors.deepForest }}>
          <IndianRupee size={15} strokeWidth={2.8} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800 }}>
            {request.estimatedFare}
          </span>
          <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>payout</span>
        </div>
      </div>

      {/* Passenger Info & Quick Contact Buttons */}
      <div
        style={{
          padding: '10px 12px',
          borderRadius: '16px',
          backgroundColor: '#F7F5EE',
          border: '1px solid #E4E0D5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: colors.deepForest,
              color: colors.freshLime,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '14px',
            }}
          >
            R
          </div>
          <div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: colors.deepForest, display: 'block' }}>
              {request.passengerName}
            </span>
            <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
              {request.passengerCount} Passenger • {request.paymentMode}
            </span>
          </div>
        </div>

        {/* Call & Chat Action Icons (Simulated Demo Handlers) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => alert(`Calling ${request.passengerName} (Simulated in-app call mask)`)}
            aria-label="Call passenger"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: colors.pureWhite,
              border: `1.5px solid ${colors.deepForest}`,
              color: colors.deepForest,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Phone size={14} strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={() => alert(`Opening chat with ${request.passengerName} (Demo chat interface)`)}
            aria-label="Message passenger"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: colors.pureWhite,
              border: `1.5px solid ${colors.deepForest}`,
              color: colors.deepForest,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <MessageSquare size={14} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {/* Target Location Display */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            backgroundColor: state === 'approaching_pickup' || state === 'arrived_at_pickup' ? colors.freshLimeSoft : '#FFEBE6',
            color: state === 'approaching_pickup' || state === 'arrived_at_pickup' ? colors.deepForest : colors.doodleCoral,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2px',
            flexShrink: 0,
          }}
        >
          <MapPin size={16} strokeWidth={2.5} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: colors.mutedGrey, textTransform: 'uppercase' }}>
            {state === 'approaching_pickup' || state === 'arrived_at_pickup' ? 'PICKUP AT' : 'DROPOFF DESTINATION'}
          </span>
          <p
            style={{
              margin: '2px 0 0',
              fontSize: '13px',
              fontWeight: 800,
              color: colors.deepForest,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {state === 'approaching_pickup' || state === 'arrived_at_pickup'
              ? request.pickup.name
              : request.destination.name}
          </p>
          <span style={{ fontSize: '11px', color: colors.mutedGrey, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {state === 'approaching_pickup' || state === 'arrived_at_pickup'
              ? request.pickup.address
              : request.destination.address}
          </span>
        </div>
      </div>

      {/* State Transitions & Primary Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        {/* State 1: Approaching Pickup */}
        {state === 'approaching_pickup' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={onArriveAtPickup}
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: colors.freshLime,
                border: `2px solid ${colors.deepForest}`,
                boxShadow: shadows.doodleSticker,
                color: colors.deepForest,
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={18} strokeWidth={2.6} />
              <span>ARRIVED AT PICKUP POINT</span>
            </button>

            <span style={{ textAlign: 'center', fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
              Approaching pickup: {Math.round(progressPercent * 100)}% (Tap above to confirm arrival)
            </span>
          </div>
        )}

        {/* State 2: Arrived at Pickup Point */}
        {state === 'arrived_at_pickup' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* OTP Input Simulation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '14px',
                backgroundColor: '#FAF8F3',
                border: `1.5px solid ${colors.deepForest}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={14} color={colors.deepForest} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: colors.deepForest }}>
                  Passenger Start OTP:
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '3px',
                    backgroundColor: colors.freshLime,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    border: `1px solid ${colors.deepForest}`,
                  }}
                >
                  {otpInput}
                </span>
                <span style={{ fontSize: '10px', color: colors.mutedGrey }}>(Demo verified)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onStartTrip}
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: colors.deepForest,
                border: `2px solid ${colors.deepForest}`,
                boxShadow: shadows.doodleSticker,
                color: colors.freshLime,
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>START TRIP WITH COMMUTER</span>
              <ArrowRight size={18} strokeWidth={2.6} />
            </button>
          </div>
        )}

        {/* State 3: Trip in Progress */}
        {state === 'trip_in_progress' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={onCompleteTrip}
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '16px',
                backgroundColor: colors.freshLime,
                border: `2px solid ${colors.deepForest}`,
                boxShadow: shadows.doodleSticker,
                color: colors.deepForest,
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={18} strokeWidth={2.6} />
              <span>COMPLETE TRIP & COLLECT FARE</span>
            </button>

            <span style={{ textAlign: 'center', fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
              Live navigation route: {Math.round(progressPercent * 100)}% (Tap to finish trip)
            </span>
          </div>
        )}

        {/* State 4: Completed summary */}
        {state === 'trip_completed' && (
          <div
            style={{
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: '#EDF8EE',
              border: '1.5px solid #A7E2B0',
              textAlign: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: colors.driverOnline }}>
              <ShieldCheck size={18} />
              <span style={{ fontSize: '13px', fontWeight: 800 }}>Fare Successfully Credited!</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '11px', color: colors.deepForest }}>
              ₹{trip.actualFare} added to Today's Net Payout.
            </p>
          </div>
        )}

        {/* Cancellation Option (Available before trip starts) */}
        {state === 'approaching_pickup' && (
          <div style={{ marginTop: '4px' }}>
            {showCancelConfirm ? (
              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '12px',
                  backgroundColor: '#FFF2F2',
                  border: '1px solid #FFC9C9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertTriangle size={14} color={colors.doodleCoral} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: colors.doodleCoral }}>
                    Confirm ride cancellation?
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setShowCancelConfirm(false)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: '#EBE7DD',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: colors.doodleCoral,
                      color: colors.pureWhite,
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCancelConfirm(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.mutedGrey,
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center',
                  width: '100%',
                  padding: '4px',
                }}
              >
                Cancel ride request
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
