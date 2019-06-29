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
  const [scores, setScores] = useState([]);
  const [score, setScore] = useState('');
  const { ref, refocus } = useAutofocus();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score.length === 0) {
      recordScore(getCurrentPlayer().id, scores.reduce((a, b) => a + b, 0));
      setScores([]);
    } else {
      setScores([
        ...scores,
        parseInt(score, 10),
      ]);
    }
    setScore('');
    refocus();
};

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  const scoreItems = scores.map((score, i) => (
    <li key={i}>{score}</li>
  ));

  return (
    <>
      <h3>{getCurrentPlayer().name}</h3>
      <ul>
        {scoreItems}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="score">Score</label>
        <input ref={ref} id="score" type="text" value={score} onChange={handleChange} />
      </form>
    </>
  );
};

export default Scorer;
