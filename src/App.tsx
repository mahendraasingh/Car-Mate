import React from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { colors } from './theme/tokens';

export const App: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: colors.warmIvory,
        color: colors.deepForest,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <WelcomeScreen />
    </div>
  );
};

export default App;
