import { Container, CheckInput, Label } from './styles';

export function SwitchInput({
  name,
  label,
  valueLabel,
  value,
  onChange = () => {},
  labelPos,
  required = false,
  disabled = false
}) {
  return (
    <Container labelPos={labelPos}>
      {label && <Label htmlFor={name}>{label} {required && <span>*</span>}</Label>}
      <div>
        <CheckInput
          id={name}
          disabled={disabled}
          checked={value}
          onChange={({ target }) => onChange(target.checked)}
        />
        {valueLabel && <strong htmlFor={name}>{valueLabel}</strong>}
      </div>
    </Container>
  )
}