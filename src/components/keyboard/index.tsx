import { StyledKeyboard } from '../../styles/components/keyboard/keyboard';
import BackspaceKey from './key/backspace';
import EnterKey from './key/enter';
import Key from './key/letter';

export default function Keyboard() {
  return (
    <StyledKeyboard>
      <div style = {{ marginBottom: '10px' }}>
        <BackspaceKey/>
        <EnterKey/>
      </div>
      <div>
        <Key letter='q' />
        <Key letter='w' />
        <Key letter='e' />
        <Key letter='r' />
        <Key letter='t' />
        <Key letter='y' />
        <Key letter='u' />
        <Key letter='i' />
        <Key letter='o' />
        <Key letter='p' />
      </div>
      <div>
        <Key letter='a' />
        <Key letter='s' />
        <Key letter='d' />
        <Key letter='f' />
        <Key letter='g' />
        <Key letter='h' />
        <Key letter='j' />
        <Key letter='k' />
        <Key letter='l' />
      </div>
      <div>
        <Key letter='z' />
        <Key letter='x' />
        <Key letter='c' />
        <Key letter='v' />
        <Key letter='b' />
        <Key letter='n' />
        <Key letter='m' />
      </div>
    </StyledKeyboard>
  );
}