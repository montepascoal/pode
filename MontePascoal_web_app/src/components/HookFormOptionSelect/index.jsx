import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import OptionSelect from '../OptionSelect';

import * as S from './styles';

export default function HookFormOptionSelect({
  control,
  error,
  name,
  label,
  options,
  color,
  disabled,
  ...rest
}) {

  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          const selected = options.find(op => op.value === value);
          return (
            <OptionSelect
            label={label}
            onChange={val => onChange(val.value)}
            value={selected ?? null}
            name={name}
            classNamePrefix="react-select"
            options={options}
            color={color}
            placeholder="Selecione um valor"
            isDisabled={disabled}
            error={!!error}
            {...rest}
          />
          )
        }}
        name={name}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );

}

HookFormOptionSelect.propTypes = {
  label   : PropTypes.string,
  options : PropTypes.array,
  color   : PropTypes.string
}

HookFormOptionSelect.defaultProps = {
  label   : '[undefined]',
  options : [{value: '', label: ''}],
  color   : 'primary'
}