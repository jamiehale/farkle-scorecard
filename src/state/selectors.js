export const getMode = state => () => state.mode;
export const getPlayers = state => () => state.players.map((player, id) => ({ id, ...player }));
export const getPlayer = state => id => ({ id, ...state.players[id] });
export const getPlayerCount = state => () => state.players.length;
export const getCurrentTurn = state => () => state.currentTurn;
export const getCurrentPlayer = state => () => getPlayer(state)(getCurrentTurn(state)().playerId);

export const getRules = state => () => state.rules;
