import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 4.3rem;
  border-radius: 0.5rem;
  background: #f3f3f3;
  padding: 1rem;
  display: flex;
  align-items: center;
  border: 2px solid #e9e9e9;
  gap: 1rem;
  justify-content: space-between;
  cursor: pointer;

  transition: .3s;

  color: var(--text_1);

  svg {
    color: var(--primary);
  }

  > svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--text_3);
    opacity: 0.5;
    transition: .3s;
  }

  &:hover {
    border-color: var(--primary);
    filter: brightness(1.05);
    
    > svg {
      color: var(--primary);
      opacity: 1;
    }
  }

  > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      width: 2rem;
      height: 2rem;
      transition: .3s;
    }
  }

  ${({ isEditing }) => isEditing && css`
    &:hover {
      border-color: var(--error);
      
      svg {
        color: var(--error);
      }
    }
  `}
`;