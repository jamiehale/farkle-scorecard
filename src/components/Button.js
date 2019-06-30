import styled from 'styled-components';

const Button = styled.button.attrs({
  type: 'button',
})`
  margin: 0px;
  padding: 4px 16px;
  border: 1px solid black;
  border-radius: 4px;
  background: #ddd;
  font-size: 1em;
`;

export default Button;
