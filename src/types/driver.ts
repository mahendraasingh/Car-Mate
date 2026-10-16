/**
 * SAFAR Driver Domain & State Contracts
 * Commercial Driver Partner Interface Types
 */

import type { Coordinates, MapPoint, RouteGeometry } from './map';
import type { VehicleCategory } from './passenger';

export type DriverStatus = 'offline' | 'online' | 'busy';

export type DriverTripLifecycleState =
  | 'idle'
  | 'request_received'
  | 'request_accepted'
  | 'approaching_pickup'
  | 'arrived_at_pickup'
  | 'trip_started'
  | 'trip_in_progress'
  | 'trip_completed';

export interface DriverVehicleDetails {
  category: VehicleCategory;
  categoryLabel: string;
  makeModel: string;
  registrationNumber: string; // Fictional commercial demo plate e.g. "DL 1ZC 4289"
  fuelType: 'EV' | 'CNG' | 'Petrol' | 'Diesel';
  seatingCapacity: number;
  commercialPermitNumber: string; // Demo permit number
  insuranceExpiryDate: string;
  fitnessCertExpiryDate: string;
  isAvailable: boolean;
}

export interface DriverPartnerProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  avatarUrl: string;
  rating: number;
  totalTripsCompleted: number;
  acceptanceRatePercent: number;
  drivingHoursToday: number;
  driverLicenseNumber: string; // Masked demo DL: "DL-1420220098***"
  joinedYear: number;
  city: string;
  vehicle: DriverVehicleDetails;
  isDemoDriver: true;
}

export interface SimulatedRideRequest {
  id: string;
  passengerName: string;
  pickup: MapPoint;
  destination: MapPoint;
  vehicleCategory: VehicleCategory;
  estimatedFare: number;
  distanceKm: number;
  estimatedDurationMin: number;
  passengerCount: number;
  paymentMode: 'Cash' | 'UPI / Online';
  isSharedPooling: boolean;
  requestedAt: number;
  expiresInSeconds: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}

export interface ActiveDriverTrip {
  id: string;
  request: SimulatedRideRequest;
  state: DriverTripLifecycleState;
  routeGeometry: RouteGeometry;
  driverCurrentLocation: Coordinates;
  progressPercent: number; // 0.0 to 1.0 along approach or trip path
  acceptedAt: number;
  arrivedAt?: number;
  startedAt?: number;
  completedAt?: number;
  actualFare: number;
}

export interface DriverTripRecord {
  id: string;
  timestamp: string;
  formattedDate: string;
  pickupName: string;
  destinationName: string;
  vehicleCategory: VehicleCategory;
  fareEarned: number;
  distanceKm: number;
  durationMinutes: number;
  status: 'completed' | 'cancelled';
  passengerLabel: string;
  paymentMode: string;
}

export interface DriverEarningsSummary {
  todayTotal: number;
  weeklyTotal: number;
  todayTripsCount: number;
  onlineHoursToday: number;
  dailyTrend: {
    dayName: string;
    dateStr: string;
    amount: number;
    trips: number;
  }[];
  recentTrips: DriverTripRecord[];
}
