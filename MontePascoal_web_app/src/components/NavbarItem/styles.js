import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: ${({showItems, expand}) => showItems && expand ? 'flex' : 'none' };
  background: ${({showItems, expand}) => showItems && expand ? '#EFFDFD' : '#FFF' };
  justify-content: center;
  width: 100%;
  border: 1px solid #DCDCDC;
`;

export const List = styled.ul`
  width: 100%;
`;

export const Item = styled.li`
  font-size: 14px;

  a {
    padding: 10px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    color: #000;
    font-weight: 500;
    transition: none;
  }

  &:hover {
    background: #DDFAF8;

    a {
      color: var(--primary);
      font-weight: bold;
    }
  }

  ${media.lessThan("1023px")`
    a {
      justify-content: center;
    }
  `}
`;