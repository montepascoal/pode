import styled from "styled-components";

export const Container = styled.form`
  > section {
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