import styled from 'styled-components';

export const StyledHeader = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  height: ${props => props.theme.sizes.header};
  padding: 5px 25px;
  /* margin: auto; */

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  h1 {
    font-size: 28px;
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
  }
`;