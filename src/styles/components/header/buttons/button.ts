import styled from 'styled-components';

export const StyledButton = styled.div`
  width: 25px;
  height: 25px;
  margin: 0px 5px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    text-decoration: none;
  }
  
  svg {
    width: 100%;
    height: 100%;
    padding: 10%;
    
    border: 1.5px solid ${props => props.theme.colors.primary};
    border-radius: 6px;
    
    fill: ${props => props.theme.colors.primary};
  }
`;