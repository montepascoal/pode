import styled from "styled-components";

export const Container = styled.div`
  > div {
    padding: 0;
  }
`;

export const Error = styled.p`
  color: var(--error);
  font-size: 13px;

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