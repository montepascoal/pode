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
`;

export const Actions = styled.div`
  display: flex;

  button {
    padding: 5px 30px;
    font-size: 17px;
  }
`;