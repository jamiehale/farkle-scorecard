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

const PlayerRounds = ({
  rounds,
}) => {
  const roundItems = rounds.reduce(addSubtotals, { rounds: [], subTotal: 0 })
  .rounds
  .map((round, i) => (
    <Round key={i} round={round} />
  ));

  return (
    <>
      {roundItems}
    </>
  );
};

export default PlayerRounds;
