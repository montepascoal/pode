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

  .status {
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

  &.controle {
    grid-template-columns: 1fr 1fr;
  }

  &.status {
    grid-template-columns: 1fr 200px;
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

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Actions = styled.div`
  display: flex;

  button {
    padding: 5px 30px;
    font-size: 17px;
  }
`;

export const FileListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > button {
    align-self: flex-end;
  }
`;

export const FilesWrapper = styled.section`
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);

  > p {
    align-self: center;
    justify-self: center;
    color: var(--text_1);
  }

  @media(max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;