import React, { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { WelcomeScreen } from './components/WelcomeScreen';
import { PassengerHomeScreen } from './components/passenger/PassengerHomeScreen';
import { UserProfileScreen } from './components/profile/UserProfileScreen';

export type AppScreen = 'welcome' | 'passenger_home' | 'profile';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('passenger_home');

  return (
    <PhoneFrame
      activeScreen={currentScreen}
      onSelectScreen={setCurrentScreen}
    >
      {currentScreen === 'welcome' && (
        <WelcomeScreen onEnterPassengerApp={() => setCurrentScreen('passenger_home')} />
      )}

      {currentScreen === 'passenger_home' && (
        <PassengerHomeScreen
          onOpenProfile={() => setCurrentScreen('profile')}
          onBackToWelcome={() => setCurrentScreen('welcome')}
        />
      )}

      {currentScreen === 'profile' && (
        <UserProfileScreen onBack={() => setCurrentScreen('passenger_home')} />
      )}
    </PhoneFrame>
  );
};

export default App;
