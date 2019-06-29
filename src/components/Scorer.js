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

const isFarkle = score => score.match(/^[Ff][1-6]$/);

const isValid = score => (score.match(/^-?[1-9][0-9]*0$/) && (parseInt(score, 10) % 50 === 0));

const calculateFarklePenalty = (playerScore, penalties) => penalties.reduce((score, penalty) => score || (playerScore >= penalty.atOrAbove ? penalty.score : undefined), undefined) || 0;

const Scorer = () => {
  const { gameStateSelectors, gameActions } = useContext(GameContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [score, setScore] = useState('');
  const { ref, refocus } = useAutofocus();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.rolls.length > 0 && score === '') {
      gameActions.recordNextRound({
        score: state.rolls.reduce((a, b) => a + b, 0),
        rolls: state.rolls,
      });
      dispatch({ type: 'reset' });
    } else if (isFarkle(score)) {
      gameActions.recordNextRound({
        score: calculateFarklePenalty(gameStateSelectors.getCurrentPlayer().score, gameStateSelectors.getRules().penalties),
        rolls: [
          ...state.rolls,
          score.toUpperCase(),
        ],
      });
    } else if (isValid(score)) {
      dispatch({ type: 'recordRoll', roll: parseInt(score, 10) });
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
