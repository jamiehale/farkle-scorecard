import React from 'react';

const Round = ({
  round,
}) => {
  const rolls = round.rolls.map((roll, i) => (
    <li key={i}>{roll}</li>
  ));

  return (
    <>
      <p>{round.score} | {round.subTotal}</p>
      <ul>
        {rolls}
      </ul>
    </>
  );
};

export default Round;
