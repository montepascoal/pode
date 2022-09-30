import React from 'react';

import Link from '../../components/Link';

import logo from '../../assets/images/client/logo-name-transparent.svg';

import * as S from './styles';

export default function HeaderLogo () {
  return (
    <S.Container>
      <S.WrapperLogo>
          <Link link="/">
              <S.Logo src={logo} />
          </Link>
        </S.WrapperLogo>
    </S.Container>
  );
}