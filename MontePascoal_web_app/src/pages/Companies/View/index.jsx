import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import apiProd from '../../../services/apiProd';

import Layout from '../../../components/Layout';
import Button from '../../../components/Button';
import CompanyForm from '../../../components/CompanyForm';

import * as S from './styles';
import { useLoading } from '../../../hooks/useLoading';

export default function ViewCompany () {
  const [data, setData] = useState([]);

  const history = useHistory();
  
  const { id } = useParams();

  const { setShowLoading } = useLoading();
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setShowLoading(true);
      const response = await apiProd.get(`/api/companies/${id}`);

      setData(response.data.resData);
    } catch(error) {
      // history.push('/error500');
      // console.error('ERROR API PROD [GET] /companies/{id}: ' + error)
    } finally {
      setShowLoading(false);
      setLoading(false);
    }
  }, [id, setLoading, setShowLoading]);

  useEffect(() => {
    getData();
  }, [getData, history, id]);

  document.title = 'Visualizar Unidade | Monte Pascoal';
  return (
    <Layout>
      <S.Container>
        <S.Wrapper>
          <S.Title>Visualizar Unidade</S.Title>
          <S.Actions>
            <Button text="Voltar para a lista" action={() => {history.push('/unidades/listar')} } />
          </S.Actions>
        </S.Wrapper>
        {!loading && <CompanyForm initialData={data} refreshFc={getData}/>}
      </S.Container>
    </Layout>
  );
}