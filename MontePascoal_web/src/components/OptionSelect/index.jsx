import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function OptionSelect({ label, options, color }) {

  return (
    <S.BoxSelect>
      <S.Label>{label}</S.Label>
      {/* menuIsOpen={true} */}
      <S.OptionSelect classNamePrefix="react-select" options={options} color={color} />
    </S.BoxSelect>
  );

}

OptionSelect.propTypes = {
  label   : PropTypes.string,
  options : PropTypes.array,
  color   : PropTypes.string
}

OptionSelect.defaultProps = {
  label   : '[undefined]',
  options : [{value: '', label: ''}],
  color   : 'primary'
}