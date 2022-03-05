import { GameLetter } from '../../../../store/reducers/game';
import { StyledLetter } from '../../../../styles/components/game/letter';

interface Key {
  letter: GameLetter;
  isCurrentWordPosition: boolean
}

export default function Letter({ letter, isCurrentWordPosition }: Key) {  
  var className = 'current';

  if (!isCurrentWordPosition) {
    className = letter.status;
  } else if (letter.status == 'error') {
    className = letter.status;
  }
    
  return (
    <StyledLetter className={className}>
      {letter.letter}
    </StyledLetter>
  );
}