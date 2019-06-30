import React from 'react';
import ListItem from './ListItem';
import List from './List';

const TurnSummary = ({
  rolls,
}) => {
  const scoreItems = rolls.map((score, i) => (
    <ListItem key={i}>{score}</ListItem>
  ));

  return (
    <List>
      {scoreItems}
    </List>
  );
};

export default TurnSummary;
