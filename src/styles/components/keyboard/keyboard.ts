import styled from 'styled-components';

export const StyledKeyboard = styled.footer`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  height: ${props => props.theme.sizes.keyboard};
  padding: 5px;

  div {
    margin-bottom: 2px;

    display: flex;
    justify-content: center;
  }
`;