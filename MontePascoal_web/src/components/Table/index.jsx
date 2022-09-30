import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/Button';

import * as S from './styles';

export default function Table({ columns, data, options }) {

  const ref = useRef();

  const exportToCsv = () => {
    ref.current.table.download('csv', "companies.csv")
  }

  const exportToXlsx = () => {
    ref.current.table.download('xlsx', "companies.xlsx")
  }

  const exportToPdf = () => {
    ref.current.table.download("pdf", "companies.pdf");
  }

  window.addEventListener('resize', () => {
    
  });
 
  return (
    <S.Container>
      <S.Export>
        <S.LabelExport>Exportar: </S.LabelExport>
        <Button action={exportToCsv} text="CSV" />
        <Button action={exportToXlsx} text="XLSX" />
        <Button action={exportToPdf} text="PDF" />
      </S.Export>

      <S.Table
        ref={ref}
        columns={columns}
        data={data}
        options={options}
      />
    </S.Container>
  );

}

Table.propTypes = {
  columns : PropTypes.array,
  data    : PropTypes.array,
  options : PropTypes.object
}

Table.defaultProps = {
  columns : [{}],
  data    : [{}],
  options : {
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
    },
    downloadDataFormatter: (data) => data,
    downloadReady: (fileContents, blob) => blob,
  },
  
}