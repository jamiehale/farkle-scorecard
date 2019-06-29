import React, { useContext } from 'react';
import { GameContext } from '../GameContext';

const Player = ({
  player,
}) => {
  const {
    selectors: {
      getCurrentPlayer,
    },
    actions: {
      recordScore,
    }
  } = useContext(GameContext);

  const rounds = player.rounds.reduce(({ rounds, subTotal }, round) => ({
    rounds: [
      ...rounds,
      {
        ...round,
        totalScore: subTotal + round.score,
      },
    ],
    subTotal: subTotal + round.score,
  }), { rounds: [], subTotal: 0 })
  .rounds
  .map((round, i) => (
    <li key={i}>{round.score} | {round.totalScore}</li>
  ));

  return (
    <>
      <h2>{player.name} ({player.id})</h2>
      <ul>
        {rounds}
      </ul>
      <button
        type="button"
        onClick={() => recordScore(player.id, 999)}
        disabled={player.id !== getCurrentPlayer().id}
      >
        Add
      </button>
    </>
  );
};

export default Player;
