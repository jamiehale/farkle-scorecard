import * as R from 'ramda';

const addSubtotals = ({ rounds, subTotal }, round) => ({
  rounds: [
    ...rounds,
    {
      ...round,
      subTotal: subTotal + round.score,
    },
  ],
  subTotal: subTotal + round.score,
});

const playerWithSubtotals = player => ({
  ...player,
  rounds: player.rounds.reduce(addSubtotals, { rounds: [], subTotal: 0 }).rounds,
});

const playerWithTotalScore = player => ({
  ...player,
  score: player.rounds.reduce((total, { score }) => total + score, 0),
});

const playerWithScores = R.compose(playerWithTotalScore, playerWithSubtotals);

export const getMode = state => () => state.mode;
export const getPlayers = state => () => state.players.map((player, id) => ({ id, ...playerWithScores(player) }));
export const getPlayer = state => id => ({ id, ...playerWithScores(state.players[id]) });
export const getPlayerCount = state => () => state.players.length;
export const getCurrentTurn = state => () => state.currentTurn;
export const getCurrentPlayer = state => () => getPlayer(state)(getCurrentTurn(state)().playerId);

export const getRules = state => () => state.rules;
