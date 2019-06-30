import React from 'react';
import styled from 'styled-components';

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

export default PlayerTotal;
