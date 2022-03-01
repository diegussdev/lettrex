import styled from 'styled-components';

export const StyledGame = styled.main`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  padding: 10px;
  max-height: calc(100vh - ${props => props.theme.sizes.header} - ${props => props.theme.sizes.keyboard} - ${props => props.theme.sizes.ads});
  aspect-ratio: 1 / 1;

  display: flex;
  flex-direction: column;
`;