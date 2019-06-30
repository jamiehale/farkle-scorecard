import React from 'react';
import styled from 'styled-components';
import ScoreCard from './ScoreCard';
import Scorer from './Scorer';

const Container = styled.div`
  display: flex;
  justify-contents: space-between;
`;

const PlayingMode = () => (
  <Container>
    <ScoreCard />
    <Scorer />
  </Container>
);

export default PlayingMode;
