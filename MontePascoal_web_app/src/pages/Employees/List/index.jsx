import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';
import { mascaraCNPJ, mascaraPhone } from '../../../utils/mask';

import Layout from '../../../components/Layout';
import Table from '../../../components/Table';
import Button from '../../../components/Button';

import * as S from './styles';
import { reactFormatter } from 'react-tabulator';

import { useLoading } from '../../../hooks/useLoading';
import { ListRow } from '../../../components/Table/ListRow';
import { StatusComponent } from '../../../components/Table/StatusComponent';
import { FiCheckCircle } from 'react-icons/fi';
import { CgCloseO } from 'react-icons/cg';

export default function EmployeesList () {
  const [data, setData] = useState([]);

  const history = useHistory();

  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        setGlobalLoading(true);
        const response = await api.get("/companies-main");
        
        response.data.map((item, i) => {
          item.comCnpj      = mascaraCNPJ(item.comCnpj);
          item.comConPhone1 = mascaraPhone(item.comConPhone1);
          item.comStatus    = item.comStatus ? 'Ativo' : 'Inativo';
          return item;
        });

        if(mounted) {
          setData(response.data);
        }
      } catch(error) {
        history.push('/error500');
        console.error('ERROR API [GET] /companies-main: ' + error)
      } finally {
        setGlobalLoading(false);
      }
    }

    getData();
    return () =>  { mounted = false; }
  }, [history, setGlobalLoading]);

  const columns = [
    {title: "Status", field: "comStatus", headerFilter: "input", formatter: reactFormatter(<StatusComponent />), width: 80},
    {title: "Nome", field: "comName", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
    {title: "CNPJ", field: "comCnpj", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
    {title: "Telefone", field: "comConPhone1", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
    {title: "Email", field: "comConEmail", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  ];

  document.title = 'Colaboradores | Monte Pascoal';

  return (
    <Layout>
      <S.Container>
        <S.Wrapper>
          <S.Title>Colaboradores</S.Title>
          <S.Actions>
            <Button text="Novo Colaborador" action={() => {history.push('/colaboradores/cadastrar')} } />
          </S.Actions>
        </S.Wrapper>
        <Table
          columns={columns}
          data={data}
        />
        <S.Legend>
          <h4>Legenda</h4>

          <ul>
            <li>
              <FiCheckCircle color="var(--success)"/>
              Ativo
            </li>
            <li>
              <CgCloseO color="var(--error)"/>
              Inativo
            </li>
          </ul>
        </S.Legend>
      </S.Container>
    </Layout>
  );
}