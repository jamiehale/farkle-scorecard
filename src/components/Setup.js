import React, { useContext, useState } from 'react';
import { GameContext } from '../GameContext';
import useAutofocus from '../hooks/autofocus';

const Setup = () => {
  const {
    selectors: {
      getPlayers,
      getPlayerCount,
    },
    actions: {
      addPlayer,
      playGame,
    },
  } = useContext(GameContext);

  const [name, setName] = useState('');

  const { ref, refocus } = useAutofocus();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== '') {
      addPlayer(name);
      setName('');
      refocus();
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClickPlay = (e) => {
    if (getPlayerCount() > 0) {
      playGame();
    }
  }

  const playerItems = getPlayers().map((player, i) => (
    <li key={i}>{player.name}</li>
  ));

  return (
    <>
      <h1>yo</h1>
      <ul>
        {playerItems}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input ref={ref} type="text" value={name} onChange={handleChange} />
      </form>
      <button type="button" onClick={handleClickPlay}>Play</button>
    </>
  );
};

export default Setup;
