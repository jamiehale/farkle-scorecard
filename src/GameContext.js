import React, { useReducer } from 'react';
import * as R from 'ramda';

const initialTurn = {
  playerId: 0,
  total: 0,
};

const initialState = {
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

const reducer = (state, action) => {
  switch (action.type) {
    case 'recordScore': {
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

const getPlayers = state => () => state.players.map((player, id) => ({ id, ...player }));
const getPlayer = state => id => ({ id, ...state.players[id] });
const getPlayerCount = state => () => state.players.length;
const getCurrentTurn = state => () => state.currentTurn;
const getCurrentPlayer = state => () => getPlayer(state)(getCurrentTurn(state)().playerId);

export const GameContext = React.createContext();

export const GameContextProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectors = {
    getPlayers: getPlayers(state),
    getPlayer: getPlayer(state),
    getPlayerCount: getPlayerCount(state),
    getCurrentTurn: getCurrentTurn(state),
    getCurrentPlayer: getCurrentPlayer(state),
  };

  const actions = {
    recordScore: (playerId, score) => { dispatch({ type: 'recordScore', playerId, score }); },
  };

  return (
    <GameContext.Provider value={{ selectors, actions }}>
      {children}
    </GameContext.Provider>
  );
};
