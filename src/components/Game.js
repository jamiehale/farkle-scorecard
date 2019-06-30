import React, { useContext } from 'react';
import styled from 'styled-components';
import Title from './Title';
import SetupMode from './SetupMode';
import PlayingMode from './PlayingMode';
import { GameContext } from '../GameContext';

const gameModes = {
  setup: SetupMode,
  playing: PlayingMode,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Game = () => {
  const { gameStateSelectors } = useContext(GameContext);

  const GameModeComponent = gameModes[gameStateSelectors.getMode()] || SetupMode;

  return (
    <Container>
      <Title>Farkle Scorecard</Title>
      <GameModeComponent />
    </Container>
  );
};

export default Game;
