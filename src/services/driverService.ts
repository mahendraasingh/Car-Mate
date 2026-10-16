/**
 * SAFAR Commercial Driver Partner Storage & Simulation Engine
 * Manages local persistence for profile, earnings, and deterministic dispatch
 */

import type {
  DriverPartnerProfile,
  DriverEarningsSummary,
  DriverTripRecord,
  SimulatedRideRequest,
  ActiveDriverTrip,
} from '../types/driver';
import type { VehicleCategory } from '../types/passenger';

const STORAGE_KEYS = {
  PROFILE: 'safar_driver_profile_v1',
  EARNINGS: 'safar_driver_earnings_v1',
  ONLINE_STATUS: 'safar_driver_online_status_v1',
};

export const DEFAULT_DRIVER_PROFILE: DriverPartnerProfile = {
  id: 'drv_delhi_8829',
  fullName: 'Rajesh Kumar Verma',
  phone: '+91 98102 34567',
  email: 'rajesh.verma.partner@safar.in',
  avatarUrl: '/img/7520f0ff7b8c9ea532fd11380bc072ef.jpg',
  rating: 4.89,
  totalTripsCompleted: 1428,
  acceptanceRatePercent: 94,
  drivingHoursToday: 4.5,
  driverLicenseNumber: 'DL-1420180094821 (Commercial LMV)',
  joinedYear: 2022,
  city: 'Delhi NCR',
  vehicle: {
    category: 'compact_cab',
    categoryLabel: 'Prime Sedan / Compact Cab',
    makeModel: 'Maruti Suzuki Dzire Tour S (CNG)',
    registrationNumber: 'DL 1ZC 4289',
    fuelType: 'CNG',
    seatingCapacity: 4,
    commercialPermitNumber: 'DL-ALL-INDIA-CAB-9921',
    insuranceExpiryDate: '15-Dec-2027',
    fitnessCertExpiryDate: '20-Oct-2026',
    isAvailable: true,
  },
  isDemoDriver: true,
};

export const INITIAL_EARNINGS: DriverEarningsSummary = {
  todayTotal: 860,
  weeklyTotal: 9450,
  todayTripsCount: 3,
  onlineHoursToday: 4.5,
  dailyTrend: [
    { dayName: 'Mon', dateStr: '12 Oct', amount: 1680, trips: 6 },
    { dayName: 'Tue', dateStr: '13 Oct', amount: 1820, trips: 7 },
    { dayName: 'Wed', dateStr: '14 Oct', amount: 1540, trips: 5 },
    { dayName: 'Thu', dateStr: '15 Oct', amount: 1950, trips: 8 },
    { dayName: 'Fri', dateStr: '16 Oct (Today)', amount: 860, trips: 3 },
    { dayName: 'Sat', dateStr: '17 Oct', amount: 0, trips: 0 },
    { dayName: 'Sun', dateStr: '18 Oct', amount: 0, trips: 0 },
  ],
  recentTrips: [
    {
      id: 'trip_demo_01',
      timestamp: 'Today, 08:35 AM',
      formattedDate: '16 Oct 2026',
      pickupName: 'Connaught Place Inner Circle',
      destinationName: 'Cyber Hub, DLF Phase 2, Gurgaon',
      vehicleCategory: 'compact_cab',
      fareEarned: 380,
      distanceKm: 24.5,
      durationMinutes: 42,
      status: 'completed',
      passengerLabel: 'Commuter #819',
      paymentMode: 'UPI / Online',
    },
    {
      id: 'trip_demo_02',
      timestamp: 'Today, 10:15 AM',
      formattedDate: '16 Oct 2026',
      pickupName: 'IGI Airport Terminal 3',
      destinationName: 'Hauz Khas Social, New Delhi',
      vehicleCategory: 'compact_cab',
      fareEarned: 310,
      distanceKm: 16.2,
      durationMinutes: 30,
      status: 'completed',
      passengerLabel: 'Airport Passenger #204',
      paymentMode: 'Cash',
    },
    {
      id: 'trip_demo_03',
      timestamp: 'Today, 11:40 AM',
      formattedDate: '16 Oct 2026',
      pickupName: 'Saket City Centre Mall',
      destinationName: 'Nehru Place Metro Station',
      vehicleCategory: 'compact_cab',
      fareEarned: 170,
      distanceKm: 7.8,
      durationMinutes: 18,
      status: 'completed',
      passengerLabel: 'Metro Commuter #511',
      paymentMode: 'UPI / Online',
    },
  ],
};

// Realistic pool of simulated incoming booking requests
const SIMULATED_REQUESTS_POOL: Omit<SimulatedRideRequest, 'id' | 'requestedAt' | 'expiresInSeconds' | 'status'>[] = [
  {
    passengerName: 'Passenger #394 (Nearby Commuter)',
    pickup: {
      id: 'p_cp',
      name: 'Barakhamba Road Metro, Gate 2',
      address: 'Connaught Place, Central Delhi',
      coordinates: { latitude: 28.6304, longitude: 77.2273 },
    },
    destination: {
      id: 'd_noida',
      name: 'Advant Navis Business Park',
      address: 'Sector 142, Noida Expressway',
      coordinates: { latitude: 28.5032, longitude: 77.4082 },
    },
    vehicleCategory: 'compact_cab',
    estimatedFare: 420,
    distanceKm: 26.8,
    estimatedDurationMin: 38,
    passengerCount: 2,
    paymentMode: 'UPI / Online',
    isSharedPooling: false,
  },
  {
    passengerName: 'Airport Rider #802',
    pickup: {
      id: 'p_aerocity',
      name: 'Worldmark 1, Aerocity',
      address: 'Hospitality District, New Delhi',
      coordinates: { latitude: 28.5501, longitude: 77.1215 },
    },
    destination: {
      id: 'd_gurgaon',
      name: 'One Horizon Center, Golf Course Road',
      address: 'DLF Phase 5, Gurgaon',
      coordinates: { latitude: 28.4744, longitude: 77.0982 },
    },
    vehicleCategory: 'compact_cab',
    estimatedFare: 360,
    distanceKm: 18.4,
    estimatedDurationMin: 28,
    passengerCount: 1,
    paymentMode: 'UPI / Online',
    isSharedPooling: false,
  },
  {
    passengerName: 'Office Commuter #107',
    pickup: {
      id: 'p_lajpat',
      name: 'Lajpat Nagar Central Market',
      address: 'Ring Road, South Delhi',
      coordinates: { latitude: 28.5701, longitude: 77.2435 },
    },
    destination: {
      id: 'd_cyberhub',
      name: 'Cyber City Building 10',
      address: 'DLF Phase 2, Gurgaon',
      coordinates: { latitude: 28.4952, longitude: 77.0891 },
    },
    vehicleCategory: 'compact_cab',
    estimatedFare: 480,
    distanceKm: 28.2,
    estimatedDurationMin: 44,
    passengerCount: 1,
    paymentMode: 'Cash',
    isSharedPooling: false,
  },
  {
    passengerName: 'Metro Link Rider #612',
    pickup: {
      id: 'p_aiims',
      name: 'AIIMS Metro Station, Gate 1',
      address: 'Sri Aurobindo Marg, Ansari Nagar',
      coordinates: { latitude: 28.5672, longitude: 77.2104 },
    },
    destination: {
      id: 'd_saket',
      name: 'Select CITYWALK Mall',
      address: 'District Centre, Saket',
      coordinates: { latitude: 28.5284, longitude: 77.2185 },
    },
    vehicleCategory: 'auto',
    estimatedFare: 110,
    distanceKm: 6.4,
    estimatedDurationMin: 16,
    passengerCount: 2,
    paymentMode: 'UPI / Online',
    isSharedPooling: false,
  },
];

let requestCounter = 100;

export const driverService = {
  getProfile(): DriverPartnerProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading driver profile from localStorage:', e);
    }
    return DEFAULT_DRIVER_PROFILE;
  },

  saveProfile(profile: DriverPartnerProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Error saving driver profile to localStorage:', e);
    }
  },

  getOnlineStatus(): boolean {
    try {
      const status = localStorage.getItem(STORAGE_KEYS.ONLINE_STATUS);
      return status === 'true';
    } catch {
      return false;
    }
  },

  setOnlineStatus(isOnline: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ONLINE_STATUS, isOnline ? 'true' : 'false');
    } catch (e) {
      console.warn('Error saving driver status:', e);
    }
  },

  getEarnings(): DriverEarningsSummary {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EARNINGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading driver earnings from localStorage:', e);
    }
    return INITIAL_EARNINGS;
  },

  saveEarnings(earnings: DriverEarningsSummary): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EARNINGS, JSON.stringify(earnings));
    } catch (e) {
      console.warn('Error saving driver earnings to localStorage:', e);
    }
  },

  recordCompletedTrip(trip: ActiveDriverTrip): DriverEarningsSummary {
    const current = this.getEarnings();
    requestCounter += 1;

    const newRecord: DriverTripRecord = {
      id: `trip_live_${Date.now()}_${requestCounter}`,
      timestamp: 'Just now',
      formattedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      pickupName: trip.request.pickup.name,
      destinationName: trip.request.destination.name,
      vehicleCategory: trip.request.vehicleCategory,
      fareEarned: trip.actualFare,
      distanceKm: trip.request.distanceKm,
      durationMinutes: Math.max(12, trip.request.estimatedDurationMin),
      status: 'completed',
      passengerLabel: trip.request.passengerName,
      paymentMode: trip.request.paymentMode,
    };

    // Update today and weekly totals atomically
    const updatedToday = current.todayTotal + trip.actualFare;
    const updatedWeekly = current.weeklyTotal + trip.actualFare;
    const updatedCount = current.todayTripsCount + 1;

    // Update daily trend for today
    const updatedTrend = current.dailyTrend.map((d) => {
      if (d.dayName.includes('Today')) {
        return {
          ...d,
          amount: d.amount + trip.actualFare,
          trips: d.trips + 1,
        };
      }
      return d;
    });

    const updatedEarnings: DriverEarningsSummary = {
      todayTotal: updatedToday,
      weeklyTotal: updatedWeekly,
      todayTripsCount: updatedCount,
      onlineHoursToday: parseFloat((current.onlineHoursToday + 0.5).toFixed(1)),
      dailyTrend: updatedTrend,
      recentTrips: [newRecord, ...current.recentTrips],
    };

    this.saveEarnings(updatedEarnings);

    // Also increment driver profile total trips
    const profile = this.getProfile();
    profile.totalTripsCompleted += 1;
    profile.drivingHoursToday = updatedEarnings.onlineHoursToday;
    this.saveProfile(profile);

    return updatedEarnings;
  },

  generateSimulatedRequest(preferredCategory?: VehicleCategory): SimulatedRideRequest {
    requestCounter += 1;
    const pool = SIMULATED_REQUESTS_POOL;
    const template = pool[Math.floor(Math.random() * pool.length)];

    return {
      ...template,
      id: `req_${Date.now()}_${requestCounter}`,
      vehicleCategory: preferredCategory || template.vehicleCategory,
      requestedAt: Date.now(),
      expiresInSeconds: 25,
      status: 'pending',
    };
  },
};
