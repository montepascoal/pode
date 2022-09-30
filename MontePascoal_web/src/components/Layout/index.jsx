import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Hamburger from '../Hamburger';
import Breadcrumb from '../Breadcrumb';
import Navbar from '../Navbar';

import * as S from './styles';

export default function Layout ({ children }) {

  const [expand, isExpand] = useState(false);

  return (
    <S.Container>
      <Header />
      <S.WrapperBreadcrumb>
        <Hamburger toggle={() => isExpand(!expand) } />
        <Breadcrumb />
      </S.WrapperBreadcrumb>
      <S.Wrapper>
        <Navbar expand={expand} />
        <S.WrapperPage>
          {children}
        </S.WrapperPage>
      </S.Wrapper>
    </S.Container>
  );
}

Layout.propTypes = {
  children : PropTypes.node
}