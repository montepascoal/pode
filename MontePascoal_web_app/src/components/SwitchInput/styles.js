import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: .6rem;
  flex-direction: column;
  align-items: flex-start;

  > div {
    display: flex;
    align-items: center;
    gap: .6rem;
  }
`;

export const CheckInput = styled.input.attrs({
  type: "checkbox"
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: 2.2rem;
  height: 1.2rem;
  border-radius: 4rem;
  background: var(--default);

  transition: .3s;

  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    background: var(--background);
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    right: 52%;
    transition: .3s;
  }

  &:checked {
    background: var(--primary);

    &::after {
      right: 10%;
    }
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  color: var(--text);
  font-size: 14px;

  span {
    color: var(--error);
  }
`;