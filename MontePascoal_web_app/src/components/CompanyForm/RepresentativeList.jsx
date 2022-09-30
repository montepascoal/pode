import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLoading } from '../../hooks/useLoading';
import Table from '../Table';
import * as S from './styles';
import apiProd from '../../services/apiProd';
import { reactFormatter } from 'react-tabulator';
import { ListRow } from '../Table/ListRow';
import { StatusComponent } from '../Table/StatusComponent';
import { Modal } from '../Modal';
import { RepresentativeForm } from '../RepresentativeForm';
import Button from '../Button';

export function RepresentativeList({ companyId }) {
  const [data, setData] = useState([]);

  const history = useHistory();

  const { setGlobalLoading } = useLoading();
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async (mounted) => {
    try {
      setLoading(true);
      setGlobalLoading(true);
      const response = await apiProd.get(`/api/companies/${companyId}/representatives`);
      const formatted = response.data.resData.map((item, i) => {
        item.repStatus = item.repStatus ? 'Ativo' : 'Inativo';
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
      setLoading(false);
    }
  }, [companyId, history, setGlobalLoading]);

  useEffect(() => {
    let mounted = true;

    getData(mounted);
    
    return () =>  { mounted = false; }
  }, [companyId, getData, history, setGlobalLoading]);

  const columns = [
    {title: "Status", field: "repStatus", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<StatusComponent />), width: 80 },
    {title: "ID", field: "id", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />), width: 80 },
    {title: "Nome", field: "repName", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRepresentative, setSelectedRepresentative] = useState();

  function closeModal() {
    setModalIsOpen(false);
    setTimeout(() => setSelectedRepresentative(null),300)
  }

  function selectRepresentative(row) {
    const data = {
      ...row._row.data,
      repStatus: row._row.data.repStatus === 'Ativo'
    };
    setSelectedRepresentative(data)
    setModalIsOpen(true);
  }

  async function refreshFc() {
    await getData(true);
    closeModal();
  }
  
  return (
    <>
      
      {!loading && <Modal
        title="Responsável"
        content={
          <RepresentativeForm companyId={companyId} initialData={selectedRepresentative} isOpen={modalIsOpen} refreshFc={refreshFc}/>
        }
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
      />}

      <S.Wrapper>
        <S.Title>Responsáveis</S.Title>
        <S.Actions>
          <Button text="Novo responsável" action={() => setModalIsOpen(true)} />
        </S.Actions>
      </S.Wrapper>

      <Table
        columns={columns}
        data={data}
        rowClick={(e, row) => selectRepresentative(row)}
      />
    </>
  )
}