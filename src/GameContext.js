import React from 'react';
import useGameState from './hooks/game-state';

export const GameContext = React.createContext();

export const GameContextProvider = ({
  children,
}) => {
  const { state, gameStateSelectors, gameActions } = useGameState();

  return (
    <GameContext.Provider value={{ state, gameStateSelectors, gameActions }}>
      {children}
    </GameContext.Provider>
  );
};
