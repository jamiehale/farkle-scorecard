import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../GameContext';
import PlayerGame from './PlayerGame';

const Container = styled.div`
  display: flex;
`;

const ScoreCard = () => {
  const { gameStateSelectors } = useContext(GameContext);

  const players = gameStateSelectors.getPlayers().map(player => (
    <PlayerGame key={player.id} player={player} />
  ));

  return (
    <Container>
      {players}
    </Container>
  );
};

export default ScoreCard;
