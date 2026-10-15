import React from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { WelcomeScreen } from './components/WelcomeScreen';

export const App: React.FC = () => {
  return (
    <PhoneFrame>
      <WelcomeScreen />
    </PhoneFrame>
  );
};

export default App;
