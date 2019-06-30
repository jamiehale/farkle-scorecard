import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GameContext } from '../GameContext';
import useAutofocus from '../hooks/autofocus';
import ModeTitle from './ModeTitle';
import SectionTitle from './SectionTitle';
import List from './List';
import Form from './Form';
import FieldSet from './FieldSet';
import Label from './Label';
import ListItem from './ListItem';
import TextInput from './TextInput';
import Button from './Button';
import SubmitButton from './SubmitButton';

const PlayerName = styled.span``;

const Container = styled.div`
  border: 1px solid #ada;
  padding: 24px;
`;

const SetupMode = () => {
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
    <ListItem key={i}>
      <PlayerName>{player.name}</PlayerName>
    </ListItem>
  ));

  return (
    <Container>
      <ModeTitle>Game Setup</ModeTitle>
      <SectionTitle>Players</SectionTitle>
      <List>
        {playerItems}
      </List>
      <Form onSubmit={handleSubmit}>
        <FieldSet>
          <Label htmlFor="name">Name</Label>
          <TextInput ref={ref} value={name} onChange={handleChange} />
          <SubmitButton>Add</SubmitButton>
        </FieldSet>
      </Form>
      <Button onClick={handleClickPlay}>Play</Button>
    </Container>
  );
};

export default SetupMode;
