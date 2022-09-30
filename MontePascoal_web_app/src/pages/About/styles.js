import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px 150px 15px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h4`
  color: var(--primary);
  margin: 16px 0;
`;

export const Actions = styled.div`
  display: flex;

  button {
    padding: 5px 30px;
    font-size: 17px;
  }
`;

export const AboutContent = styled.section`;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.15rem 1.75rem 0 rgb(58 59 69 / 15%);
  border: 1px solid #CCC;
  padding: 1.25rem;
  border-radius: 5px;
  gap: 24px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media(max-width: 970px) {
    grid-template-columns: 1fr;
  }

  input:disabled {
    color: var(--text_2);
  }

  label {
    margin: 0;
  }
`;
