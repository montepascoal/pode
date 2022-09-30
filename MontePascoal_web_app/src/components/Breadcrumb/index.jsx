import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import Link from '../../components/Link';

import { FaAngleRight } from "react-icons/fa";
import * as S from './styles';

export default function Breadcrumb () {
  const disabledRoutes = ['/configuracoes', '/unidades', '/colaboradores'];

  const routes = [
    { path: '/unidades/visualizar/:id', breadcrumb: 'Visualizar' },
    { path: '/configuracoes', breadcrumb: 'Configurações' },
    { path: '/configuracoes/permissoes', breadcrumb: 'Permissões' },
  ];

  const breadcrumbs = useBreadcrumbs(routes, { excludePaths: ['/unidades/visualizar'] });

  return (
    <S.Container>
      <S.List>
        {
          breadcrumbs.map((p, i) => {
            let { breadcrumb, match } = p;

            return (
              <S.Item key={i} disabled={disabledRoutes.includes(match.url)}>
                <FaAngleRight />
                <Link link={match.url}>
                  {breadcrumb.props.children}
                </Link>
              </S.Item>
            );
          })
        }
      </S.List>
    </S.Container>
  );
}