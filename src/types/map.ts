/**
 * Map abstraction contracts and geographic representation
 * Enables seamless replacement of simulated map with Google Maps or Mapbox later
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapPoint {
  id: string;
  name: string;
  coordinates: Coordinates;
  address?: string;
}

export interface RouteGeometry {
  points: Coordinates[];
  totalDistanceKm: number;
  estimatedDurationMin: number;
  isSimulatedDemo: boolean;
}

export interface VehicleMarkerData {
  id: string;
  category: 'auto' | 'small_cab' | 'compact_cab' | 'suv';
  coordinates: Coordinates;
  heading: number; // degrees 0-360
  label?: string;
}

export type MapMode = 'idle' | 'route_overview' | 'driver_approaching' | 'trip_active' | 'trip_completed';

export interface MapAdapterProps {
  center: Coordinates;
  zoom: number;
  mode: MapMode;
  pickup?: MapPoint | null;
  destination?: MapPoint | null;
  driverMarker?: VehicleMarkerData | null;
  route?: RouteGeometry | null;
  progressPercent?: number;
  onMarkerClick?: (markerId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
