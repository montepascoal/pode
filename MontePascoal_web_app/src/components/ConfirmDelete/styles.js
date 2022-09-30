import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 1.5rem 1rem;
  text-align: center;

  p {
    color: var(--text_1);
  }

  > section {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    height: 2rem;

    > button {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  }
`;