import React, { useContext, useReducer, useState } from 'react';
import * as R from 'ramda';
import { GameContext } from '../GameContext';
import useAutofocus from '../hooks/autofocus';

const initialState = {
  rolls: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return initialState;
    }
    case 'recordRoll': {
      const { roll } = action;
      return {
        ...state,
        rolls: R.append(roll, state.rolls),
      };
    }
    default:
      return state;
  }
};

const Scorer = () => {
  const { gameStateSelectors, gameActions } = useContext(GameContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [score, setScore] = useState('');
  const { ref, refocus } = useAutofocus();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (score.length === 0) {
      gameActions.recordNextRound({
        score: state.rolls.reduce((a, b) => a + b, 0),
        rolls: state.rolls,
      });
      dispatch({ type: 'reset' });
    } else {
      if (score.match(/^[Ff][1-6]$/)) {
        gameActions.recordNextRound({
          score: -500,
          rolls: [
            ...state.rolls,
            score.toUpperCase(),
          ],
        });
      } else {
        dispatch({ type: 'recordRoll', roll: parseInt(score, 10) });
      }
    }
    setScore('');
    refocus();
};

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  const scoreItems = state.rolls.map((score, i) => (
    <li key={i}>{score}</li>
  ));

  return (
    <>
      <h3>{gameStateSelectors.getCurrentPlayer().name}</h3>
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
