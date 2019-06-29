import React, { useContext } from 'react';
import styled from 'styled-components';
import Title from './Title';
import Setup from './Setup';
import ScoreCard from './ScoreCard';
import Scorer from './Scorer';
import { GameContext } from '../GameContext';

const Playing = () => (
  <>
    <ScoreCard />
    <Scorer />
  </>
);

const gameModes = {
  setup: Setup,
  playing: Playing,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Game = () => {
  const { gameStateSelectors } = useContext(GameContext);

  const GameModeComponent = gameModes[gameStateSelectors.getMode()] || Setup;

  return (
    <Container>
      <Title>Farkle Scorecard</Title>
      <GameModeComponent />
    </Container>
  );
};

export default Game;
