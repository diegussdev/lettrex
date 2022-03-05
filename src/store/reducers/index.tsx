import { combineReducers } from 'redux';
import gameReducer, { GameState } from './game';

export interface GameReducer{
  game: GameState
}

export default combineReducers({
  game: gameReducer
});