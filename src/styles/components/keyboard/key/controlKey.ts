import styled from 'styled-components';

export const StyledControlKey = styled.div`
  min-width: 80px;
  width: 25%;
  height: 30px;
  padding: 8px;
  margin: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1.5px solid ${props => props.theme.colors.text};
  border-radius: 5px;
  
  svg {
    fill: ${props => props.theme.colors.text};
  }

  :hover {
    cursor: pointer;
  }
`;