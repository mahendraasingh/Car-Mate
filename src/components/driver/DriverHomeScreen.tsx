import React, { useState, useEffect, useCallback, useRef } from 'react';
import { colors, shadows } from '../../theme/tokens';
import type {
  DriverPartnerProfile,
  DriverEarningsSummary,
  SimulatedRideRequest,
  ActiveDriverTrip,
  DriverTripLifecycleState,
} from '../../types/driver';
import { driverService } from '../../services/driverService';
import { DriverAvailabilityToggle } from './DriverAvailabilityToggle';
import { DriverStatCards } from './DriverStatCards';
import { DriverRideRequestCard } from './DriverRideRequestCard';
import { DriverNavigationMap } from './DriverNavigationMap';
import { DriverActiveTripPanel } from './DriverActiveTripPanel';
import {
  Compass,
  Radar,
  ArrowRightLeft,
  Zap,
} from 'lucide-react';

interface DriverHomeScreenProps {
  onNavigateEarnings: () => void;
  onNavigateHistory: () => void;
  onNavigateProfile: () => void;
  onSwitchToPassenger: () => void;
}

export const DriverHomeScreen: React.FC<DriverHomeScreenProps> = ({
  onNavigateEarnings,
  onNavigateHistory,
  onNavigateProfile,
  onSwitchToPassenger,
}) => {
  const [profile, setProfile] = useState<DriverPartnerProfile>(() => driverService.getProfile());
  const [earnings, setEarnings] = useState<DriverEarningsSummary>(() => driverService.getEarnings());
  const [isOnline, setIsOnline] = useState<boolean>(() => driverService.getOnlineStatus());
  const [pendingRequest, setPendingRequest] = useState<SimulatedRideRequest | null>(null);
  const [activeTrip, setActiveTrip] = useState<ActiveDriverTrip | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Animation frame reference for deterministic simulated movement
  const animationTimerRef = useRef<number | null>(null);
  const dispatchTimerRef = useRef<number | null>(null);

  // Clean timer utility
  const clearSimulationTimers = useCallback(() => {
    if (animationTimerRef.current) {
      window.clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    if (dispatchTimerRef.current) {
      window.clearTimeout(dispatchTimerRef.current);
      dispatchTimerRef.current = null;
    }
  }, []);

  // Update online status
  const handleToggleOnline = (newStatus: boolean) => {
    setIsOnline(newStatus);
    driverService.setOnlineStatus(newStatus);
    if (!newStatus) {
      clearSimulationTimers();
      setPendingRequest(null);
    }
  };

  // Schedule a simulated incoming request when online and idle
  const triggerSimulatedDispatch = useCallback(() => {
    if (!isOnline || activeTrip || pendingRequest) return;
    const req = driverService.generateSimulatedRequest(profile.vehicle.category);
    setPendingRequest(req);
  }, [isOnline, activeTrip, pendingRequest, profile.vehicle.category]);

  // Periodic dispatch loop when online and idle
  useEffect(() => {
    if (isOnline && !activeTrip && !pendingRequest) {
      // Trigger a simulated incoming request after 5 seconds of going online or finishing a trip
      dispatchTimerRef.current = window.setTimeout(() => {
        triggerSimulatedDispatch();
      }, 5000);
    }

    return () => {
      if (dispatchTimerRef.current) {
        window.clearTimeout(dispatchTimerRef.current);
        dispatchTimerRef.current = null;
      }
    };
  }, [isOnline, activeTrip, pendingRequest, triggerSimulatedDispatch]);

  // Accept a simulated request
  const handleAcceptRequest = (request: SimulatedRideRequest) => {
    setPendingRequest(null);

    const newActiveTrip: ActiveDriverTrip = {
      id: `act_${Date.now()}`,
      request,
      state: 'approaching_pickup',
      routeGeometry: {
        points: [request.pickup.coordinates, request.destination.coordinates],
        totalDistanceKm: request.distanceKm,
        estimatedDurationMin: request.estimatedDurationMin,
        isSimulatedDemo: true,
      },
      driverCurrentLocation: { latitude: 28.6139, longitude: 77.209 },
      progressPercent: 0.15,
      acceptedAt: Date.now(),
      actualFare: request.estimatedFare,
    };

    setActiveTrip(newActiveTrip);
    setProgressPercent(0.15);

    // Start animated progress towards pickup
    let currentP = 0.15;
    animationTimerRef.current = window.setInterval(() => {
      currentP += 0.08;
      if (currentP >= 1) {
        currentP = 1;
        if (animationTimerRef.current) {
          window.clearInterval(animationTimerRef.current);
          animationTimerRef.current = null;
        }
        // Auto transition to arrived_at_pickup when reaching 100%
        setActiveTrip((prev) => {
          if (!prev) return null;
          return { ...prev, state: 'arrived_at_pickup', progressPercent: 1, arrivedAt: Date.now() };
        });
      }
      setProgressPercent(currentP);
    }, 600);
  };

  // Reject a simulated request
  const handleRejectRequest = (_request: SimulatedRideRequest) => {
    setPendingRequest(null);
  };

  // Manually arrive at pickup shortcut
  const handleArriveAtPickup = () => {
    if (animationTimerRef.current) {
      window.clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    setProgressPercent(1);
    setActiveTrip((prev) => {
      if (!prev) return null;
      return { ...prev, state: 'arrived_at_pickup', progressPercent: 1, arrivedAt: Date.now() };
    });
  };

  // Start trip with commuter
  const handleStartTrip = () => {
    setActiveTrip((prev) => {
      if (!prev) return null;
      return { ...prev, state: 'trip_in_progress', progressPercent: 0.05, startedAt: Date.now() };
    });
    setProgressPercent(0.05);

    // Animate trip progression towards destination
    let currentP = 0.05;
    animationTimerRef.current = window.setInterval(() => {
      currentP += 0.05;
      if (currentP >= 1) {
        currentP = 1;
        if (animationTimerRef.current) {
          window.clearInterval(animationTimerRef.current);
          animationTimerRef.current = null;
        }
      }
      setProgressPercent(currentP);
    }, 600);
  };

  // Complete the trip
  const handleCompleteTrip = () => {
    if (!activeTrip) return;

    if (animationTimerRef.current) {
      window.clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }

    // Atomically credit earnings and record trip history
    const updated = driverService.recordCompletedTrip(activeTrip);
    setEarnings(updated);

    // Refresh profile in case trip counts changed
    setProfile(driverService.getProfile());

    // Mark trip as completed
    setActiveTrip((prev) => {
      if (!prev) return null;
      return { ...prev, state: 'trip_completed', progressPercent: 1, completedAt: Date.now() };
    });

    // Reset back to idle after a brief celebration summary
    setTimeout(() => {
      setActiveTrip(null);
      setProgressPercent(0);
    }, 3200);
  };

  // Cancel current trip
  const handleCancelTrip = () => {
    clearSimulationTimers();
    setActiveTrip(null);
    setProgressPercent(0);
  };

  const currentMapState: DriverTripLifecycleState = activeTrip
    ? activeTrip.state
    : pendingRequest
    ? 'request_received'
    : 'idle';

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundColor: colors.warmIvory,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
      role="region"
      aria-label="SAFAR Driver Partner Dashboard"
    >
      {/* Top Partner Navigation Bar */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          borderBottom: `2px solid ${colors.deepForest}`,
          backgroundColor: colors.pureWhite,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              backgroundColor: colors.deepForest,
              color: colors.freshLime,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
            }}
          >
            <Compass size={18} strokeWidth={2.6} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '14px',
                  fontWeight: 800,
                  color: colors.deepForest,
                  letterSpacing: '0.4px',
                }}
              >
                SAFAR PARTNER
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '4px',
                  backgroundColor: colors.freshLime,
                  color: colors.deepForest,
                  border: `1px solid ${colors.deepForest}`,
                }}
              >
                PRO
              </span>
            </div>
            <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
              {profile.vehicle.registrationNumber} • {profile.city}
            </span>
          </div>
        </div>

        {/* Right Header Actions: Profile Pill & Switch to Passenger Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={onSwitchToPassenger}
            title="Switch back to Passenger App"
            style={{
              padding: '6px 9px',
              borderRadius: '10px',
              backgroundColor: '#EDE9DE',
              border: `1.5px solid ${colors.deepForest}`,
              color: colors.deepForest,
              fontSize: '10px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <ArrowRightLeft size={11} strokeWidth={2.4} />
            <span>Passenger</span>
          </button>

          {/* Avatar Profile Link */}
          <button
            type="button"
            onClick={onNavigateProfile}
            aria-label="Open Driver Profile"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: `2px solid ${colors.deepForest}`,
              overflow: 'hidden',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: '#EDE9DE',
              boxShadow: shadows.subtle,
            }}
          >
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </button>
        </div>
      </header>

      {/* Main Dashboard Scrollable Content */}
      <div style={{ padding: '16px 16px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Availability Toggle */}
        <DriverAvailabilityToggle
          isOnline={isOnline}
          onToggle={handleToggleOnline}
          hasActiveTrip={Boolean(activeTrip && activeTrip.state !== 'trip_completed')}
        />

        {/* Driver Navigation Map */}
        <DriverNavigationMap
          state={currentMapState}
          pickup={activeTrip?.request.pickup || pendingRequest?.pickup || null}
          destination={activeTrip?.request.destination || pendingRequest?.destination || null}
          progressPercent={progressPercent}
          vehicleCategory={profile.vehicle.category}
          isOnline={isOnline}
        />

        {/* Dynamic Contextual Content: Active Trip | Incoming Request | Radar Standby */}
        {activeTrip ? (
          <DriverActiveTripPanel
            trip={activeTrip}
            onArriveAtPickup={handleArriveAtPickup}
            onStartTrip={handleStartTrip}
            onCompleteTrip={handleCompleteTrip}
            onCancelTrip={handleCancelTrip}
          />
        ) : pendingRequest ? (
          <DriverRideRequestCard
            request={pendingRequest}
            onAccept={handleAcceptRequest}
            onReject={handleRejectRequest}
          />
        ) : isOnline ? (
          /* Online Radar Standby Banner */
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '20px',
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              boxShadow: shadows.subtle,
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
                  backgroundColor: colors.freshLimeSoft,
                  border: `1.5px solid ${colors.deepForest}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.deepForest,
                }}
              >
                <Radar size={20} className="animate-spin" />
              </div>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: colors.deepForest, display: 'block' }}>
                  Commercial Dispatch Active
                </span>
                <span style={{ fontSize: '10px', color: colors.mutedGrey, fontWeight: 600 }}>
                  Scanning for passengers in {profile.city}...
                </span>
              </div>
            </div>

            {/* Instant Demo Dispatch Trigger Button */}
            <button
              type="button"
              onClick={triggerSimulatedDispatch}
              title="Trigger instant simulated ride dispatch for testing"
              style={{
                padding: '6px 10px',
                borderRadius: '10px',
                backgroundColor: colors.freshLime,
                border: `1.5px solid ${colors.deepForest}`,
                color: colors.deepForest,
                fontSize: '11px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <Zap size={12} />
              <span>Simulate</span>
            </button>
          </div>
        ) : (
          /* Offline Commercial Rest Card with Reference Asset */
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '20px',
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              boxShadow: shadows.subtle,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Visual Photo Thumbnail from Reference Assets */}
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '14px',
                border: `1.5px solid ${colors.deepForest}`,
                overflow: 'hidden',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              <img
                src="/img/596eb85f33be87a4c2d136d8ec95b42e.jpg"
                alt="City transit backdrop"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    backgroundColor: '#EBE7DD',
                    color: colors.deepForest,
                  }}
                >
                  OFFLINE REST
                </span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey }}>
                  Peak surge coming up
                </span>
              </div>
              <p
                style={{
                  margin: '4px 0 0',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: colors.deepForest,
                  lineHeight: 1.25,
                }}
              >
                Switch online to start accepting commuter rides in {profile.city}.
              </p>
            </div>
          </div>
        )}

        {/* Driver Stat Cards (Today's Earnings, Trips, Vehicle Snapshot) */}
        <DriverStatCards
          profile={profile}
          earnings={earnings}
          onNavigateEarnings={onNavigateEarnings}
          onNavigateHistory={onNavigateHistory}
          onNavigateVehicle={onNavigateProfile}
        />
      </div>
    </div>
  );
};
