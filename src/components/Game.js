import React, { useContext } from 'react';
import Setup from './Setup';
import ScoreCard from './ScoreCard';
import Scorer from './Scorer';
import { GameContext } from '../GameContext';

const Game = () => {
  const { gameStateSelectors } = useContext(GameContext);

  return (
    <>
      <h1>Howdy</h1>
      {gameStateSelectors.getMode() === 'setup' && (
        <Setup />
      )}
      {gameStateSelectors.getMode() === 'playing' && (
        <>
          <ScoreCard />
          <Scorer />
        </>
      )}
    </>
  );
};

export default Game;
