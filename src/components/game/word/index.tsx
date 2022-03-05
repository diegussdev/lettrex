import React from 'react';
import { useSelector } from 'react-redux';
import { GameReducer } from '../../../store/reducers';
import { GameLetter } from '../../../store/reducers/game';
import { StyledWord } from '../../../styles/components/game/word';
import Letter from './letter';

interface WordTry {
  word: Array<GameLetter>;
  position: number;
}

export default function Word({ word, position }: WordTry) {
  var { currentWord, currentWordPosition, finish } = useSelector((state: GameReducer) => state.game);

  var isCurrentWordPosition = (currentWordPosition === position) && !finish;

  if (isCurrentWordPosition) {
    word = currentWord;
  }

  const getLetterByPosition = function (letterPosition: number): GameLetter {
    var wordLetter =  word[letterPosition];

    if (!wordLetter) {
      wordLetter = {
        letter: '',
        status: ''
      };
    }

    return wordLetter;
  };

  return (
    <StyledWord>
      <Letter letter={getLetterByPosition(0)} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={getLetterByPosition(1)} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={getLetterByPosition(2)} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={getLetterByPosition(3)} isCurrentWordPosition={isCurrentWordPosition} />
      <Letter letter={getLetterByPosition(4)} isCurrentWordPosition={isCurrentWordPosition} />
    </StyledWord>
  );
}