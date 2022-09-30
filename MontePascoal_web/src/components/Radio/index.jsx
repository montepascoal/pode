import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Radio({ label, name, value, checked, color, ...rest }) {

  return(
    <S.BoxRadio>
      <S.Label>
        <S.RadioButton
          type="radio"
          name={name}
          value={value}
          color={color}
          checked={checked === value}
          {...rest}
        />
        <S.RadioButtonLabel />
        { label }
      </S.Label>
    </S.BoxRadio>
  );
}

Radio.propTypes = {
  label : PropTypes.string,
  name  : PropTypes.string,
  value : PropTypes.string,
  color : PropTypes.string
}

Radio.defaultProps = {
  label : '[undefined]',
  name  : '[undefined]',
  value : '[undefined]',
  color : 'primary'
}