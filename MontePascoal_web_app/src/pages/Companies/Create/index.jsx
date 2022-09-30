import React from 'react';

import Layout from '../../../components/Layout';
import ButtonLink from '../../../components/ButtonLink';
import CompanyForm from '../../../components/CompanyForm';

import * as S from './styles';

export default function CompaniesCreate () {
  document.title = 'Cadastrar Unidade | Monte Pascoal';

  return (
    <Layout>
      <S.Container>
        <S.Wrapper>
          <S.Title>Cadastrar Unidade</S.Title>
          <S.Actions>
            <ButtonLink text="Voltar para a lista" to="/unidades/listar" />
          </S.Actions>
        </S.Wrapper>
        <CompanyForm />
      </S.Container>
    </Layout>
  );
}