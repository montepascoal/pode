import styled from 'styled-components';
import { FaCheck, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import media from 'styled-query';
import { css } from 'styled-components';
import ReactInputMask from 'react-input-mask';

export const IconDefault = styled.svg`
  width: 1em;
  height: 1em;
  position: relative;
  left: -30px;
  display: ${({success, error}) => (success || error) ? "none" : "block"};
`;

export const IconActive = styled(FaSpinner)`
  color: var(--active);
  position: relative;
  left: -30px;
  display: none;
`;

export const IconSuccess = styled(FaCheck)`
  color: var(--success);
  position: relative;
  left: -30px;
  display: ${({success, error}) => (success && !error) ? "block" : "none" };
`;

export const IconError = styled(FaTimesCircle)`
  color: var(--error);
  position: relative;
  left: -30px;
  display: ${({error, success}) => (error && !success) ? "block" : "none" };
`;

export const BoxInputs = styled.div`
  width: 100%;
  padding: 0 15px 0 0;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
`;

export const Input = styled.input`
  flex: 1;
  color: ${({isEmpty}) => isEmpty ? "var(--default)" : "var(--text)" };
  border: 1px solid ${({isEmpty}) => isEmpty ? "var(--default)" : "var(--gray-line)" };
  border-radius: 5px;
  padding: 10px 40px 10px 10px;
  font-size: 16px;

  ::placeholder {
    color: var(--default);
    font-size: 12px;
  }
  
  &:focus {
    border: 1px solid var(--active);
  }

  &:focus ~ ${IconActive} {
    display: ${({success, error}) => (!success && !error) ? "block" : "none" };
  }

  &:focus ~ ${IconError} {
    display: ${({success, error}) => (!success && error) ? "block" : "none" };
  }
  
  &:focus ~ ${IconDefault} {
    display: none;
  }

  &:disabled {
    background: var(--disabled);
    color: var(--gray-line);
    border: 1px solid var(--gray-line);
  }
  
  &:not(:disabled) {
    ${({success, error}) => {
        if (success) {
          return css`
            color: var(--success) !important;
            border: 1px solid var(--success) !important;

            ::placeholder {
              color: var(--success) !important;
            }
          `
        } else if (error) {
          return css`
            color: var(--error) !important;
            border: 1px solid var(--error) !important;

            ::placeholder {
              color: var(--error) !important;
            }
          `
        }
    }}
  }
`;

export const MaskInput = styled(ReactInputMask)`
  flex: 1;
  color: ${({isEmpty}) => isEmpty ? "var(--default)" : "var(--text)" };
  border: 1px solid ${({isEmpty}) => isEmpty ? "var(--default)" : "var(--gray-line)" };
  border-radius: 5px;
  padding: 10px 40px 10px 10px;
  font-size: 16px;

  ::placeholder {
    color: var(--default);
    font-size: 12px;
  }

  &:focus {
    border: 1px solid var(--active);
  }

  &:focus ~ ${IconActive} {
    display: ${({success, error}) => (!success && !error) ? "block" : "none" };
  }

  &:focus ~ ${IconError} {
    display: ${({success, error}) => (!success && error) ? "block" : "none" };
  }

  &:focus ~ ${IconDefault} {
    display: none;
  }

  &:disabled {
    background: var(--disabled);
    color: var(--gray-line);
    border: 1px solid var(--gray-line);
  }

  &:not(:disabled) {
    ${({success, error}) => {
        if (success) {
          return css`
            color: var(--success) !important;
            border: 1px solid var(--success) !important;

            ::placeholder {
              color: var(--success) !important;
            }
          `
        } else if (error) {
          return css`
            color: var(--error) !important;
            border: 1px solid var(--error) !important;

            ::placeholder {
              color: var(--error) !important;
            }
          `
        }
    }}
  }
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  color: var(--text);
  font-size: 14px;
  margin-top: 15px;

  ${media.lessThan("767px")`
    margin-top: 15px;
  `}

  span {
    color: var(--error);
  }
`;