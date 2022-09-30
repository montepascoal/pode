import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import Table from '../../components/Table';

import * as S from './styles';
import { reactFormatter } from 'react-tabulator';

import { useLoading } from '../../hooks/useLoading';
import apiProd from '../../services/apiProd';
import { ListRow } from '../../components/Table/ListRow';

export default function Permissions () {
  const [data, setData] = useState([]);

  const history = useHistory();
  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        setGlobalLoading(true);
        const response = await apiProd.get('/api/public/permissions');
        
        if(mounted) {
          setData(response.data.resData.map(item => ({
            ...item,
            perCategory: item.perCategory.charAt(0).toUpperCase() + item.perCategory.slice(1)
          })));
        }
      } catch(error) {
        history.push('/error500');
        console.error('ERROR API [GET] /api/public/permissions: ' + error)
      } finally {
        setGlobalLoading(false);
      }
    }

    getData();
    return () =>  { mounted = false; }
  }, [history, setGlobalLoading]);

  const columns = [
    {title: "Código", field: "id", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />), width: 130 },
    {title: "Categoria", field: "perCategory", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
    {title: "Descrição", field: "perDescription", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)}
  ];

  document.title = 'Configurações - Permissões | Monte Pascoal';

  return (
    <Layout>
      <S.Container>
        <S.Title style={{ margin: '15px 0' }}>Permissões</S.Title>
        <Table
          columns={columns}
          data={data}
        />
      </S.Container>
    </Layout>
  );
}