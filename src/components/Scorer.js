import React, { useContext, useState } from 'react';
import { GameContext } from '../GameContext';
import useAutofocus from '../hooks/autofocus';

const Scorer = () => {
  const {
    selectors: {
      getCurrentPlayer,
    },
    actions: {
      recordScore,
    },
  } = useContext(GameContext);
  const [score, setScore] = useState('0');
  const { ref, refocus } = useAutofocus();

  const handleSubmit = (e) => {
    e.preventDefault();
    recordScore(getCurrentPlayer().id, parseInt(score, 10));
    setScore('0');
    refocus();
  };

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  return (
    <>
      <h3>{getCurrentPlayer().name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="score">Score</label>
        <input ref={ref} id="score" type="text" value={score} onChange={handleChange} />
      </form>
    </>
  );
};

export default Scorer;
