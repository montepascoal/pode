import React from 'react';
import PropTypes from 'prop-types';
import { RiAlertFill } from 'react-icons/ri';

import * as S from './styles';

export default function ButtonAlert({ action, text, ...rest }) {
  return (
    <S.Button 
      onClick={action} 
      { ...rest }
    >
      <div>
        <RiAlertFill />
      </div>
      <p>{text}</p>
    </S.Button>
  );
}

ButtonAlert.propTypes = {
  text    : PropTypes.string,
  action  : PropTypes.func
}

ButtonAlert.defaultProps = {
  text    : '[undefined]',
  action  : ({ target : { outerText } }) =>  {
    console.log('defaultProp: ' + outerText);
  }
}