import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../components/Link';

import { FaUserCircle, FaPowerOff } from "react-icons/fa";
import * as S from './styles';

export default function HeaderNavUser ({ isOpen }) {

  return (
    <S.Container isOpen={isOpen}>
      <S.List>
        <S.Item>
          <Link link="/perfil">
            <FaUserCircle />
            Meu Perfil
          </Link>
        </S.Item>
        <S.Item>
          <Link link="/logout">
            <FaPowerOff />
            Logout
          </Link>
        </S.Item>
      </S.List>
    </S.Container>
  );
}

HeaderNavUser.propTypes = {
  isOpen : PropTypes.bool,
}

HeaderNavUser.defaultProps = {
  isOpen : false,
}