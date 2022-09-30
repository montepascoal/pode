import styled from "styled-components";
import { css } from "styled-components";

export const Container = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1.8px solid #E9EBF4;
  z-index: 1;

  > section {
    width: 100%;
    z-index: 1;
    position: relative;
    height: 2rem;

    ul {
      position: absolute;
      right: 0;
      bottom: -3px;
      z-index: 5;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  @media(max-width: 500px) {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h4 {
      margin-bottom: 20px;
    }

    > section ul {
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      justify-content: center;
    }
  }
`;

export const TabItem = styled.li`
  padding: .5rem 1rem;
  border-left: 1.8px solid transparent;
  border-right: 1.8px solid transparent;
  border-top: 1.8px solid transparent;
  cursor: pointer;
  color: var(--primary);
  transition: color .3s;
  padding-bottom: calc(.5rem + 3px);

  ${({ isCurrent }) => isCurrent && css`
    border-color: #E9EBF4;
    border-bottom: 3px solid var(--background);
    color: var(--text_3);
    padding-bottom: .5rem;
  `}
`;