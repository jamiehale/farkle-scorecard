import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import Player from './Player';

const ScoreCard = () => {
  const {
    selectors: {
      getPlayers,
    },
  } = useContext(GameContext);

  const players = getPlayers().map(player => (
    <Player key={player.id} player={player} />
  ));

  return (
    <>
      <ul>
        {players}
      </ul>
    </>
  );
};

export default ScoreCard;
