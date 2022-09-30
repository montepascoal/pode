import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Checkbox({ label, name, value, checked, color, ...rest }) {

  return(
    <S.BoxCheckbox>
      <S.Label>
        <S.HiddenCheckbox 
          type="checkbox" 
          name={name}
          value={value} 
          color={color}
          checked={checked} 
          {...rest} 
        />
        <S.StyledCheckbox 
          checked={checked} 
        >
          <S.Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </S.Icon>
        </S.StyledCheckbox>
        {label}
      </S.Label>
    </S.BoxCheckbox>
  );
}

Checkbox.propTypes = {
  label   : PropTypes.string,
  name    : PropTypes.string,
  value   : PropTypes.string,
  checked : PropTypes.bool,
  color   : PropTypes.string
}

Checkbox.defaultProps = {
  label   : '[undefined]',
  name    : '[undefined]',
  value   : '[undefined]',
  checked : false,
  color   : 'primary'
}