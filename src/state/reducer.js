import * as R from 'ramda';
import * as actionTypes from './action-types';

const initialTurn = {
  playerId: 0,
  total: 0,
};

const newPlayer = name => ({
  name,
  isOpen: false,
  rounds: [],
});

export const initialState = {
  mode: 'setup',
  rules: {
    minimumPlayerCount: 2,
    triggerScore: 10000,
    pointsToOpen: 350,
    openingRolls: 3,
    penalties: [
      {
        atOrAbove: 5000,
        score: -1000,
      },
      {
        atOrAbove: 1000,
        score: -500,
      },
    ],
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

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER: {
      return R.evolve({
        players: R.append(newPlayer(R.prop('name', action))),
      }, state);
    }
    case actionTypes.PLAY_GAME: {
      return R.evolve({
        mode: R.always('playing'),
      }, state);
    }
    case actionTypes.CURRENT_PLAYER_OPENED: {
      return R.evolve({
        players: R.over(
          R.lensIndex(state.currentTurn.playerId),
          R.evolve({
            rounds: R.append(R.prop('round', action)),
            isOpen: R.always(true),
          }),
        ),
        currentTurn: R.always({
          playerId: (state.currentTurn.playerId + 1) % state.players.length,
          score: 0,
        }),
      }, state);
    }
    case actionTypes.RECORD_NEXT_ROUND: {
      return R.evolve({
        players: R.over(
          R.lensIndex(state.currentTurn.playerId),
          R.evolve({
            rounds: R.append(R.prop('round', action)),
          })
        ),
        currentTurn: R.always({
          playerId: (state.currentTurn.playerId + 1) % state.players.length,
          score: 0,
        }),
      }, state);
    }
    default:
      return state;
  }
};
