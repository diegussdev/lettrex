import { useSelector } from 'react-redux';
import { GameReducer } from '../../store/reducers';
import { GameLetter } from '../../store/reducers/game';
import { StyledGame } from '../../styles/components/game/game';
import Word from './word';


export default function Game() {
  var { tries } = useSelector((state: GameReducer) => state.game);

  const getTryByPosition = function (tryPosition: number): Array<GameLetter> {
    var currentTry = tries[tryPosition];

    if (!currentTry) {
      var letter = {
        letter: '',
        status: ''
      };

      currentTry = [];
      currentTry.push(letter);
      currentTry.push(letter);
      currentTry.push(letter);
      currentTry.push(letter);
      currentTry.push(letter);
    }

    return currentTry;
  };

  return (
    <StyledGame>
      <Word word={getTryByPosition(0)} position={0} />
      <Word word={getTryByPosition(1)} position={1} />
      <Word word={getTryByPosition(2)} position={2} />
      <Word word={getTryByPosition(3)} position={3} />
      <Word word={getTryByPosition(4)} position={4} />
      <Word word={getTryByPosition(5)} position={5} />
    </StyledGame>
  );
}