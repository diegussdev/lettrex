import { useDispatch, useSelector } from 'react-redux';
import { incrementCurrentWord } from '../../../store/actions/game';
import { GameReducer } from '../../../store/reducers';
import { StyledKey } from '../../../styles/components/keyboard/key/key';

interface Key {
  letter: string;
}

export default function Key({ letter }: Key) {
  const dispatch = useDispatch();
  var { discoveredLetters } = useSelector((state: GameReducer) => state.game);

  var className = '';

  if (discoveredLetters[letter]) {
    className = discoveredLetters[letter];
  }

  function addLetter() {
    dispatch(incrementCurrentWord(letter));
  }

  return (
    <StyledKey className={className} onClick={addLetter}>
      {letter}
    </StyledKey>
  );
}