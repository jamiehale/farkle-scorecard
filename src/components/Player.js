import React from 'react';

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

const Round = ({
  round,
}) => {
  const rolls = round.rolls.map((roll, i) => (
    <li key={i}>{roll}</li>
  ));

  return (
    <>
      <p>{round.score} | {round.totalScore}</p>
      <ul>
        {rolls}
      </ul>
    </>
  );
};

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
    </>
  );
};

export default Player;
