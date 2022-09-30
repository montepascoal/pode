import React from 'react';

import Layout from '../../components/Layout';
import MainSlider from '../../components/MainSlider';
import News from '../../components/News';
import Calendar from '../../components/Calendar';

import * as S from './styles';

export default function Main () {

  document.title = 'Main | Monte Pascoal';

  return (
    <Layout>
      <S.Container>
        <MainSlider />
        <S.Wrapper>
          <News />
          <Calendar />
        </S.Wrapper>
      </S.Container>
    </Layout>
  );
}