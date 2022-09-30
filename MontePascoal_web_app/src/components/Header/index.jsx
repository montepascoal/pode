import React from 'react';

import HeaderLogo from '../../components/HeaderLogo';
import HeaderNav from '../../components/HeaderNav';

import * as S from './styles';

export default function Header () {
  return (
    <S.Container>
       <HeaderLogo />
       <HeaderNav />
    </S.Container>
  );
}