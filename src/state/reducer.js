import * as R from 'ramda';
import * as actionTypes from './action-types';

const initialTurn = {
  playerId: 0,
  total: 0,
};

export const initialState = {
  mode: 'setup',
  rules: {
    triggerScore: 10000,
  },
  players: [
    /*
    {
      name: 'Joe',
      rounds: [
        {
          score: 350,
          rolls: [350],
        },
        {
          score: 500,
          rolls: [500],
        },
        {
          score: 400,
          rolls: [50, 350],
        },
      ],
    },
    {
      name: 'Suzie',
      rounds: [
        {
          score: 0,
          rolls: [],
        },
        {
          score: 400,
          rolls: [],
        },
        {
          score: 1100,
          rolls: [],
        },
      ],
    },
    {
      name: 'Gooberface',
      rounds: [
        {
          score: 500,
          rolls: [],
        },
        {
          score: 90000,
          rolls: [],
        },
      ],
    },
    */
  ],
  currentTurn: initialTurn,
};

const addScoreTo = (playerId, round) => (player, i) => i === playerId ? ({
  ...player,
  rounds: R.append(round, player.rounds),
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
    case actionTypes.RECORD_NEXT_ROUND: {
      const { round } = action;
      return {
        ...state,
        players: state.players.map(addScoreTo(state.currentTurn.playerId, round)),
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
