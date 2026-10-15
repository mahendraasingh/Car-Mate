import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../../theme/tokens';
import type { MapPoint, MapMode } from '../../types/map';
import type { BookingStatus, DriverInfo, VehicleCategory } from '../../types/passenger';
import { locationService, DEMO_PRESET_LOCATIONS } from '../../services/locationService';
import type { LocationPermissionState } from '../../services/locationService';
import { profileStorage } from '../../services/profileStorage';
import { SimulatedMap } from '../map/SimulatedMap';
import { LocationInputCard } from '../booking/LocationInputCard';
import { VehicleSelection, VEHICLE_OPTIONS } from '../booking/VehicleSelection';
import { DriverInfoPanel } from '../booking/DriverInfoPanel';
import { Compass, ArrowRight, Radar } from 'lucide-react';

interface PassengerHomeScreenProps {
  onOpenProfile: () => void;
  onBackToWelcome: () => void;
}

export const PassengerHomeScreen: React.FC<PassengerHomeScreenProps> = ({
  onOpenProfile,
  onBackToWelcome,
}) => {
  // Location States
  const [pickup, setPickup] = useState<MapPoint | null>(DEMO_PRESET_LOCATIONS[0]);
  const [destination, setDestination] = useState<MapPoint | null>(DEMO_PRESET_LOCATIONS[1]);
  const [locationPermission, setLocationPermission] = useState<LocationPermissionState>('prompt');

  // Booking Flow States
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('idle');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('auto');
  const [driverProgress, setDriverProgress] = useState<number>(0);
  const [assignedDriver, setAssignedDriver] = useState<DriverInfo | null>(null);

  // Profile info for header
  const profile = profileStorage.loadProfile();

  // Animation timer ref for safe cleanup
  const animationTimerRef = useRef<number | null>(null);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        window.clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  // Request location on mount or when requested
  const handleLocateMe = async () => {
    setLocationPermission('loading');
    const result = await locationService.requestCurrentLocation();
    setLocationPermission(result.status);
    if (result.coordinates) {
      setPickup({
        id: `device_loc_${Date.now()}`,
        name: result.displayAddress,
        coordinates: result.coordinates,
      });
    }
  };

  // Calculate simulated distance and duration
  const distanceKm = pickup && destination
    ? locationService.calculateSimulatedDistanceKm(pickup.coordinates, destination.coordinates)
    : 4.8;

  const durationMin = locationService.estimateDurationMin(distanceKm, selectedVehicle);

  const currentVehicleOption = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];
  const estimatedFare = Math.round(currentVehicleOption.demoBaseFare + distanceKm * currentVehicleOption.demoPerKmRate);

  // Start booking transition
  const handleConfirmRide = () => {
    setBookingStatus('searching_driver');

    // Simulate finding a nearby captain after 2.2 seconds
    setTimeout(() => {
      const mockDriver: DriverInfo = {
        id: 'drv_demo_77',
        name: selectedVehicle === 'auto' ? 'Rameshwar Pal' : 'Vikram Sharma',
        rating: 4.9,
        totalTrips: 1840,
        avatarUrl: '',
        vehicleCategory: selectedVehicle,
        vehicleModel: selectedVehicle === 'auto' ? 'Bajaj Compact 4S RE' : 'Maruti Suzuki WagonR',
        vehicleColor: selectedVehicle === 'auto' ? 'Yellow & Green' : 'Silky Silver',
        licensePlate: selectedVehicle === 'auto' ? 'DL 1R Q 9421 • Demo' : 'DL 1C AB 4022 • Demo',
        etaMinutes: 2,
        isDemoData: true,
      };

      setAssignedDriver(mockDriver);
      setBookingStatus('driver_assigned');
      setDriverProgress(0);

      // Start approach animation: progress from 0 to 1 over 8 seconds
      let p = 0;
      if (animationTimerRef.current) window.clearInterval(animationTimerRef.current);

      animationTimerRef.current = window.setInterval(() => {
        p += 0.05;
        if (p >= 1) {
          if (animationTimerRef.current) window.clearInterval(animationTimerRef.current);
          setDriverProgress(1);
          setBookingStatus('driver_arrived');
        } else {
          setDriverProgress(Number(p.toFixed(2)));
        }
      }, 300);
    }, 2200);
  };

  // Start the simulated trip
  const handleStartTrip = () => {
    setBookingStatus('trip_in_progress');
    setDriverProgress(0);

    // Trip movement progress over 12 seconds
    let p = 0;
    if (animationTimerRef.current) window.clearInterval(animationTimerRef.current);

    animationTimerRef.current = window.setInterval(() => {
      p += 0.04;
      if (p >= 1) {
        if (animationTimerRef.current) window.clearInterval(animationTimerRef.current);
        setDriverProgress(1);
        handleCompleteTrip();
      } else {
        setDriverProgress(Number(p.toFixed(2)));
      }
    }, 400);
  };

  // Trip completed
  const handleCompleteTrip = () => {
    if (animationTimerRef.current) window.clearInterval(animationTimerRef.current);
    setBookingStatus('trip_completed');
    // Save to profile history
    if (pickup && destination) {
      profileStorage.addCompletedTrip({
        date: 'Today, Just now',
        vehicleCategory: selectedVehicle,
        pickupName: pickup.name.split(',')[0],
        destinationName: destination.name.split(',')[0],
        farePaid: estimatedFare,
        status: 'completed',
        driverName: assignedDriver ? `${assignedDriver.name} (${assignedDriver.licensePlate.split('•')[0].trim()})` : 'Captain Vikram',
      });
    }
  };

  // Cancel booking
  const handleCancelBooking = () => {
    if (animationTimerRef.current) window.clearInterval(animationTimerRef.current);
    setBookingStatus('idle');
    setAssignedDriver(null);
    setDriverProgress(0);
  };

  // Reset to Home
  const handleResetToHome = () => {
    if (animationTimerRef.current) window.clearInterval(animationTimerRef.current);
    setBookingStatus('idle');
    setAssignedDriver(null);
    setDriverProgress(0);
  };

  // Derive map mode
  const mapMode: MapMode =
    bookingStatus === 'idle'
      ? destination
        ? 'route_overview'
        : 'idle'
      : bookingStatus === 'searching_driver'
      ? 'route_overview'
      : bookingStatus === 'driver_assigned'
      ? 'driver_approaching'
      : bookingStatus === 'driver_arrived'
      ? 'driver_approaching'
      : bookingStatus === 'trip_in_progress'
      ? 'trip_active'
      : 'trip_completed';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
        backgroundColor: colors.warmIvory,
        position: 'relative',
        boxSizing: 'border-box',
      }}
      aria-label="Passenger Booking Home Screen"
    >
      {/* Passenger Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(245, 242, 234, 0.94)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${colors.softBorder}`,
        }}
      >
        {/* Brand & City Context */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={onBackToWelcome}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: colors.deepForest,
              border: `1.5px solid ${colors.deepForest}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '1px 1px 0px #172B2A',
            }}
            title="Return to Welcome Screen"
            aria-label="Return to Welcome Screen"
          >
            <Compass size={18} color={colors.freshLime} strokeWidth={2.4} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontWeight: 800,
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
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '5px',
                  border: `1px solid ${colors.deepForest}`,
                }}
              >
                सफ़र
              </span>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 700, color: colors.mutedGrey, textTransform: 'uppercase' }}>
              📍 DELHI NCR
            </span>
          </div>
        </div>

        {/* Profile Avatar Navigation Button */}
        <button
          type="button"
          onClick={onOpenProfile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: colors.pureWhite,
            border: `1.5px solid ${colors.deepForest}`,
            borderRadius: '9999px',
            padding: '4px 10px',
            cursor: 'pointer',
            boxShadow: '1px 1px 0px #172B2A',
          }}
          aria-label="Open Passenger Profile"
        >
          <div
            style={{
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              backgroundColor: colors.freshLime,
              border: `1px solid ${colors.deepForest}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 800,
              color: colors.deepForest,
            }}
          >
            {profile.fullName.charAt(0)}
          </div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: colors.deepForest, fontFamily: 'var(--font-display)' }}>
            Profile
          </span>
        </button>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 10px 20px',
          gap: '12px',
          boxSizing: 'border-box',
        }}
      >
        {/* Replaceable Interactive Simulated Map */}
        <SimulatedMap
          center={pickup ? pickup.coordinates : { latitude: 28.4952, longitude: 77.0891 }}
          zoom={14}
          mode={mapMode}
          pickup={pickup}
          destination={destination}
          driverMarker={
            assignedDriver
              ? {
                  id: assignedDriver.id,
                  category: assignedDriver.vehicleCategory,
                  coordinates: pickup ? pickup.coordinates : { latitude: 28.4952, longitude: 77.0891 },
                  heading: 45,
                }
              : null
          }
          progressPercent={driverProgress}
        />

        {/* Searching Nearby Captains Radar Modal Overlay */}
        {bookingStatus === 'searching_driver' && (
          <div
            role="dialog"
            aria-label="Searching for Captains"
            style={{
              backgroundColor: colors.pureWhite,
              border: `2px solid ${colors.deepForest}`,
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '1px 3px 0px #172B2A',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '12px',
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: colors.freshLime,
                border: `2px solid ${colors.deepForest}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '1px 2px 0px #172B2A',
                animation: 'pulse 1.8s infinite',
              }}
            >
              <Radar size={28} color={colors.deepForest} />
            </div>

            <div>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: colors.deepForest }}>
                Connecting to Nearby Captain...
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: colors.mutedGrey, fontWeight: 600 }}>
                Matching verified {selectedVehicle.replace('_', ' ')} captains near your pickup location.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancelBooking}
              style={{
                marginTop: '4px',
                backgroundColor: colors.warmIvory,
                border: `1.5px solid ${colors.deepForest}`,
                borderRadius: '10px',
                padding: '6px 14px',
                fontSize: '11px',
                fontWeight: 700,
                color: colors.deepForest,
                cursor: 'pointer',
              }}
            >
              Cancel Request
            </button>
          </div>
        )}

        {/* Active Driver Information Panel (Assigned, Arrived, In-Trip, Completed) */}
        {assignedDriver && bookingStatus !== 'searching_driver' && (
          <DriverInfoPanel
            status={bookingStatus}
            driver={assignedDriver}
            estimatedFare={estimatedFare}
            progressPercent={driverProgress}
            onCancelBooking={handleCancelBooking}
            onStartTrip={handleStartTrip}
            onCompleteTrip={handleCompleteTrip}
            onResetToHome={handleResetToHome}
          />
        )}

        {/* Location Inputs & Vehicle Selector (When not actively in a trip) */}
        {bookingStatus === 'idle' && (
          <>
            {/* Pickup & Destination Inputs */}
            <LocationInputCard
              pickup={pickup}
              destination={destination}
              locationPermission={locationPermission}
              onLocateMe={handleLocateMe}
              onSelectPickup={setPickup}
              onSelectDestination={setDestination}
              distanceKm={distanceKm}
              durationMin={durationMin}
            />

            {/* Vehicle Selection Cards */}
            <VehicleSelection
              selectedCategory={selectedVehicle}
              onSelectCategory={setSelectedVehicle}
              distanceKm={distanceKm}
            />

            {/* Confirm Ride CTA Button */}
            <button
              id="btn-confirm-ride"
              type="button"
              onClick={handleConfirmRide}
              disabled={!destination}
              style={{
                width: '100%',
                height: '48px',
                backgroundColor: destination ? colors.deepForest : colors.mutedGrey,
                color: colors.pureWhite,
                borderRadius: '16px',
                border: `2px solid ${colors.deepForest}`,
                fontSize: '14px',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                cursor: destination ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: destination ? '1px 3px 0px #172B2A' : 'none',
                opacity: destination ? 1 : 0.6,
                transition: 'all 0.15s ease',
              }}
            >
              <span>Confirm Ride • ₹{estimatedFare}</span>
              <ArrowRight size={16} color={colors.freshLime} strokeWidth={2.6} />
            </button>
          </>
        )}
      </main>
    </div>
  );
};
