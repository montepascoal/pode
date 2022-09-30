import styled from "styled-components";
import media from 'styled-query';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(58 59 69 / 15%);
  border: 1px solid #CCC;
  padding: 1.25rem;
  border-radius: 5px;
  gap: 24px;

  input:disabled {
    color: var(--text_2);
  }

  label {
    margin: 0;
  }
`;

export const FormRow = styled.div`
  display: grid;
  gap: 20px;

  &.controle {
    grid-template-columns: 1fr 1fr;
  }

  &.infos {
    grid-template-columns: repeat(3, 1fr);
  }

  &.endereco1 {
    grid-template-columns: 1fr 2fr 2fr 1fr;
  }

  &.endereco2 {
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  }

  &.redes, &.contato {
    grid-template-columns: repeat(4, 1fr);
  }

  ${media.lessThan("1350px")`
    gap: 16px;

    &.endereco1, &.endereco2, &.redes, &.contato {
      grid-template-columns: 1fr 1fr;
    }
  `}

  ${media.lessThan("960px")`
  &.controle, &.infos, &.endereco1, &.endereco2, &.redes, &.contato {
      grid-template-columns: 1fr;
    }
  `}
`;

export const Title = styled.h3`
  margin: 16px 0;
  color: var(--primary);
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  align-self: flex-end;
  gap: 16px;

  > button {
    width: fit-content;
  }
`;