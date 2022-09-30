import React from 'react';
import PropTypes from 'prop-types';

import { FaBars } from "react-icons/fa";
import * as S from './styles';

export default function Hamburger ({ toggle }) {

  return (
    <S.Container onClick={toggle}>
      <FaBars />
    </S.Container>
  );
}

Hamburger.propTypes = {
  toggle : PropTypes.func,
}

Hamburger.defaultProps = {
  toggle : () =>  {
    return false;
  },
}