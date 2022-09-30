import styled from "styled-components";
import { css } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  pointer-events: ${({ isOpen }) => isOpen ? 'auto' : 'none'};

  transition: .3s;
`;

export const Container = styled.section`
  background: var(--white);
  border-radius: 8px;
  min-width: 70vw;

  ${({ maxWidth }) => maxWidth && css`
    max-width: ${maxWidth};
    min-width: ${maxWidth};
  `}

  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding: 16px;

    h1 {
      font-size: 30px;
      color: var(--text_1);
    }
  }

  .content {
    max-height: 85vh;
    overflow-y: auto;
  }

  @media(max-width: 950px) {
    min-width: 90vw;
  }
`;