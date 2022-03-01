//@ts-nocheck
import { useSelector } from 'react-redux';
import { StyledGame } from '../../styles/components/game/game';
import Word from './word';


export default function Game() {
  var { tries } = useSelector((state) => state.game);

  return (
    <StyledGame>
      <Word word={tries[0] ? tries[0] : []} position={0} />
      <Word word={tries[1] ? tries[1] : []} position={1} />
      <Word word={tries[2] ? tries[2] : []} position={2} />
      <Word word={tries[3] ? tries[3] : []} position={3} />
      <Word word={tries[4] ? tries[4] : []} position={4} />
      <Word word={tries[5] ? tries[5] : []} position={5} />
    </StyledGame>
  );
}