import React, { useContext, useState } from 'react';
import { GameContext } from '../GameContext';
import useAutofocus from '../hooks/autofocus';

const Setup = () => {
  const { gameStateSelectors, gameActions } = useContext(GameContext);
  const [name, setName] = useState('');
  const { ref, refocus } = useAutofocus();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameStateSelectors.getPlayerCount() >= gameStateSelectors.getRules().minimumPlayerCount && name === '') {
      gameActions.playGame();
    } else if (name !== '') {
      gameActions.addPlayer(name);
      setName('');
      refocus();
    }
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClickPlay = (e) => {
    if (gameStateSelectors.getPlayerCount() > 0) {
      gameActions.playGame();
    }
  }

  const playerItems = gameStateSelectors.getPlayers().map((player, i) => (
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
