/**
 * Passenger Domain & Booking State Types for SAFAR
 */

import type { Coordinates, MapPoint, RouteGeometry } from './map';

export type VehicleCategory = 'auto' | 'small_cab' | 'compact_cab' | 'suv';

export type RideMode = 'solo' | 'shared';

export interface VehicleOption {
  id: VehicleCategory;
  name: string;
  hindiName: string;
  categoryTitle: string;
  description: string;
  capacity: string;
  demoBaseFare: number;
  demoPerKmRate: number;
  estimatedArrivalMin: number;
  accentColor: string;
  badgeText: string;
}

export type BookingStatus =
  | 'idle'
  | 'location_selected'
  | 'searching_driver'
  | 'driver_assigned'
  | 'driver_arrived'
  | 'trip_in_progress'
  | 'trip_completed';

export interface DriverInfo {
  id: string;
  name: string;
  rating: number;
  totalTrips: number;
  avatarUrl: string;
  vehicleCategory: VehicleCategory;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string; // Fictional demo plate
  etaMinutes: number;
  isDemoData: true;
}

export interface BookingState {
  status: BookingStatus;
  pickup: MapPoint | null;
  destination: MapPoint | null;
  selectedVehicle: VehicleCategory;
  route: RouteGeometry | null;
  assignedDriver: DriverInfo | null;
  driverProgress: number; // 0 to 1 along approach or trip route
  estimatedFare: number;
  tripStartedAt?: number;
  tripCompletedAt?: number;
}

export interface SavedPlace {
  id: string;
  title: string;
  tag: 'home' | 'work' | 'other';
  address: string;
  coordinates: Coordinates;
}

export interface UserPreferences {
  preferredVehicle: VehicleCategory;
  ecoPoolingOptIn: boolean;
  quietRide: boolean;
  language: 'en' | 'hi';
}

export interface PastTrip {
  id: string;
  date: string;
  vehicleCategory: VehicleCategory;
  pickupName: string;
  destinationName: string;
  farePaid: number;
  status: 'completed' | 'cancelled';
  driverName: string;
}

export interface PassengerProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatarSeed: string;
  savedPlaces: SavedPlace[];
  preferences: UserPreferences;
  rideHistory: PastTrip[];
  isDemoProfile: true;
}
