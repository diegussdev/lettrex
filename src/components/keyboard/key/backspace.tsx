import { StyledControlKey } from '../../../styles/components/keyboard/key/controlKey';

import BackspaceIcon from '../../../assets/backspace.svg';
import { useDispatch } from 'react-redux';
import { decrementCurrentWord } from '../../../store/actions/game';

export default function BackspaceKey() {
  const dispatch = useDispatch();

  function removeLetter() {
    dispatch(decrementCurrentWord());
  }

  return (
    <StyledControlKey onClick={removeLetter}>
      <BackspaceIcon />
    </StyledControlKey>
  );
}