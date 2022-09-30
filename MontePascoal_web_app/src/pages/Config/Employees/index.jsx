import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Table from '../../../components/Table';

import * as S from './styles';
import { reactFormatter } from 'react-tabulator';

import { useLoading } from '../../../hooks/useLoading';
import { TabMenu } from '../../../components/TabMenu';
import apiProd from '../../../services/apiProd';
import { ListRow } from '../../../components/Table/ListRow';
import { StatusComponent } from '../../../components/Table/StatusComponent';
import { Modal } from '../../../components/Modal';
import { ConfigEmployeeForm } from '../../../components/ConfigEmployeeForm';
import { ConfigOccupationForm } from '../../../components/ConfigOccupationForm';
import Button from '../../../components/Button';

const departmentsColumns = [
  {title: "Status", field: "depStatus", headerFilter: "input", formatter: reactFormatter(<StatusComponent />), width: 80},
  {title: "Nome", field: "depName", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  {title: "Descrição", field: "depDescription", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
];

const occupationsColumns = [
  {title: "Status", field: "occStatus", headerFilter: "input", formatter: reactFormatter(<StatusComponent />), width: 80},
  {title: "ID", field: "id", headerFilter: "input", hozAlign: "center", formatter: reactFormatter(<ListRow />), width: 70},
  {title: "Departamento", field: "depName", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  {title: "Nome", field: "occName", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  {title: "Descrição", field: "occDescription", hozAlign: "start", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
];

const apiRoute = ["/api/config/employees/departments", "/api/config/employees/occupations"];
const tabs = ["Departamentos", "Funções"];

export default function Places () {
  const [currentTab, setCurrentTab] = useState(0);

  const [data, setData] = useState({});

  const history = useHistory();

  const { setGlobalLoading } = useLoading();
  const [loading, setLoading] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedOccupation, setSelectedOccupation] = useState();

  function selectDepartment(row) {
    const data = {
      ...row._row.data,
      depStatus: row._row.data.depStatus === 'Ativo'
    };
    setSelectedDepartment(data)
    setModalIsOpen(true);
  }

  function selectOccupation(row) {
    const data = {
      ...row._row.data,
      occStatus: row._row.data.occStatus === 'Ativo'
    };
    setSelectedOccupation(data)
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setTimeout(() => setSelectedDepartment(null),300)
    setTimeout(() => setSelectedOccupation(null),300)
  }

  const getData = useCallback(async (mounted) => {
    try {
      setLoading(true);
      setGlobalLoading(true);
      const response = await apiProd.get(apiRoute[currentTab]);

      let apiData
      switch(currentTab) {
        case 1:
          apiData = {
            data: response.data.resData.map((item) => {
              item.occStatus = item.occStatus ? 'Ativo' : 'Inativo';
              item.depName = item.CONFIG_EMPLOYEES_DEPARTMENTS.depName ? item.CONFIG_EMPLOYEES_DEPARTMENTS.depName : 'Não atribuído'
              return item;
            }),
            columns: occupationsColumns
          }
          break
        default:
        apiData = {
          data: response.data.resData.map((item) => {
            item.depStatus = item.depStatus ? 'Ativo' : 'Inativo';
            return item;
          }),
          columns: departmentsColumns
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
      setLoading(false);
      setModalIsOpen(false);
    }
  }, [currentTab, history, setGlobalLoading]);

  useEffect(() => {
    let mounted = true;

    getData(mounted);

    return () =>  { mounted = false; }
  }, [getData, history]);

  document.title = `Configurações - ${tabs[currentTab]} | Monte Pascoal`;

  return (
    <>
      {!loading && <Modal
        title={currentTab === 0 ? "Departamento" : "Função"}
        content={
          currentTab === 0 ?
          <ConfigEmployeeForm initialData={selectedDepartment} isOpen={modalIsOpen} refreshFc={getData}/>
          : <ConfigOccupationForm initialData={selectedOccupation} isOpen={modalIsOpen} refreshFc={getData}/>
        }
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />}
      <Layout>
        <S.Container>
          <TabMenu
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            style={{ margin: '20px 0px'}}
          />
          <S.Wrapper>
            <S.Title>Colaboradores</S.Title>
            <S.Actions>
              <Button text={currentTab === 0 ? "Novo departamento" : "Nova Função"} action={() => setModalIsOpen(true)} />
            </S.Actions>
          </S.Wrapper>
          {!loading && currentTab === 0 && (
            <Table
              columns={data.columns}
              data={data.data}
              rowClick={(e, row) => selectDepartment(row)}
            />
          )}
          {!loading && currentTab === 1 && (
            <Table
              columns={data.columns}
              data={data.data}
              rowClick={(e, row) => selectOccupation(row)}
            />
          )}
        </S.Container>
      </Layout>
    </>
  );
}