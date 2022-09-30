import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 75%;
  overflow: scroll;

  &::-webkit-scrollbar {
    height: 7px;
  }
  
  ${media.lessThan("1023px")`
    height: auto;
    width: 100%;
  `}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  padding-bottom: 5px;

  
`;

export const Title = styled.h6`
  display: flex;
  align-items: center;
  width: auto;
  margin-bottom: 25px;

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