import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import apiProd from '../../../services/apiProd';
import { mascaraCNPJ, mascaraCPF, mascaraPhone } from '../../../utils/mask';

import Layout from '../../../components/Layout';
import Table from '../../../components/Table';
import ButtonLink from '../../../components/ButtonLink';

import * as S from './styles';
import { reactFormatter } from 'react-tabulator';

import { FiCheckCircle } from 'react-icons/fi';
import { CgCloseO } from 'react-icons/cg';
import { useLoading } from '../../../hooks/useLoading';
import { ListRow } from '../../../components/Table/ListRow';
import { StatusComponent } from '../../../components/Table/StatusComponent';
import { validaCnpjCpf } from '../../../utils/validate';

export default function CompaniesList () {
  const [data, setData] = useState([]);

  const history = useHistory();

  const { setGlobalLoading } = useLoading();

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        setGlobalLoading(true);
        const response = await apiProd.get("/api/companies");

        const formatted = response.data.resData.map((item, i) => {
          const result = validaCnpjCpf(item.comCpfCnpj);
          result === 'CNPJ' ? item.comCpfCnpj = mascaraCNPJ(item.comCpfCnpj) : item.comCpfCnpj = mascaraCPF(item.comCpfCnpj);
          item.comConPhone1 = mascaraPhone(item.comConPhone1);
          item.comStatus    = item.comStatus ? 'Ativo' : 'Inativo';
          return item;
        });

        if(mounted) {
          setData(formatted);
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
    {title: "CPF/CNPJ", field: "comCpfCnpj", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
    {title: "Telefone", field: "comConPhone1", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
    {title: "Email", field: "comConEmail", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  ];
  
  document.title = 'Unidades | Monte Pascoal';

  function handleRowClick(e, row) {
    if(e.ctrlKey || e.shiftKey) {
      window.open(`${window.location.origin}/unidades/visualizar/${row._row.data.id}`);
    } else {
      history.push(`/unidades/visualizar/${row._row.data.id}`)
    }
  }

  return (
    <Layout>
      <S.Container>
        <S.Wrapper>
          <S.Title>Unidades</S.Title>
          <S.Actions>
            <ButtonLink to="/unidades/cadastrar" text="Nova Unidade"/>
          </S.Actions>
        </S.Wrapper>
        <Table
          columns={columns}
          data={data}
          rowClick={(e, row) => handleRowClick(e, row)}
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