import styled from "styled-components";

export const Container = styled.form`
  > section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 16px;

    .status {
      width: 300px;
    }

    input:disabled {
      color: var(--text_2);
    }

    label {
      margin: 0;
    }
  }
`;

export const FormRow = styled.div`
  display: grid;
  gap: 20px;

  &.infos {
    grid-template-columns: repeat(3, 1fr)
  }

  &.endereco {
    grid-template-columns: repeat(4, 1fr)
  }

  &.endereco2 {
    grid-template-columns: repeat(3, 1fr)
  }

  &.contato {
    grid-template-columns: repeat(3, 1fr)
  }

  @media(max-width: 1100px) {
    &.infos, &.endereco, &.endereco2, &.contato {
    grid-template-columns: 1fr;
  }
  }
`;

export const Title = styled.h3`
  margin: 16px 0;
  color: var(--primary);
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid var(--text_3);
  padding: 16px;
  gap: 20px;

  > button {
    width: fit-content;
    margin: 0;
  }
`;