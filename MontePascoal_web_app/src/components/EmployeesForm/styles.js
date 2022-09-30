import { ReactTabulator } from "react-tabulator";
import styled from "styled-components";
import media from "styled-query";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(58 59 69 / 15%);
  border: 1px solid #ccc;
  padding: 1.25rem;
  border-radius: 5px;
  gap: 24px;

  .status,
  .empresas {
    width: 350px;

    button {
      height: 40px !important;
      margin-top: auto;
    }
  }

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

  &.status {
    grid-template-columns: 1fr auto;
  }

  &.infos1 {
    grid-template-columns: 2fr 1fr;
  }

  &.infos3,
  &.controle {
    grid-template-columns: 1fr 1fr;
  }

  &.infos {
    grid-template-columns: repeat(3, 1fr);
  }

  &.endereco1 {
    grid-template-columns: 1fr 2fr 2fr 1fr;
  }

  &.financeiro {
    grid-template-columns: repeat(4, 1fr);
  }

  &.infos2,
  &.endereco2,
  &.documentos,
  &.contato,
  &.trabalho,
  &.loginInfos {
    grid-template-columns: repeat(3, 1fr);
  }

  ${media.lessThan("1350px")`
    gap: 16px;

    &.infos1, &.infos2, &.endereco1, &.endereco2, &.documentos, &.contato, &.trabalho, &.financeiro {
      grid-template-columns: 1fr 1fr;
    }
  `}

  ${media.lessThan("1150px")`
    &.loginInfos {
      grid-template-columns: 1fr;
    }
  `}

  ${media.lessThan("960px")`
    &.infos1, &.infos2, &.infos3, &.endereco1, &.endereco2, &.documentos, &.contato, &.trabalho, &.financeiro {
      grid-template-columns: 1fr;
    }
  `}

  ${media.lessThan("650px")`
  &.status {
      grid-template-columns: 1fr;
      width: 100%;

      .status, .react-select__control {
        width: 100%;
      }

      button {
        width: 100%;
        justify-content: center;
      }
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

export const PermissionsContainer = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  ${media.lessThan("1150px")`
    display: flex;
    flex-direction: column;
  `}
`;

export const PermissionColumn = styled.div`
  width: 100%;
  margin: 0.5rem 0;

  > strong {
    display: block;
    width: 100%;
    border-bottom: 1px solid var(--default);
    padding-bottom: 1rem;
    font-weight: 600;
    color: var(--primary);
  }

  > div {
    padding: 1rem 0.5rem;
    display: flex;
    align-items: center;

    > p {
      color: var(--error);
      margin-right: 8rem;
    }

    & + div {
      border-top: 1px solid var(--default);
      padding-top: 1rem;
    }
  }

  &:first-child {
    grid-column: 1 / 3;

    width: 50%;

    ${media.lessThan("1150px")`
      width: 100%;
    `}
  }
`;

export const LogsTableContainer = styled.section`
  width: 100%;
`;

export const Table = styled(ReactTabulator)``;
