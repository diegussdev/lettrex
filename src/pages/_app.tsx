import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { storeWrapper } from '../store';

// Styles
import GlobalStyles from '../styles/globals';
import theme from '../styles/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles />
    </ ThemeProvider>
);

export default storeWrapper.withRedux(MyApp);