import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Input({ label, value, name, placeholder, success, error, ...rest }) {

  const isEmpty = () => {
    return value.length === 0;
  };

  return (
    <S.BoxInputs>
      {label &&
        <S.Label>{label}</S.Label>
      }
      <S.InputGroup>
        <S.Input
          value={value}
          name={name}
          success={success} 
          error={error}
          placeholder={placeholder}
          isEmpty={isEmpty()}
          {...rest}
        />

        <S.IconDefault success={success} error={error} />
        <S.IconActive />
        <S.IconSuccess success={+success} error={+error} />
        <S.IconError   error={+error} success={+success} />

      </S.InputGroup>
    </S.BoxInputs>
  );
}

Input.propTypes = {
  type        : PropTypes.string,
  label       : PropTypes.string,
  placeholder : PropTypes.string,
  value       : PropTypes.string,
  name        : PropTypes.string,
  success     : PropTypes.bool,
  error       : PropTypes.bool
}

Input.defaultProps = {
  type        : 'text',
  value       : '[undefined]',
  name        : '[undefined]',
  placeholder : 'Digite um valor',
  success     : false,
  error       : false
}