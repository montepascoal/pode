import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

export default function ButtonLink({ action, text, color, to, ...rest }) {
  return (
    <S.Button 
      to={to}
      color={color}
      { ...rest }
    >
      {text}
    </S.Button>
  )
}

ButtonLink.propTypes = {
  text    : PropTypes.string,
  action  : PropTypes.func,
  color   : PropTypes.string
}

ButtonLink.defaultProps = {
  text    : '[undefined]',
  color   : 'primary',
  to      : '/'
}