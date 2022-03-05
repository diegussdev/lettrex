import { StyledButton } from '../../../../styles/components/header/buttons/button';

import ShareIcon from '../../../../assets/share.svg';
import { useSelector } from 'react-redux';
import { GameReducer } from '../../../../store/reducers';

export default function ShareButton() {
  const { finish, tries } = useSelector((state: GameReducer) => state.game);

  const getShareLink = function (): string {
    var link = 'https://api.whatsapp.com/send?text=';

    if (finish) {
      link += '*Meu Resultado hoje:*';
      link += '%0A';
      link += '%0A';
      
      tries.forEach((currentTry) => {
        currentTry.forEach((letter) => {
          if (letter.status == 'right') {
            link += '🟩';
          } else if (letter.status == 'displaced') {
            link += '🟨';
          } else {
            link += '🟥';
          }
        });

        link += '%0A';
      });

      link += '%0A';
    }

    link += '*Jogue%20também:*%20https://lettrex.herokuapp.com/';

    return link;
  };

  return (
    <StyledButton>
      <a href={getShareLink()} target="_blank">
        <ShareIcon />
      </a>
    </StyledButton>
  );
}