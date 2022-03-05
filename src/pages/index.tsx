import React, { useEffect } from 'react';
import Head from 'next/head';

import Header from '../components/header';
import Keyboard from '../components/keyboard';
import Game from '../components/game';
import { useDispatch, useSelector } from 'react-redux';
import { updateGameStatus } from '../store/actions/game';
import Finish from '../components/finish';
import { GameReducer } from '../store/reducers';

export default function Home() {
  const dispatch = useDispatch();

  const { finish } = useSelector((state: GameReducer) => state.game);

  useEffect(() => {  
    var lettrex = localStorage.getItem('lettrex');
    lettrex = lettrex ? JSON.parse(lettrex) : {};
    
    dispatch(updateGameStatus(lettrex));
  }, []);

  return (
    <>
      <Head>
        <title>Lettrex</title>
        <meta name="description" content="Acerte a palavra! Ser for capaz..." />

        <meta property="og:title" content="Lettrex"/>
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/favicon.png"/>
        <meta property="og:url" content="/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content="Acerte a palavra! Ser for capaz..." />
        <meta property="og:site_name" content="Lettrex" />
        <meta name="twitter:image:alt" content="Lettrex" />

        <link rel="icon" href="/favicon.png" />
      </Head>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header />
        <Game />
        { !finish ? <Keyboard /> : <Finish /> }       
      </div>
    </>
  );
}

