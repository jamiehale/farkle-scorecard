import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GameContextProvider } from './GameContext';
import Game from './components/Game';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100vh;
    font-size: 100%;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

const App = () => (
  <GameContextProvider>
    <GlobalStyle />
    <Game />
  </GameContextProvider>
);

export default App;
