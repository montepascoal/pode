import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../components/Layout';
import Table from '../../components/Table';

import * as S from './styles';
import { reactFormatter } from 'react-tabulator';

import { useLoading } from '../../hooks/useLoading';
import { TabMenu } from '../../components/TabMenu';
import apiProd from '../../services/apiProd';
import { ListRow } from '../../components/Table/ListRow';

const countriesColumns = [
  {title: "Nome", field: "couName", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
];

const statesColumns = [
  {title: "Nome", field: "staName", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
];

const citiesColumns = [
  {title: "Nome", field: "citName", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  {title: "Estado", field: "staName", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
];

const apiRoute = ["countries", "states", "cities"]

export default function Places () {
  const [tabs] = useState(['Países', 'Estados', 'Cidades']);
  const [currentTab, setCurrentTab] = useState(1);

  const [data, setData] = useState({});

  const history = useHistory();

  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        setGlobalLoading(true);
        const response = await apiProd.get(`/api/public/${apiRoute[currentTab]}`);
        
        let apiData
        switch(currentTab) {
          case 2:
            apiData = {
              data: response.data.resData.map(item => ({
                ...item,
                staName: item.CONFIG_STATES.staName
              })),
              columns: citiesColumns
            }
            break
          case 1:
            apiData = {
              data: response.data.resData,
              columns: statesColumns
            }
            break
          default:
            apiData = {
              data: response.data.resData,
              columns: countriesColumns
            }
        };
        
        if(mounted) {
          setData(apiData);
        }
      } catch(error) {
        history.push('/error500');
        console.error(`ERROR API [GET] /api/public/${apiRoute[currentTab]}: ` + error)
      } finally {
        setGlobalLoading(false);
      }
    }

    getData();
    return () =>  { mounted = false; }
  }, [history, setGlobalLoading, currentTab]);

  document.title = 'Configurações - Localidades | Monte Pascoal';

  return (
    <Layout>
      <S.Container>
        <TabMenu
          tabs={tabs}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          style={{ margin: '20px 0px'}}
        >
            <S.Title>Localidades</S.Title>
        </TabMenu>
        <Table
          columns={data.columns}
          data={data.data}
        />
      </S.Container>
    </Layout>
  );
}