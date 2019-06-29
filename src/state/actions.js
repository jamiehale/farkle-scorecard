import * as actionTypes from './action-types';

export const addPlayer = dispatch => name => { dispatch({ type: actionTypes.ADD_PLAYER, name }); };

export const playGame = dispatch => () => { dispatch({ type: actionTypes.PLAY_GAME }); };

export const recordScore = dispatch => (playerId, score) => { dispatch({ type: actionTypes.RECORD_SCORE, playerId, score }); };

