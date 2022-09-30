import React from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import EmployeesForm from '../../../components/EmployeesForm';

import * as S from './styles';

export default function EmployeesCreate () {
  const history = useHistory();
  
  document.title = 'Cadastrar Colaborador | Monte Pascoal';

  return (
    <Layout>
      <S.Container>
        <S.Wrapper>
          <S.Title>Cadastrar Colaborador</S.Title>
          <S.Actions>
            <Button text="Voltar para a lista" action={() => {history.push('/colaboradores/listar')} } />
          </S.Actions>
        </S.Wrapper>
        <EmployeesForm />
      </S.Container>
    </Layout>
  );
}