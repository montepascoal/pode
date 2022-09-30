import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Input({
  label,
  value,
  name,
  placeholder,
  success,
  error,
  disabled,
  required,
  mask,
  maskFc,
  ...rest }) {

  const isEmpty = () => {
    return value.length === 0;
  };
  
  return (
    <S.BoxInputs className="inputGroup">
      {label &&
        <S.Label htmlFor={name}>{label} {required && <span>*</span>}</S.Label>
      }
      <S.InputGroup>
        {mask ? (
          <S.MaskInput
            value={value ?? ""}
            name={name}
            id={name}
            success={success} 
            error={error}
            placeholder={placeholder}
            isEmpty={isEmpty()}
            disabled={disabled}
            mask={mask}
            {...rest}
          />
        ) : (
          <S.Input
            value={value ?? ""}
            name={name}
            id={name}
            success={success} 
            error={error}
            placeholder={placeholder}
            isEmpty={isEmpty()}
            disabled={disabled}
            {...rest}
          />
        )}

        {!disabled && (
          <>
            <S.IconDefault success={success} error={error} />
            <S.IconActive />
            <S.IconSuccess success={+success} error={+error} />
            <S.IconError   error={+error} success={+success} />
          </>
        )}

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