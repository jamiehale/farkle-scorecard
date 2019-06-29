import React from 'react';
import Round from './Round';

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
  const rounds = player.rounds.reduce(addSubtotals, { rounds: [], subTotal: 0 })
  .rounds
  .map((round, i) => (
    <li key={i}>
      <Round round={round} />
    </li>
  ));

  return (
    <>
      <h2>{player.name}</h2>
      <ul>
        {rounds}
      </ul>
      <p>Total: {player.score}</p>
    </>
  );
};

export default Player;
