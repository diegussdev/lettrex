import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font: 400 16px Roboto, sans-serif;
  }

  .current {
    border-color: ${props => props.theme.colors.text} !important;
    color: ${props => props.theme.colors.text};
  }

  .displaced {
    background-color: ${props => props.theme.colors.warningBackground} !important;
    border-color: ${props => props.theme.colors.warningBackground};
    color: ${props => props.theme.colors.background};
  }

  .right {
    background-color: ${props => props.theme.colors.successBackground} !important;
    border-color: ${props => props.theme.colors.successBackground};
    color: ${props => props.theme.colors.background};
  }

  .error {
    border-color: ${props => props.theme.colors.errorBackground} !important;
  }

  .wrong {
    background-color: ${props => props.theme.colors.errorBackground} !important;
    border-color: ${props => props.theme.colors.errorBackground};
    color: ${props => props.theme.colors.background};
  }
`;