import { LogsTableContainer } from './styles';
import { reactFormatter } from 'react-tabulator';
import { Table } from '../Table/styles';

import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { ListRow } from '../Table/ListRow';

function formatData(data) {
  const formatDate = data ? new Date(data) : new Date();
  return format(new Date(formatDate), 'dd/MM/YYY | HH:mm', {
    locale: ptBr
  });
};

export function LogsTable() {
  const columns = [
    {title: "Data / Hora", field: "date", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />), width: 250 },
    {title: "Permissão", field: "permission", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />), width: 140 },
    {title: "Descrição", field: "description", hozAlign: "center", headerFilter: "input", formatter: reactFormatter(<ListRow />)},
  ];

  const data = [
    {
      date: formatData(new Date()),
      permission: 'B003',
      description: "=> [2] # Colaborador: Consultado (login) ## [1] [deltta] Suporte Master"
    },
    {
      date: formatData(new Date()),
      permission: 'B003',
      description: "=> [2] # Colaborador: Consultado (login) ## [1] [deltta] Suporte Master"
    },
    {
      date: formatData(new Date()),
      permission: 'B003',
      description: "=> [2] # Colaborador: Consultado (login) ## [1] [deltta] Suporte Master"
    },
    {
      date: formatData(new Date()),
      permission: 'B003',
      description: "=> [2] # Colaborador: Consultado (login) ## [1] [deltta] Suporte Master"
    },
    {
      date: formatData(new Date()),
      permission: 'B003',
      description: "=> [2] # Colaborador: Consultado (login) ## [1] [deltta] Suporte Master"
    }
  ];

  const options = {
    layout: "fitColumns",
    responsiveLayout:"hide",
    pagination:"local",
    paginationSize: 10,
    minHeight: 465,
    height: 465,
    locale:true,
    langs:{
        "en-us":{
            "pagination":{
                "first":"Primeira",
                "first_title":"Primeira página",
                "last":"Última",
                "last_title":"Última página",
                "prev":"Anterior",
                "prev_title":"Página Anterior",
                "next":"Próxima",
                "next_title":"Próxima página",
            },
            "headerFilters":{
                "default":"",
                "columns":{}
            }
        },
        "pt-br":{
            "pagination":{
                "first":"Primeira",
                "first_title":"Primeira página",
                "last":"Última",
                "last_title":"Última página",
                "prev":"Anterior",
                "prev_title":"Página Anterior",
                "next":"Próxima",
                "next_title":"Próxima página",
            },
            "headerFilters":{
                "default":"",
                "columns":{}
            }
        },
    }
  };

  return (
    <LogsTableContainer>
      <Table
        columns={columns}
        data={data}
        options={options}
      />
    </LogsTableContainer>
  )
}