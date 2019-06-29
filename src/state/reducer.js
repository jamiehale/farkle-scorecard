import * as R from 'ramda';
import * as actionTypes from './action-types';

const initialTurn = {
  playerId: 0,
  total: 0,
};

export const initialState = {
  mode: 'setup',
  players: [
    {
      name: 'Joe',
      rounds: [
        {
          score: 350,
        },
        {
          score: 500,
        },
        {
          score: 400,
        },
      ],
    },
    {
      name: 'Suzie',
      rounds: [
        {
          score: 0,
        },
        {
          score: 400,
        },
        {
          score: 1100,
        },
      ],
    },
    {
      name: 'Gooberface',
      rounds: [
        {
          score: 500,
        },
        {
          score: 90000,
        },
      ],
    },
  ],
  currentTurn: initialTurn,
};

const addScoreTo = (playerId, points) => (player, i) => i === playerId ? ({
  ...player,
  rounds: R.append({ score: points }, player.rounds),
}) : player;

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER: {
      const { name } = action;
      return {
        ...state,
        players: [
          ...state.players,
          {
            name,
            rounds: [],
          },
        ],
      };
    }
    case actionTypes.PLAY_GAME: {
      return {
        ...state,
        mode: 'playing',
      };
    }
    case actionTypes.RECORD_SCORE: {
      const { playerId, score } = action;
      return {
        ...state,
        players: state.players.map(addScoreTo(playerId, score)),
        currentTurn: {
          playerId: (state.currentTurn.playerId + 1) % state.players.length,
          score: 0,
        },
      };
    }
    default:
      return state;
  }
};
