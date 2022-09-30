import styled from 'styled-components';

export const BoxCheckbox = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
`;

export const StyledCheckbox = styled.div`
  position: absolute;
  top: 0%;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  transition: all 150ms;
  border: 1px solid var(--gray-line);
  cursor: pointer;
  margin-right: 5px;

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')}
  }
`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
export const HiddenCheckbox = styled.input`
  opacity: 0;
  z-index: 1;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  &:checked ~ ${StyledCheckbox} {
    background: var(--${({color}) => color});
  }

  &:focus ~ ${StyledCheckbox} {
    box-shadow: 0 0 0 3px var(--white);
  }
`;