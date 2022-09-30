import React from 'react';
import { useHistory } from 'react-router-dom';
import { version } from "../../../package.json";

import Button from '../../components/Button';

import * as S from './styles';

export default function Pages () {

  const history    = useHistory();
  const goMain     = () => { history.push('/') };
  const goLogin    = () => { history.push('/login') };
  const goLogout   = () => { history.push('/logout') };
  const goReset    = () => { history.push('/reset') };
  const goTest     = () => { history.push('/test') };
  const goDemo     = () => { history.push('/demo') };
  const goError404 = () => { history.push('/notfound') };
  const goError500 = () => { history.push('/error500') };

  document.title = 'Pages | Monte Pascoal';

  return (
    <S.Container>
      <S.TitlePage>Pages</S.TitlePage>

      <S.Wrapper>
        <Button text="PÁGINA MAIN" action={goMain} />
        <Button text="PÁGINA LOGIN" action={goLogin} />
        <Button text="PÁGINA LOGOUT" action={goLogout} />
        <Button text="PÁGINA RESET SENHA" action={goReset} />
        <Button text="PÁGINA TEST" action={goTest} />
        <Button text="PÁGINA DEMO" action={goDemo} />
        <Button text="PÁGINA ERROR 404" action={goError404} />
        <Button text="PÁGINA ERROR 500" action={goError500} />
      </S.Wrapper>

      <S.Version>
        Version: {version}
      </S.Version>

    </S.Container>
  );
}