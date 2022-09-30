import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: max-content;
  width: auto;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  border-right: 2px solid #DCDCDC;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lessThan("767px")`
    display: ${({expand}) => expand ? 'flex' : 'none' };
    width: 100%;
    height: 100%;
    background: #FFF;

    & ~ div {
      display: ${({expand}) => !expand ? 'block' : 'none' };
    }
  `}
`;