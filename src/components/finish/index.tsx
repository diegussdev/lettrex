import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptNewTry } from '../../store/actions/game';
import { GameReducer } from '../../store/reducers';
import { StyledFinish } from '../../styles/components/finish/finish';

export default function Finish() {
  const dispatch = useDispatch();
  const { won, newTry } = useSelector((state: GameReducer) => state.game);

  var className = won.status ? 'won' : 'lose';
  var mensagem = won.status
    ? `Você venceu em ${won.try + 1} tentativa(s)` 
    : 'Não foi dessa vez!';

  const acceptTry = function () {
    dispatch(acceptNewTry());
  };

  return (
    <StyledFinish>
        <h1 className={className}>
            {mensagem}
        </h1>
        { newTry
          ? <><p>Você ganhou mais uma chance</p> <div className='new-try' onClick={acceptTry}>Aceitar</div></>
          : <p> Próxima palavra à meia-noite </p>
        }

    </StyledFinish>
  );
}