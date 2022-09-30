import React, { useState } from 'react';

import Link from '../../components/Link';

import { FaAngleRight } from "react-icons/fa";
import * as S from './styles';

export default function Breadcrumb () {

  const [crumbs] = useState([
    {label: 'Home', link: '/'},
    /*
    {label: 'Financeiro', link: 'financeiro'},
    {label: 'Contas', link: 'contas'},
    {label: 'A Receber', link: 'receber'},
    {label: 'Visualizar', link: 'visualizar'},
    {label: 'Estornar', link: 'estornar'},
    {label: 'Validar', link: '#'}
    */
  ]);

  return (
    <S.Container>
      <S.List>
        {
          crumbs.map((p, i) => {
            let { label, link } = p;

            return (
              <S.Item key={i}>
                <FaAngleRight />
                <Link link={link}>
                  {label}
                </Link>
              </S.Item>
            );
          })
        }
      </S.List>
    </S.Container>
  );
}