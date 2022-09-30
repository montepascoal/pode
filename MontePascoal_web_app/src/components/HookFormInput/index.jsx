import * as S from './styles';
import { Controller } from 'react-hook-form';
import Input from '../Input';
import { useState } from 'react';

export default function HookFormInput({
  control,
  error,
  name,
  mask,
  onMask,
  onBlur,
  ...rest
}) {
  const [customMask, setCustomMask] = useState(mask);

  function onMaskFocusFc(value) {
    if (!onMask) return;
    setCustomMask(onMask(value, 'focus'));
  };

  function onMaskBlurFc(value) {
    if (onBlur) onBlur(value);
    if (!onMask) return;
    setCustomMask(onMask(value, 'blur'));
  };

  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value ?? ""}
            error={!!error}
            name={name}
            mask={customMask}
            onBlur={() => onMaskBlurFc(value)}
            onFocus={() => onMaskFocusFc(value, )}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  )
}