import { HYDRATE } from 'next-redux-wrapper';
import { ACCEPT_NEW_TRY, DECREMENT_CURRENT_WORD, INCREMENT_CURRENT_WORD, SUBMIT_WORD, UPDATE_GAME_STATUS } from '../../actions';
import { daysWords } from './daysWord';
import { words } from './words';

var now = new Date();
var formatedDate = ((now.getFullYear() )) + '-' + ((now.getMonth() + 1)) + '-' + now.getDate();
var dayWord = JSON.parse(daysWords);
dayWord = dayWord[formatedDate] ? dayWord[formatedDate] : 'letra';

var allWords = JSON.parse(words);

var start = new Date(now.getFullYear(), 0, 0);
var diff = now.getTime() - start.getTime();
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);

export interface GameLetter {
  letter: string,
  status: string
}

export interface GameWon {
  status: boolean,
  try: number
}

export interface GameState {
  day: number,
  words: Array<string>,
  dayWord: string,
  currentWord: Array<GameLetter>,
  currentWordPosition: number,
  discoveredLetters: object,
  tries: Array<Array<GameLetter>>,
  won: GameWon,
  finish: boolean,
  newTry: boolean,
}

interface GameStorage {
  day: number,
  currentWordPosition: number,
  discoveredLetters: object,
  finish: boolean,
  tries: Array<Array<GameLetter>>,
  won: GameWon
}

const initialState: GameState = {
  day: day,
  words: allWords,
  dayWord: dayWord,
  currentWord: [],
  currentWordPosition: 0,
  discoveredLetters: {},
  tries: [],
  won: { status: false, try: null },
  finish: false,
  newTry: false
};

const normalize = function (string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const validateWord = function (word) {
  var result = null;

  for (let singleWord of allWords) {
    var cWord = normalize(singleWord);
    word = normalize(word);

    if (cWord == word) {
      result = singleWord;
    } 
  }

  return result;  
};

const updateGameStatus = function (state: GameState, newState: GameState) {
  var storage: GameStorage = JSON.parse(localStorage.getItem('lettrex'));

  if (storage && storage.day != day) {
    
    storage = {
      day: day,
      currentWordPosition: 0,
      discoveredLetters: {},
      finish: false,
      tries: [],
      won: { status: false, try: null }
    };
    
    localStorage.setItem('lettrex', JSON.stringify(storage));

    return state;
  }

  return { ...state, ...newState };
};

const incrementCurrentWord = function (state: GameState, letter: string) {
  if (state.finish) {
    return state;
  }

  var newWordCurrentWord = [ ...state.currentWord ];

  if ((newWordCurrentWord.length + 1) <= 5) {
    newWordCurrentWord.push({ letter: letter, status: null });
  }

  return { ...state, ...{ currentWord: newWordCurrentWord } };
};

const decrementCurrentWord = function (state: GameState) {
  if (state.finish) {
    return state;
  }

  var currentWord = [ ...state.currentWord ];
  currentWord.pop();

  var newCurrentWord = [];
  currentWord.forEach(letter => {
    newCurrentWord.push({ letter: letter.letter, status: null });
  });
  
  return { ...state, ...{ currentWord: newCurrentWord } };
};

const submitWord = function (state: GameState) {
  if (state.finish || state.currentWord.length < 5) {
    return state;
  }

  var newState = { ...state };
  var currentWord = '';
  state.currentWord.forEach(letter => {
    currentWord += letter.letter;
  });

  let dayWordArr = [];
  Array.from(state.dayWord).forEach(letter => {
    dayWordArr.push({ letter: letter, status: 'right' });
  });

  var validWord = '';
  var tries = [ ...state.tries ];

  if (normalize(state.dayWord) == currentWord){
    tries.push(dayWordArr);
    newState = { 
      ...newState, 
      ...{
        tries: tries,
        won: { status: true, try: state.currentWordPosition },
        finish: true,
        currentWordPosition: state.currentWordPosition + 1,
        currentWord: [],
        newTry: false
      } 
    };
  } else if (validWord = validateWord(currentWord)) {
    // adicionar tentativa
    var tryWordLetters = [];
    //var discoveredLetters = { ...state.discoveredLetters };
    var discoveredLetters = {};

    var index = 0;
    // valida tentativa
    for (let letter of Array.from(validWord)) {
      var cLetter = normalize(letter);
      var statusLetter = null;

      if (normalize(dayWordArr[index].letter) == cLetter) {
        statusLetter = 'right';
      } else if (normalize(state.dayWord).includes(cLetter)) {
        statusLetter = 'displaced';
      } else {
        statusLetter = 'wrong';
      }
    
      // atualizar letras descobertas                
      if (newState.discoveredLetters[cLetter]) {

        if (newState.discoveredLetters[cLetter] == 'displaced' && statusLetter == 'right') {
          discoveredLetters[cLetter] = statusLetter;
        }

      } else {
        discoveredLetters[cLetter] = statusLetter;
      }
      
      tryWordLetters.push({ letter: letter, status: statusLetter });
      index++;

      newState = { ...newState, ...{ discoveredLetters: { ...state.discoveredLetters, ...discoveredLetters } } };
    }

    var tryWord = [];
    var letters = [];
    for (let letter of tryWordLetters) {
      if (letter.status != 'right') {
        var countLettersCurrentWord = currentWord.split(normalize(letter.letter)).length - 1;
        var countLettersDayWord =  normalize(state.dayWord).split(normalize(letter.letter)).length - 1;

        if (countLettersDayWord >= countLettersCurrentWord) {
          if (letters.includes(normalize(letter.letter))) {
            if (discoveredLetters[normalize(letter.letter)] != 'right') {
              letter = { letter: letter.letter, status: 'wrong' };
            }            
          }
        } else {
          letter = { letter: letter.letter, status: 'wrong' };
        }

      }
      
      letters.push(normalize(letter.letter));
      tryWord.push(letter);
    }
    
    tries.push(tryWord);
    newState = { ...newState, ...{ tries: tries } };
    
    // verificar se venceu (por causa do acento)
    if (validWord == state.dayWord) {
      newState = { ...newState, ...{ tries: tries, won: { status: true, try: state.currentWordPosition }, finish: true } };
    } else {
      // validar se era ultima tentativa (definir finish)
      if (state.currentWordPosition >= 5) {
        var rand = Math.floor(Math.random() * 2);
        var newTry = rand === 1 && !state.newTry;
        newState = { ...newState, ...{ finish: true, newTry: newTry } };
      }
    }
        
    newState = { ...newState, ...{ currentWordPosition: state.currentWordPosition + 1, currentWord: [] } };
  } else {
    var currentWordError = [];
    state.currentWord.forEach(letter => {
      currentWordError.push({ letter: letter.letter, status: 'error' });
    });

    newState = { ...newState, ...{ currentWord: currentWordError } };
  }

  newState = { ...state, ...newState };

  var storage: GameStorage = {
    day: newState.day,
    currentWordPosition: newState.currentWordPosition,
    discoveredLetters: newState.discoveredLetters,
    finish: newState.finish,
    tries: newState.tries,
    won: newState.won
  };

  localStorage.setItem('lettrex', JSON.stringify(storage));

  return newState;
};

const acceptNewTry = function (state: GameState) {
  var tries = state.tries;
  tries.pop();
  var newState = {
    ...state,
    ...{
      currentWordPosition: 5,
      currentWord: [],
      tries: tries,
      finish: false
    }
  };

  var storage: GameStorage = {
    day: newState.day,
    currentWordPosition: newState.currentWordPosition,
    discoveredLetters: newState.discoveredLetters,
    finish: newState.finish,
    tries: newState.tries,
    won: newState.won
  };

  localStorage.setItem('lettrex', JSON.stringify(storage));
  
  return newState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.word };
    case UPDATE_GAME_STATUS:
      return updateGameStatus(state, action.payload);
    case INCREMENT_CURRENT_WORD:
      return incrementCurrentWord(state, action.payload);
    case DECREMENT_CURRENT_WORD:
      return decrementCurrentWord(state);
    case SUBMIT_WORD:
      return submitWord(state);
    case ACCEPT_NEW_TRY:
      return acceptNewTry(state);
    default:
      return state;
  }
};

export default reducer;