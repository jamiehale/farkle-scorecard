import React from 'react';
import { GameContextProvider } from './GameContext';
import ScoreCard from './components/ScoreCard';
import Scorer from './components/Scorer';

const App = () => (
  <GameContextProvider>
    <h1>Howdy</h1>
    <ScoreCard />
    <Scorer />
  </GameContextProvider>
);

export default App;
