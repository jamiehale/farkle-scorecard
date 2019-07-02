import React, { useContext } from 'react';
import styled from 'styled-components';
import { GameContext } from '../GameContext';
import PlayerRounds from './PlayerRounds';
import PlayerName from './PlayerName';
import PlayerTotal from './PlayerTotal';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  min-width: 140px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  background: ${props => (props.highlight ? '#bbd' : 'none')};
`;

const PlayerGame = ({
  player,
}) => {
  const { gameStateSelectors } = useContext(GameContext);

  return (
    <Container highlight={player.id === gameStateSelectors.getCurrentPlayer().id}>
      <Header>
        <PlayerName>
          {player.name}
          {!player.isOpen && '(Not Open)'}
        </PlayerName>
      </Header>
      <PlayerRounds rounds={player.rounds} />
      <PlayerTotal score={player.score} />
    </Container>
  );
};

export default PlayerGame;
