import React, { useContext } from 'react';
import { GameContext } from '../GameContext';

const addSubtotals = ({ rounds, subTotal }, round) => ({
  rounds: [
    ...rounds,
    {
      ...round,
      totalScore: subTotal + round.score,
    },
  ],
  subTotal: subTotal + round.score,
});

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

  const rounds = player.rounds.reduce(addSubtotals, { rounds: [], subTotal: 0 })
  .rounds
  .map((round, i) => (
    <li key={i}>{round.score} | {round.totalScore}</li>
  ));

  return (
    <>
      <h2>{player.name}</h2>
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
