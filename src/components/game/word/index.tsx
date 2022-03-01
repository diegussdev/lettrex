//@ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { StyledWord } from '../../../styles/components/game/word';
import Letter from './letter';

interface WordTry {
  word: Array<object>;
  position: number;
}

export default function Word({ word, position }: WordTry) {
  var { currentWord, currentWordPosition, finish } = useSelector((state) => state.game);

  var isCurrentWordPosition = (currentWordPosition === position) && !finish;

  if (isCurrentWordPosition) {
    var letters = currentWord;

    word = [];
    letters.forEach(letter => {
      word.push({ letter: letter.letter, status: letter.status });
    });
  }

  return (
    <StyledWord>
      <Letter letter={word[0] ? word[0] : {}} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={word[1] ? word[1] : {}} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={word[2] ? word[2] : {}} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={word[3] ? word[3] : {}} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={word[4] ? word[4] : {}} isCurrentWordPosition={isCurrentWordPosition} />
    </StyledWord>
  );
}