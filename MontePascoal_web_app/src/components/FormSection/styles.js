import styled from "styled-components";
import { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 24px 0;

    h3,
    svg {
      color: var(--primary);
    }

    svg {
      font-size: 30px;
      opacity: 0.5;
      transition: 0.4s;
      transform: ${({ isActive }) =>
        !isActive ? "rotate(180deg)" : "rotate(0deg)"};
    }
  }
`;

export const Content = styled.section`
  width: 100%;
  display: flex;
  gap: 24px;
  flex-direction: column;
  transition: 0.2s;
  overflow: hidden;
  max-height: 0;

  div {
    margin: 0;
  }

  .inputGroup {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  ${({ isActive, contentHeight }) =>
    isActive &&
    css`
      max-height: ${contentHeight}px;
    `};
`;
