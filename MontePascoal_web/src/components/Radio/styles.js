import styled from 'styled-components';

export const BoxRadio = styled.div`
  display: flex;
  align-items: center;
`;

export const RadioButtonLabel = styled.label`
  position: absolute;
  top: 0%;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  //margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
`;

export const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  &:checked ~ ${RadioButtonLabel} {
    background: var(--${({color}) => color});
    &::after {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 7.5px;
      background-color: var(--white);
      margin: 5px;
    }
  }
`;