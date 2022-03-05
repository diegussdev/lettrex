import styled from 'styled-components';

export const StyledKey = styled.div`
  width: 9.5%;
  height: 50px;
  margin: 0px 2px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.neutralBackground};
  border-radius: 6px;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;

  :hover {
    cursor: pointer;
  }
`;