import { useReducer } from 'react';
import * as selectors from '../state/selectors';
import * as actions from '../state/actions';
import { reducer, initialState } from '../state/reducer';

const useGameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const gameStateSelectors = {
    getMode: selectors.getMode(state),
    getRules: selectors.getRules(state),
    getPlayers: selectors.getPlayers(state),
    getPlayer: selectors.getPlayer(state),
    getPlayerCount: selectors.getPlayerCount(state),
    getCurrentTurn: selectors.getCurrentTurn(state),
    getCurrentPlayer: selectors.getCurrentPlayer(state),
  };

  const gameActions = {
    addPlayer: actions.addPlayer(dispatch),
    playGame: actions.playGame(dispatch),
    recordNextRound: actions.recordNextRound(dispatch),
  };

  return {
    state,
    gameStateSelectors,
    gameActions,
  };
};

export default useGameState;
