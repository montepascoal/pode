import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function OptionSelect({
  label,
  options,
  color,
  disabled,
  success,
  error,
  required,
  ...rest
}) {

  return (
    <S.BoxSelect>
      <S.Label>{label} {required && <span>*</span>}</S.Label>
      {/* menuIsOpen={true} */}
      <S.OptionSelect
        classNamePrefix="react-select"
        options={options}
        color={color}
        placeholder="Selecione um valor"
        isDisabled={disabled}
        success={success}
        error={error}
        {...rest}
      />
    </S.BoxSelect>
  );

}

OptionSelect.propTypes = {
  label   : PropTypes.string,
  options : PropTypes.array,
  color   : PropTypes.string,
  success : PropTypes.bool,
  error : PropTypes.bool,
}

OptionSelect.defaultProps = {
  label   : '[undefined]',
  options : [{value: '', label: ''}],
  color   : 'primary',
  success : null,
  error   : null
}