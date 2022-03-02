import styled from 'styled-components';

export const StyledFinish = styled.div`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  height: ${props => props.theme.sizes.finish};
  padding: 5px 25px;

  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  h1 {
    font: 400 28px Paytone One, sans-serif;
    letter-spacing: 2.5px;
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    line-height: 28px;
    margin-bottom: 10px;
  }

  h1.lose {
    color: ${props => props.theme.colors.errorBackground};
  }

  h1.won {
    color: ${props => props.theme.colors.successBackground};
  }
  
  p {
    font: 400 18px Paytone One, sans-serif;
    line-height: 18px;
  }
`;