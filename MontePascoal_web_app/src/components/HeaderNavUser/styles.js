import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  position: fixed;
  min-width: 360px;
  max-width: 360px;
  width: 100%;
  background: #FFF;
  border: 2px solid #DCDCDC;
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  right: 15px;
  top: 80px;
  max-height: ${({isOpen}) => isOpen ? '250px' : '0' };
  height: auto;
  overflow: hidden;
  visibility: ${({isOpen}) => isOpen ? 'visible' : 'hidden' };
  transition: all .25s;
  z-index: 1;

  ${media.between("768px", "1023px")`
    min-width: 300px;
    max-width: 300px;
  `}

  ${media.lessThan("767px")`
    max-width: 100%;
    right: 0px;
  `}
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

export const Item = styled.li`
  text-decoration: none;
  width: 100%;

  a {
    font-size: 14px;
    color: var(--text_1);
    padding: 15px;
    width: 100%;
    transition: all .2s;

    svg {
      color: var(--text_1);
      fill: var(--text_1);
      margin-right: 10px;
      font-size: 15px;
    }

    &:hover {
      background: #DCDCDC36;
      color: #000;
      transition: all .2s;

      svg {
        color: #000;
        fill: #000;
        margin-right: 10px;
      }
    }
  }

  ${media.lessThan("767px")`
    a {
      justify-content: center;
    }
  `}
`;