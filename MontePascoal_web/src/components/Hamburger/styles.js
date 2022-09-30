import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 45px;
  max-width: 45px;
  width: 100%;
  min-height: 30px;
  max-height: 30px;
  height: 100%;
  cursor: pointer;
  transition: transform .2s;

  &:hover {
    transform: scale(1.1);
    transition: transform .2s;
  }

  ${media.between("768px", "1023px")`
    min-height: 30px;
    max-height: 30px;
  `}

  ${media.lessThan("767px")`
    min-height: 25px;
    max-height: 25px;
    border-bottom: 2px solid #DCDCDC;
  `}
`;