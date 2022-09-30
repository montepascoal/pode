import styled from 'styled-components';

export const Container = styled.div``;

export const Error = styled.p`
  color: var(--error);
  font-size: 13px;
  margin-top: 15px;

  @keyframes fadedText {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  animation: fadedText .5s ease-in-out forwards;
`;