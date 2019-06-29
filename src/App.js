import React from 'react';
import { GameContextProvider } from './GameContext';
import Game from './components/Game';

const App = () => (
  <GameContextProvider>
    <Game />
  </GameContextProvider>
);

export default App;
