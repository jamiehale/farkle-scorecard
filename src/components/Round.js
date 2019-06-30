import React, { useState } from 'react';
import styled from 'styled-components';
import List from './List';
import ListItem from './ListItem';

const RoundScore = styled.div`
  width: 50%;
  text-align: right;
`;

const SubTotal = styled.div`
  width: 50%;
  text-align: right;
`;

const PopupContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0px;
  z-index: 50;
  width: 100px;
  margin: 0px;
  padding: 8px;
  border: 2px solid black;
  background: white;
  box-shadow: 2px 2px 2px grey;
`;

const RollsPopup = ({
  rolls,
}) => {
  const rollItems = rolls.map((roll, i) => (
    <ListItem key={i}>{roll}</ListItem>
  ));

  return (
    <PopupContainer>
      <List>
        {rollItems}
      </List>
    </PopupContainer>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0px;
  padding: 4px;
  border-top: 1px solid black;
`;

const Round = ({
  round,
}) => {
  const [showRolls, setShowRolls] = useState(false);

  return (
    <Container
      onMouseEnter={() => setShowRolls(true)}
      onMouseLeave={() => setShowRolls(false)}
    >
      <RoundScore>{round.score}</RoundScore>
      <SubTotal>{round.subTotal}</SubTotal>
      {showRolls && (
        <RollsPopup rolls={round.rolls} />
      )}
    </Container>
  );
};

export default Round;
