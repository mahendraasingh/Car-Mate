/**
 * Geolocation Service for SAFAR Passenger
 * Provides browser navigator.geolocation integration with permission states,
 * fallback reverse geocoding labels, and manual location support.
 */

import type { Coordinates, MapPoint } from '../types/map';

export type LocationPermissionState = 'prompt' | 'granted' | 'denied' | 'unavailable' | 'loading';

export interface LocationResult {
  status: LocationPermissionState;
  coordinates: Coordinates | null;
  displayAddress: string;
  errorMessage?: string;
  isSimulatedFallback?: boolean;
}

// Preset verified urban metro demo locations
export const DEMO_PRESET_LOCATIONS: MapPoint[] = [
  {
    id: 'loc_cybercity',
    name: 'DLF Cyber City, Phase 2',
    address: 'DLF Cyber City, Gurugram, Delhi NCR',
    coordinates: { latitude: 28.4952, longitude: 77.0891 },
  },
  {
    id: 'loc_cp',
    name: 'Connaught Place (Inner Circle)',
    address: 'Block A, Connaught Place, New Delhi',
    coordinates: { latitude: 28.6315, longitude: 77.2167 },
  },
  {
    id: 'loc_aerocity',
    name: 'IGI Airport Aerocity Hospitality',
    address: 'Asset 5B, Aerocity, New Delhi',
    coordinates: { latitude: 28.5512, longitude: 77.1215 },
  },
  {
    id: 'loc_huda',
    name: 'Huda City Centre Metro Gate 2',
    address: 'Sector 29, Gurugram, Haryana',
    coordinates: { latitude: 28.4593, longitude: 77.0725 },
  },
  {
    id: 'loc_galleria',
    name: 'Galleria Market DLF Phase 4',
    address: 'DLF Phase IV, Sector 28, Gurugram',
    coordinates: { latitude: 28.4674, longitude: 77.0818 },
  },
  {
    id: 'loc_hauzkhas',
    name: 'Hauz Khas Social & Village',
    address: 'Deer Park, Hauz Khas, New Delhi',
    coordinates: { latitude: 28.5494, longitude: 77.1932 },
  },
];

export const locationService = {
  /**
   * Request device location via standard Web Geolocation API
   */
  async requestCurrentLocation(): Promise<LocationResult> {
    if (!('geolocation' in navigator)) {
      return {
        status: 'unavailable',
        coordinates: DEMO_PRESET_LOCATIONS[0].coordinates,
        displayAddress: DEMO_PRESET_LOCATIONS[0].name,
        errorMessage: 'Geolocation is not supported by your browser.',
        isSimulatedFallback: true,
      };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: Coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve({
            status: 'granted',
            coordinates: coords,
            displayAddress: `Current Location (${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)})`,
            isSimulatedFallback: false,
          });
        },
        (error) => {
          let errorMsg = 'Location permission was denied or timed out.';
          if (error.code === error.PERMISSION_DENIED) {
            errorMsg = 'Location access denied. You can manually enter your pickup point.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMsg = 'GPS signal unavailable. Switched to manual location mode.';
          }

          resolve({
            status: error.code === error.PERMISSION_DENIED ? 'denied' : 'unavailable',
            coordinates: DEMO_PRESET_LOCATIONS[0].coordinates,
            displayAddress: DEMO_PRESET_LOCATIONS[0].name,
            errorMessage: errorMsg,
            isSimulatedFallback: true,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 60000,
        }
      );
    });
  },

  /**
   * Calculate simulated straight-line road distance in kilometers between two points
   */
  calculateSimulatedDistanceKm(from: Coordinates, to: Coordinates): number {
    const latDiff = Math.abs(from.latitude - to.latitude) * 111.0;
    const lngDiff = Math.abs(from.longitude - to.longitude) * 98.0;
    // Urban road factor approximation (~1.3x Euclidean)
    const euclidean = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    return Math.max(1.8, Number((euclidean * 1.32).toFixed(1)));
  },

  /**
   * Estimate travel duration in minutes based on distance and vehicle category
   */
  estimateDurationMin(distanceKm: number, vehicle: 'auto' | 'small_cab' | 'compact_cab' | 'suv'): number {
    const avgSpeedsKmh: Record<string, number> = {
      auto: 24, // Nimble in city traffic
      small_cab: 26,
      compact_cab: 25,
      suv: 22,
    };
    const speed = avgSpeedsKmh[vehicle] || 25;
    const timeHours = distanceKm / speed;
    return Math.max(6, Math.round(timeHours * 60));
  },
};
