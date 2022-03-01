import styled from 'styled-components';

export const StyledKey = styled.div`
  width: 9.5%;
  height: 45px;
  margin: 0px 2px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1.5px solid ${props => props.theme.colors.text};
  border-radius: 5px;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 20px;

  :hover {
    cursor: pointer;
  }

  :hover {
    /* background-color: ${props => props.theme.colors.successBackground};
    border: 2px solid ${props => props.theme.colors.successBackground};
    color: ${props => props.theme.colors.successText}; */
  }
`;