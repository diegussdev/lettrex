import styled from 'styled-components';

export const StyledLetter = styled.div`
  width: 15%;
  aspect-ratio: 1 / 1;
  padding: 5px;
  margin: 3px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.colors.neutralBackground};
  border: 2px solid ${props => props.theme.colors.neutralBackground};
  border-radius: 6px;

  font-size: 36px;
  text-transform: uppercase;
  font-weight: bold;
`;