import React, { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PassengerHomeScreen } from './components/passenger/PassengerHomeScreen';
import { UserProfileScreen } from './components/profile/UserProfileScreen';
import { DriverHomeScreen } from './components/driver/DriverHomeScreen';
import { DriverEarningsScreen } from './components/driver/DriverEarningsScreen';
import { DriverTripHistoryScreen } from './components/driver/DriverTripHistoryScreen';
import { DriverProfileScreen } from './components/driver/DriverProfileScreen';
import { driverService } from './services/driverService';
import type { DriverPartnerProfile, DriverEarningsSummary } from './types/driver';

export type AppScreen =
  | 'welcome'
  | 'passenger_home'
  | 'profile'
  | 'driver_home'
  | 'driver_earnings'
  | 'driver_history'
  | 'driver_profile';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('driver_home');
  const [driverProfile, setDriverProfile] = useState<DriverPartnerProfile>(() => driverService.getProfile());
  const [driverEarnings, setDriverEarnings] = useState<DriverEarningsSummary>(() => driverService.getEarnings());

  const handleUpdateDriverProfile = (updated: DriverPartnerProfile) => {
    setDriverProfile(updated);
    driverService.saveProfile(updated);
  };

  return (
    <PhoneFrame
      activeScreen={currentScreen}
      onSelectScreen={setCurrentScreen}
    >
      {/* Passenger Experience Screens */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onEnterPassengerApp={() => setCurrentScreen('passenger_home')}
          onEnterDriverApp={() => setCurrentScreen('driver_home')}
        />
      )}

      {currentScreen === 'passenger_home' && (
        <PassengerHomeScreen
          onOpenProfile={() => setCurrentScreen('profile')}
          onBackToWelcome={() => setCurrentScreen('welcome')}
          onSwitchToDriver={() => setCurrentScreen('driver_home')}
        />
      )}

      {currentScreen === 'profile' && (
        <UserProfileScreen onBack={() => setCurrentScreen('passenger_home')} />
      )}

      {/* Driver Experience Screens */}
      {currentScreen === 'driver_home' && (
        <DriverHomeScreen
          onNavigateEarnings={() => {
            setDriverEarnings(driverService.getEarnings());
            setCurrentScreen('driver_earnings');
          }}
          onNavigateHistory={() => {
            setDriverEarnings(driverService.getEarnings());
            setCurrentScreen('driver_history');
          }}
          onNavigateProfile={() => {
            setDriverProfile(driverService.getProfile());
            setCurrentScreen('driver_profile');
          }}
          onSwitchToPassenger={() => setCurrentScreen('passenger_home')}
        />
      )}

      {currentScreen === 'driver_earnings' && (
        <DriverEarningsScreen
          earnings={driverEarnings}
          onBack={() => setCurrentScreen('driver_home')}
        />
      )}

      {currentScreen === 'driver_history' && (
        <DriverTripHistoryScreen
          trips={driverEarnings.recentTrips}
          onBack={() => setCurrentScreen('driver_home')}
        />
      )}

      {currentScreen === 'driver_profile' && (
        <DriverProfileScreen
          profile={driverProfile}
          onUpdateProfile={handleUpdateDriverProfile}
          onBack={() => setCurrentScreen('driver_home')}
        />
      )}
    </PhoneFrame>
  );
};

export default App;
