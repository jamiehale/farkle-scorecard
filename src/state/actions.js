import * as actionTypes from './action-types';

export const addPlayer = dispatch => name => { dispatch({ type: actionTypes.ADD_PLAYER, name }); };

export const playGame = dispatch => () => { dispatch({ type: actionTypes.PLAY_GAME }); };

export const currentPlayerOpen = dispatch => (round) => { dispatch({ type: actionTypes.CURRENT_PLAYER_OPENED, round }); };

export const recordNextRound = dispatch => (round) => { dispatch({ type: actionTypes.RECORD_NEXT_ROUND, round }); };
