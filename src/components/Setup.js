import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GameContext } from '../GameContext';
import useAutofocus from '../hooks/autofocus';

const Container = styled.div`
  border: 1px solid #ada;
  padding: 24px;
`;

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
    <Container>
      <h2>Game Setup</h2>
      <h3>Players</h3>
      <ul>
        {playerItems}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input ref={ref} type="text" value={name} onChange={handleChange} />
      </form>
      <button type="button" onClick={handleClickPlay}>Play</button>
    </Container>
  );
};

export default Setup;
