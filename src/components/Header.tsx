import styled from 'styled-components';
import theme from '../styles/theme';

const Header = styled.header`
  background-color: #404652;
  height: 60px;
  display: flex;
  align-items: center;
  color: ${theme.white};
  padding: 0.25rem;
  text-align: center;
  justify-content: center;
`

export default Header;