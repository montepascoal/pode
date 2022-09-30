import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import apiProd from '../../../../services/apiProd';

import Layout from '../../../../components/Layout';

import * as S from './styles';
import { useLoading } from '../../../../hooks/useLoading';
import CompanyMainForm from '../../../../components/CompanyMainForm';

export default function ConfigViewCompany () {
  const [data, setData] = useState([]);

  const history = useHistory();
  
  const { id } = useParams();

  const { setShowLoading } = useLoading();
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      setShowLoading(true);
      const response = await apiProd.get('/api/companies-main/1');

      setData(response.data?.resData);
    } catch(error) {
      history.push('/error500');
      console.error('ERROR API [GET] /api/companies-main/1: ' + error)
    } finally {
      setShowLoading(false);
      setLoading(false);
    }
  }, [history, setLoading, setShowLoading]);

  useEffect(() => {
    getData();
  }, [getData, history, id]);

  document.title = 'Empresa | Monte Pascoal';
  
  return (
    <Layout>
      <S.Container>
        <S.Wrapper>
          <S.Title>Visualizar Empresa</S.Title>
        </S.Wrapper>
        {!loading && <CompanyMainForm initialData={data} refreshFc={getData}/>}
      </S.Container>
    </Layout>
  );
}