import React, { useContext } from 'react';
import Setup from './Setup';
import ScoreCard from './ScoreCard';
import Scorer from './Scorer';
import { GameContext } from '../GameContext';

const Game = () => {
  const {
    selectors: {
      getMode,
    }
  } = useContext(GameContext);

  return (
    <>
      <h1>Howdy</h1>
      {getMode() === 'setup' && (
        <Setup />
      )}
      {getMode() === 'playing' && (
        <>
          <ScoreCard />
          <Scorer />
        </>
      )}
    </>
  );
};

export default Game;
