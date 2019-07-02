import React, { useContext, useReducer, useState } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { GameContext } from '../GameContext';
import useAutofocus from '../hooks/autofocus';
import PlayerName from './PlayerName';
import Form from './Form';
import Label from './Label';
import TextInput from './TextInput';
import TurnSummary from './TurnSummary';

const Container = styled.div`
  margin-left: 8px;
  padding: 16px;
  border: 1px solid black;
  border-radius: 4px;
  align-self: flex-end;
`;

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
        total: state.total + roll,
      };
    }
    default:
      return state;
  }
};

const isFarkle = score => score.match(/^[Ff][1-6]$/);

const isPoints = score => (score.match(/^-?[1-9][0-9]*0$/) && (parseInt(score, 10) % 50 === 0));

const calculateFarklePenalty = (playerScore, penalties) => penalties.reduce((score, penalty) => score || (playerScore >= penalty.atOrAbove ? penalty.score : undefined), undefined) || 0;

const total = rolls => rolls.reduce((total, roll) => total + roll, 0);

const hasAccumulatedPoints = rolls => total(rolls) > 0;

/*
not open:
points - accumulate
blank - ends, only scores if >= 350

open:
points - accumulate
farkle - ends
blank - ends

*/

const Scorer = () => {
  const { gameStateSelectors, gameActions } = useContext(GameContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [score, setScore] = useState('');
  const { ref, refocus } = useAutofocus();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (R.isEmpty(score)) {
      if (gameStateSelectors.getCurrentPlayer().isOpen) {
        gameActions.recordNextRound({
          score: total(state.rolls),
          rolls: state.rolls,
        });
      } else {
        if (total(state.rolls) >= gameStateSelectors.getRules().pointsToOpen) {
          gameActions.currentPlayerOpen({
            score: total(state.rolls),
            rolls: state.rolls,
          });
        } else {
          gameActions.recordNextRound({
            score: 0,
            rolls: state.rolls,
          });
        }
      }
      dispatch({ type: 'reset' });
    } else if (score === '0') {
      if (!gameStateSelectors.getCurrentPlayer().isOpen) {
        dispatch({ type: 'recordRoll', roll: 0 });
      }
      setScore('');
      refocus();
    } else if (isPoints(score)) {
      dispatch({ type: 'recordRoll', roll: parseInt(score, 10) });
      setScore('');
      refocus();
    } else if (isFarkle(score)) {
      gameActions.recordNextRound({
        score: calculateFarklePenalty(gameStateSelectors.getCurrentPlayer().score, gameStateSelectors.getRules().penalties),
        rolls: [
          ...state.rolls,
          score.toUpperCase(),
        ],
      });
      dispatch({ type: 'reset' });
    } else {
      //setScore('');
      refocus()
    }
  };

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  return (
    <Container>
      <PlayerName>{gameStateSelectors.getCurrentPlayer().name}</PlayerName>
      <TurnSummary rolls={state.rolls} />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="score">Score</Label>
        <TextInput ref={ref} id="score" value={score} onChange={handleChange} />
      </Form>
    </Container>
  );
};

export default Scorer;
