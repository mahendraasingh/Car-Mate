/**
 * Profile storage and local persistence service for SAFAR
 * Uses browser localStorage for prototype persistence
 */

import type { PassengerProfile, SavedPlace, UserPreferences, PastTrip } from '../types/passenger';

const STORAGE_KEY = 'safar_passenger_profile_v1';

const DEFAULT_PROFILE: PassengerProfile = {
  id: 'usr_demo_001',
  fullName: 'Arjun Mehta',
  phone: '+91 98765 43210',
  email: 'arjun.mehta@example.com',
  avatarSeed: 'arjun',
  isDemoProfile: true,
  preferences: {
    preferredVehicle: 'auto',
    ecoPoolingOptIn: true,
    quietRide: false,
    language: 'en',
  },
  savedPlaces: [
    {
      id: 'place_home',
      title: 'Home',
      tag: 'home',
      address: 'B-42, Sector 14, Gurugram, NCR',
      coordinates: { latitude: 28.4731, longitude: 77.0425 },
    },
    {
      id: 'place_work',
      title: 'Work / CyberHub',
      tag: 'work',
      address: 'DLF Cyber City, Building 10, Gurugram',
      coordinates: { latitude: 28.4952, longitude: 77.0891 },
    },
    {
      id: 'place_metro',
      title: 'Huda City Centre Metro',
      tag: 'other',
      address: 'Yellow Line Station, Gurugram',
      coordinates: { latitude: 28.4593, longitude: 77.0725 },
    },
  ],
  rideHistory: [
    {
      id: 'trip_108',
      date: 'Yesterday, 6:45 PM',
      vehicleCategory: 'auto',
      pickupName: 'DLF Cyber City, Gurugram',
      destinationName: 'Sector 14, Gurugram',
      farePaid: 48,
      status: 'completed',
      driverName: 'Rameshwar Kumar (Auto #4182)',
    },
    {
      id: 'trip_107',
      date: '12 Oct, 9:15 AM',
      vehicleCategory: 'compact_cab',
      pickupName: 'Sector 14, Gurugram',
      destinationName: 'Aerocity, Terminal 3 Road',
      farePaid: 210,
      status: 'completed',
      driverName: 'Sanjay Rawat (Cab #8921)',
    },
    {
      id: 'trip_106',
      date: '10 Oct, 8:30 PM',
      vehicleCategory: 'auto',
      pickupName: 'Galleria Market, Gurugram',
      destinationName: 'Sector 14, Gurugram',
      farePaid: 39,
      status: 'completed',
      driverName: 'Mohd. Imran (Auto #1190)',
    },
  ],
};

export const profileStorage = {
  loadProfile(): PassengerProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          preferences: { ...DEFAULT_PROFILE.preferences, ...(parsed.preferences || {}) },
          savedPlaces: parsed.savedPlaces || DEFAULT_PROFILE.savedPlaces,
          rideHistory: parsed.rideHistory || DEFAULT_PROFILE.rideHistory,
        };
      }
    } catch (e) {
      console.warn('Could not load profile from localStorage, using default demo profile', e);
    }
    return DEFAULT_PROFILE;
  },

  saveProfile(profile: PassengerProfile): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      return true;
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
      return false;
    }
  },

  updatePersonalInfo(fullName: string, phone: string, email: string): PassengerProfile {
    const current = this.loadProfile();
    const updated: PassengerProfile = {
      ...current,
      fullName: fullName.trim() || current.fullName,
      phone: phone.trim() || current.phone,
      email: email.trim() || current.email,
    };
    this.saveProfile(updated);
    return updated;
  },

  updatePreferences(prefs: Partial<UserPreferences>): PassengerProfile {
    const current = this.loadProfile();
    const updated: PassengerProfile = {
      ...current,
      preferences: {
        ...current.preferences,
        ...prefs,
      },
    };
    this.saveProfile(updated);
    return updated;
  },

  addSavedPlace(place: Omit<SavedPlace, 'id'>): PassengerProfile {
    const current = this.loadProfile();
    const newPlace: SavedPlace = {
      ...place,
      id: `place_${Date.now()}`,
    };
    const updated: PassengerProfile = {
      ...current,
      savedPlaces: [newPlace, ...current.savedPlaces],
    };
    this.saveProfile(updated);
    return updated;
  },

  removeSavedPlace(id: string): PassengerProfile {
    const current = this.loadProfile();
    const updated: PassengerProfile = {
      ...current,
      savedPlaces: current.savedPlaces.filter((p) => p.id !== id),
    };
    this.saveProfile(updated);
    return updated;
  },

  addCompletedTrip(trip: Omit<PastTrip, 'id'>): PassengerProfile {
    const current = this.loadProfile();
    const newTrip: PastTrip = {
      ...trip,
      id: `trip_${Date.now()}`,
    };
    const updated: PassengerProfile = {
      ...current,
      rideHistory: [newTrip, ...current.rideHistory],
    };
    this.saveProfile(updated);
    return updated;
  },
};
