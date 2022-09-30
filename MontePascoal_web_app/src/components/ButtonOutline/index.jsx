import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function ButtonOutline({ action, text, color }) {
  return (
    <S.ButtonOutline onClick={action} color={color}>{text}</S.ButtonOutline>
  );
}

ButtonOutline.propTypes = {
  text   : PropTypes.string,
  action : PropTypes.func,
  color  : PropTypes.string
}

ButtonOutline.defaultProps = {
  text    : '[undefined]',
  action  : ({ target : { outerText } }) =>  {
    console.log('defaultProp: ' + outerText);
  },
  color   : 'primary'
}