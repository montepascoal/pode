import React from 'react';
import { useHistory } from 'react-router-dom';
import { version } from "../../../package.json";

import Button from '../../components/Button';

import * as S from './styles';

export default function Home () {

  const history    = useHistory();
  const goError404 = () => { history.push('/notfound') };
  const goError500 = () => { history.push('/error500') };

  document.title = 'Home | Monte Pascoal';

  return (
    <S.Container>
      <S.TitlePage>Home</S.TitlePage>

      <S.Wrapper>
        <Button text="PÁGINA ERROR 404" action={goError404} />
        <Button text="PÁGINA ERROR 500" action={goError500} />
      </S.Wrapper>

      <S.Version>
        Version: {version}
      </S.Version>

    </S.Container>
  );
}