import styled from 'styled-components';

export const StyledHeader = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  height: ${props => props.theme.sizes.header};
  padding: 5px 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  h1 {
    font: 400 30px Paytone One, sans-serif;
    letter-spacing: 2.5px;
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
  }
`;