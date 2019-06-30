import React, { useContext } from 'react';
import styled from 'styled-components';
import Round from './Round';
import PlayerName from './PlayerName';
import { GameContext } from '../GameContext';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TotalLabel = styled.div`
  width: 50%;
  text-align: right;
`;

const PlayerTotalContainer = styled.div`
  border-top: 2px solid black;
  flex-grow: 1;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 4px;
`;

const PlayerTotal = ({
  score,
}) => (
  <PlayerTotalContainer>
    <TotalLabel>Total:</TotalLabel>
    <TotalLabel>{score}</TotalLabel>
  </PlayerTotalContainer>
)

const Container = styled.div`
  min-width: 140px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  background: ${props => (props.highlight ? '#bbd' : 'none')};
`;

const addSubtotals = ({ rounds, subTotal }, round) => ({
  rounds: [
    ...rounds,
    {
      ...round,
      totalScore: subTotal + round.score,
    },
  ],
  subTotal: subTotal + round.score,
});

const PlayerGame = ({
  player,
}) => {
  const { gameStateSelectors } = useContext(GameContext);

  const rounds = player.rounds.reduce(addSubtotals, { rounds: [], subTotal: 0 })
  .rounds
  .map((round, i) => (
    <Round key={i} round={round} />
  ));

  return (
    <Container highlight={player.id === gameStateSelectors.getCurrentPlayer().id}>
      <Header>
        <PlayerName>{player.name}</PlayerName>
      </Header>
      {rounds}
      <PlayerTotal score={player.score} />
    </Container>
  );
};

export default PlayerGame;
