import styled, { css } from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: var(--white);
  border-bottom: 2px solid #DCDCDC;
  border-left: 3px solid var(--primary);
  width: 100%;
  min-height: 30px;
  max-height: 30px;
  height: 100%;
  padding: 0 15px;

  ${media.between("768px", "1023px")`
    min-height: 30px;
    max-height: 30px;
  `}

  ${media.lessThan("767px")`
    min-height: 25px;
    max-height: 25px;
  `}
`;

export const List = styled.ul`
  list-style: none;
  display: inline-flex;
  width: 100%;  

  ${media.between("481px", "767px")`
    li:not(:first-child):not(:nth-last-of-type(-n+2)) {
      display: none;
    }
  `}

  ${media.between("320px", "480px")`
    li:not(:first-child):not(:last-child) {
      display: none;
    }
  `}
`;

export const Item = styled.li`
  text-decoration: none;
  display: flex;
  align-items: center;
  width: auto;

  ${({ disabled }) => disabled && css`
    pointer-events: none;
    cursor: not-allowed;
  `}

  svg {
    fill: var(--primary);
    color: var(--primiary);
    font-size: 12px;
    margin: 0 3px;
  }

  a {
    font-size: 14px;
    color: #000;
    width: 100%;

    &:hover {
      color: #000;
    }

    ${media.between("768px", "1023px")`
      font-size: 14px;
    `}

    ${media.lessThan("767px")`
      font-size: 13px;
    `}
  }
`;