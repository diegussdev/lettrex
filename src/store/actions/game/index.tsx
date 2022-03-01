import { DECREMENT_CURRENT_WORD, INCREMENT_CURRENT_WORD, SUBMIT_WORD, UPDATE_GAME_STATUS } from '..';

export const updateGameStatus = (status) => ({
  type: UPDATE_GAME_STATUS,
  payload: status
});

export const submitWord = () => ({
  type: SUBMIT_WORD
});

export const incrementCurrentWord = (letter) => ({
  type: INCREMENT_CURRENT_WORD,
  payload: letter
});

export const decrementCurrentWord = () => ({
  type: DECREMENT_CURRENT_WORD
});