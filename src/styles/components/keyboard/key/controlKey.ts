import styled from 'styled-components';

export const StyledControlKey = styled.div`
  min-width: 80px;
  width: 25%;
  height: 35px;
  padding: 8px;
  margin: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${props => props.theme.colors.text};
  border-radius: 6px;
  
  svg {
    fill: ${props => props.theme.colors.background};
  }

  :hover {
    cursor: pointer;
  }
`;