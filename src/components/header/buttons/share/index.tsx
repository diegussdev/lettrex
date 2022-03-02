import { StyledButton } from '../../../../styles/components/header/buttons/button';

import ShareIcon from '../../../../assets/share.svg';

export default function ShareButton() {
  return (
    <StyledButton>
      <a href="https://api.whatsapp.com/send?text=https://lettrex.herokuapp.com/" target="_blank">
        <ShareIcon />
      </a>
    </StyledButton>
  );
}