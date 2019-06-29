import { useReducer } from 'react';
import * as gameStateSelectors from '../state/selectors';
import * as gameActions from '../state/actions';
import { reducer, initialState } from '../state/reducer';

const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectors = {
    getMode: gameStateSelectors.getMode(state),
    getPlayers: gameStateSelectors.getPlayers(state),
    getPlayer: gameStateSelectors.getPlayer(state),
    getPlayerCount: gameStateSelectors.getPlayerCount(state),
    getCurrentTurn: gameStateSelectors.getCurrentTurn(state),
    getCurrentPlayer: gameStateSelectors.getCurrentPlayer(state),
  };

  const actions = {
    addPlayer: gameActions.addPlayer(dispatch),
    playGame: gameActions.playGame(dispatch),
    recordNextRound: gameActions.recordNextRound(dispatch),
  };

  return {
    state,
    selectors,
    actions,
  };
};

export default useGameState;
