import React, { useContext } from 'react';
import { GameContext } from '../GameContext';

const Scorer = () => {
  const {
    selectors: {
      getCurrentTurn,
      getCurrentPlayer,
    },
  } = useContext(GameContext);

  return (
    <>
      <h3>{getCurrentPlayer().name}</h3>
      <p>{getCurrentTurn().score}</p>
    </>
  );
};

export default Scorer;
