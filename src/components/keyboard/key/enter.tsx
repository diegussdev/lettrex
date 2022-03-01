import { StyledControlKey } from '../../../styles/components/keyboard/key/controlKey';

import EnterIcon from '../../../assets/enter.svg';
import { useDispatch } from 'react-redux';
import { submitWord } from '../../../store/actions/game';

export default function EnterKey() {
  const dispatch = useDispatch();

  function submitCurrentWord() {
    dispatch(submitWord());
  }
  return (
    <StyledControlKey onClick={submitCurrentWord}>
      <EnterIcon />
    </StyledControlKey>
  );
}