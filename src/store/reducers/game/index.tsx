//@ts-nocheck
import { HYDRATE } from 'next-redux-wrapper';
import { DECREMENT_CURRENT_WORD, INCREMENT_CURRENT_WORD, SUBMIT_WORD, UPDATE_GAME_STATUS } from '../../actions';
import { daysWords } from './daysWord';
import { words } from './words';

var now = new Date();
var formatedDate = ((now.getFullYear() )) + '-' + ((now.getMonth() + 1)) + '-' + now.getDate();
var dayWord = JSON.parse(daysWords);
dayWord = dayWord[formatedDate] ? dayWord[formatedDate] : 'letra';

var allWords = JSON.parse(words);

var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);

const initialState = {
  day: day,
  words: allWords,
  dayWord: dayWord,
  currentWord: [],
  currentWordPosition: 0,
  discoveredLetters: {},
  tries: [],
  won: { status: false, try: null },
  finish: false
};

const validateWord = function (word) {
  var result = null;

  for (let singleWord of allWords) {
    var cWord = singleWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (cWord == word) {
      result = singleWord;
    } 
  }

  return result;  
};

const reducer = (state = initialState, action) => {
  if (state.finish) {
    return state;
  }

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.word };
    case UPDATE_GAME_STATUS:
      var newState = { ...state, ...action.payload };

      var storage = JSON.parse(localStorage.getItem('lettrex'));

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

      return newState;
    case SUBMIT_WORD:
      if (state.currentWord.length < 5) {
        return state;
      }

      var newState = {};
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

      if (state.dayWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '') == currentWord){
        tries.push(dayWordArr);
        newState = { ...newState, ...{ tries: tries, won: { status: true, try: state.currentWordPosition }, finish: true, currentWordPosition: state.currentWordPosition + 1, currentWord: [] } };
      } else if (validWord = validateWord(currentWord)) {
        // existencia da palavrax

        // adicionar palavra tentada
        var tryWordLetters = [];
        var discoveredLetters = { ...state.discoveredLetters };
        var savedLetter = [];

        var index = 0;
        for (let letter of Array.from(validWord)) {
          var cLetter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          var statusLetter = null;

          if (dayWordArr[index].letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '') == cLetter) {
            statusLetter = 'right';
          } else if (state.dayWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(cLetter) && !savedLetter.includes(cLetter)) {
            statusLetter = 'displaced';
          } else {
            statusLetter = 'wrong';
          }

          savedLetter.push(cLetter);
        
          // atualizar letras descobertas                
          if (discoveredLetters[cLetter]) {

            if (discoveredLetters[cLetter] == 'displaced' && statusLetter == 'right') {
              discoveredLetters[cLetter] = statusLetter;
            }

          } else {
            discoveredLetters[cLetter] = statusLetter;
          }
          
          tryWordLetters.push({ letter: letter, status: statusLetter });
          index++;

          newState = { ...newState, ...{ discoveredLetters: discoveredLetters } };
        }

        var tryWord = [];
        for (let letter of tryWordLetters) {
          if (discoveredLetters[letter.letter] && letter.status != 'right') {
            var countLettersCurrentWord = currentWord.split(letter.letter).length - 1;
            var countLettersDayWord =  state.dayWord.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(letter.letter).length - 1;
            
            if (countLettersCurrentWord > countLettersDayWord) {
              tryWord.push({ letter: letter.letter, status: 'wrong' });
              continue;
            }
          }
          
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
            newState = { ...newState, ...{ finish: true } };
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

      var storage = {
        day: newState.day,
        currentWordPosition: newState.currentWordPosition,
        discoveredLetters: newState.discoveredLetters,
        finish: newState.finish,
        tries: newState.tries,
        won: newState.won
      };

      localStorage.setItem('lettrex', JSON.stringify(storage));

      return newState;
    case INCREMENT_CURRENT_WORD:
      var newWordCurrentWord = [ ...state.currentWord ];
      if ((newWordCurrentWord.length + 1) <= 5) {
        newWordCurrentWord.push({ letter: action.payload, status: null });
      }
      var newState = { ...state, ...{ currentWord: newWordCurrentWord } };
      return newState;
    case DECREMENT_CURRENT_WORD:
      var currentWord = [ ...state.currentWord ];
      currentWord.pop();

      var newCurrentWord = [];
      currentWord.forEach(letter => {
        newCurrentWord.push({ letter: letter.letter, status: null });
      });
      var newState = { ...state, ...{ currentWord: newCurrentWord } };
      return newState;
    default:
      return state;
  }
};

export default reducer;