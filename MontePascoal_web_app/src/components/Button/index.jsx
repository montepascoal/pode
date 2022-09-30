import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Button({ action, text, color, ...rest }) {
  function handleOnClick(event) {
    event.preventDefault();
    if(action) action();
  }
  return (
    <S.Button 
      onClick={handleOnClick} 
      color={color}
      { ...rest }
    >
      {text}
    </S.Button>
  );
}

Button.propTypes = {
  text    : PropTypes.string,
  action  : PropTypes.func,
  color   : PropTypes.string
}

Button.defaultProps = {
  text    : '[undefined]',
  action  : ({ target : { outerText } }) =>  {
    console.log('defaultProp: ' + outerText);
  },
  color   : 'primary'
}