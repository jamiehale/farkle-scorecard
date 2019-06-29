import React from 'react';
import useGameState from './hooks/game-state';

export const GameContext = React.createContext();

export const GameContextProvider = ({
  children,
}) => {
  const { state, selectors, actions } = useGameState();

  return (
    <GameContext.Provider value={{ state, selectors, actions }}>
      {children}
    </GameContext.Provider>
  );
};
