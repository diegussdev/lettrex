//@ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { StyledFinish } from '../../styles/components/finish/finish';

export default function Finish() {
  const { won } = useSelector((state) => state.game);

  var className = won.status ? 'won' : 'lose';
  var mensagem = won.status
    ? `Você venceu em ${won.try + 1} tentativa(s)` 
    : 'Não foi dessa vez!';

  return (
    <StyledFinish>
        <h1 className={className}>
            {mensagem}
        </h1>
        <p>
            Próxima palavra à meia-noite
        </p>
    </StyledFinish>
  );
}