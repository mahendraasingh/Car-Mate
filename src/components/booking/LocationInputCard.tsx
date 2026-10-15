import React, { useState } from 'react';
import { colors } from '../../theme/tokens';
import type { MapPoint } from '../../types/map';
import type { LocationPermissionState } from '../../services/locationService';
import { DEMO_PRESET_LOCATIONS } from '../../services/locationService';
import { MapPin, Navigation, Search, X, Compass, RotateCcw, ArrowUpDown } from 'lucide-react';

interface LocationInputCardProps {
  pickup: MapPoint | null;
  destination: MapPoint | null;
  locationPermission: LocationPermissionState;
  onLocateMe: () => void;
  onSelectPickup: (point: MapPoint) => void;
  onSelectDestination: (point: MapPoint | null) => void;
  distanceKm: number;
  durationMin: number;
}

export const LocationInputCard: React.FC<LocationInputCardProps> = ({
  pickup,
  destination,
  locationPermission,
  onLocateMe,
  onSelectPickup,
  onSelectDestination,
  distanceKm,
  durationMin,
}) => {
  const [isEditingPickup, setIsEditingPickup] = useState<boolean>(false);
  const [pickupText, setPickupText] = useState<string>(pickup?.name || '');
  const [destText, setDestText] = useState<string>(destination?.name || '');
  const [showDestSuggestions, setShowDestSuggestions] = useState<boolean>(false);

  const handleCustomPickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pickupText.trim()) {
      onSelectPickup({
        id: `custom_pickup_${Date.now()}`,
        name: pickupText.trim(),
        address: `${pickupText.trim()}, Local City Area`,
        coordinates: { latitude: 28.4812, longitude: 77.0621 },
      });
      setIsEditingPickup(false);
    }
  };

  const handleCustomDestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destText.trim()) {
      onSelectDestination({
        id: `custom_dest_${Date.now()}`,
        name: destText.trim(),
        address: `${destText.trim()}, Destination Hub`,
        coordinates: { latitude: 28.5204, longitude: 77.1512 },
      });
      setShowDestSuggestions(false);
    }
  };

  const handleSwap = () => {
    if (pickup && destination) {
      const oldPickup = pickup;
      onSelectPickup(destination);
      onSelectDestination(oldPickup);
      setPickupText(destination.name);
      setDestText(oldPickup.name);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: colors.pureWhite,
        border: `2px solid ${colors.deepForest}`,
        borderRadius: '20px',
        padding: '12px 14px',
        boxShadow: '1px 3px 0px #172B2A',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
      aria-label="Location and Destination Selector"
    >
      {/* Pickup Location Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Pickup Pin Indicator */}
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#22C55E',
            border: `2px solid ${colors.deepForest}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.pureWhite }} />
        </div>

        {/* Pickup Field or Form */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: colors.mutedGrey,
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                fontFamily: 'var(--font-display)',
              }}
            >
              PICKUP LOCATION
            </span>
            <button
              type="button"
              onClick={() => setIsEditingPickup(!isEditingPickup)}
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: colors.deepForest,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              {isEditingPickup ? 'Done' : 'Change'}
            </button>
          </div>

          {isEditingPickup ? (
            <form onSubmit={handleCustomPickupSubmit} style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
              <input
                type="text"
                value={pickupText}
                onChange={(e) => setPickupText(e.target.value)}
                placeholder="Enter pickup address"
                style={{
                  flex: 1,
                  padding: '4px 8px',
                  borderRadius: '8px',
                  border: `1.5px solid ${colors.deepForest}`,
                  fontSize: '12px',
                  fontWeight: 700,
                  outline: 'none',
                  backgroundColor: colors.warmIvory,
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: colors.deepForest,
                  color: colors.pureWhite,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Set
              </button>
            </form>
          ) : (
            <div
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: colors.deepForest,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {pickup?.name || 'Locating your pickup point...'}
            </div>
          )}
        </div>

        {/* Locate Me GPS Button */}
        <button
          type="button"
          onClick={onLocateMe}
          title="Use Current Device Location"
          aria-label="Locate with device GPS"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            backgroundColor: locationPermission === 'granted' ? colors.freshLime : colors.warmIvory,
            border: `1.5px solid ${colors.deepForest}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            boxShadow: '1px 1px 0px #172B2A',
          }}
        >
          {locationPermission === 'loading' ? (
            <RotateCcw size={14} className="animate-spin" color={colors.deepForest} />
          ) : (
            <Navigation size={14} color={colors.deepForest} strokeWidth={2.4} />
          )}
        </button>
      </div>

      {/* Connecting Dotted Route Bar with Swap Button */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', position: 'relative' }}>
        <div
          style={{
            width: '2px',
            height: '14px',
            backgroundColor: colors.deepForest,
            opacity: 0.35,
            marginLeft: '5px',
          }}
        />
        {destination && (
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Pickup and Drop"
            aria-label="Swap pickup and destination"
            style={{
              position: 'absolute',
              right: '8px',
              background: colors.warmIvory,
              border: `1px solid ${colors.softBorder}`,
              borderRadius: '6px',
              padding: '2px 5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '10px',
              fontWeight: 700,
              color: colors.deepForest,
            }}
          >
            <ArrowUpDown size={11} />
            <span>Swap</span>
          </button>
        )}
      </div>

      {/* Destination Location Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Coral Drop Pin */}
        <div
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: colors.doodleCoral,
            border: `2px solid ${colors.deepForest}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <MapPin size={13} color={colors.pureWhite} strokeWidth={2.6} />
        </div>

        {/* Destination Input Field */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <form onSubmit={handleCustomDestSubmit} style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: colors.warmIvory,
                border: `1.5px solid ${colors.deepForest}`,
                borderRadius: '12px',
                padding: '5px 8px',
              }}
            >
              <Search size={14} color={colors.deepForest} />
              <input
                type="text"
                value={destText}
                onChange={(e) => {
                  setDestText(e.target.value);
                  setShowDestSuggestions(true);
                }}
                onFocus={() => setShowDestSuggestions(true)}
                placeholder="Where do you want to go?"
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: colors.deepForest,
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
              {destText && (
                <button
                  type="button"
                  onClick={() => {
                    setDestText('');
                    onSelectDestination(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: colors.mutedGrey,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label="Clear destination"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Demo Suggested Destinations Pills */}
      {(!destination || showDestSuggestions) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: colors.mutedGrey,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            Quick Popular Destinations:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {DEMO_PRESET_LOCATIONS.slice(0, 4).map((loc) => (
              <button
                key={loc.id}
                type="button"
                onClick={() => {
                  onSelectDestination(loc);
                  setDestText(loc.name);
                  setShowDestSuggestions(false);
                }}
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: colors.deepForest,
                  backgroundColor: colors.warmIvory,
                  border: `1px solid ${colors.deepForest}`,
                  borderRadius: '9999px',
                  padding: '3px 8px',
                  cursor: 'pointer',
                  boxShadow: '1px 1px 0px #172B2A',
                }}
              >
                {loc.name.split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Route Estimation Summary Strip */}
      {destination && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAF8F3',
            border: `1px dashed ${colors.deepForest}`,
            borderRadius: '12px',
            padding: '6px 10px',
            marginTop: '2px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Compass size={13} color={colors.deepForest} />
            <span style={{ fontSize: '11px', fontWeight: 800, color: colors.deepForest }}>
              {distanceKm.toFixed(1)} km • ~{durationMin} mins
            </span>
          </div>
          <span
            style={{
              fontSize: '9px',
              fontWeight: 700,
              color: colors.mutedGrey,
            }}
          >
            Simulated Demo Estimate
          </span>
        </div>
      )}
    </div>
  );
};
