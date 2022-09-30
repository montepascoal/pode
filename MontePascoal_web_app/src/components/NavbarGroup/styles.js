import styled from 'styled-components';
//import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  svg {
    min-width: 15px;
    max-width: 15px;
    width: 100%;
    fill: #000;
    color: #000;
    margin: 0 15px;
  }

  &:hover {
    ${({expand}) => {
      if (!expand) {
        return `
          & > div:nth-child(2) {
            display: flex;
            position: absolute;
            background: #FFF;
            width: max-content;
            left: 45px;
            padding: 5px 0;
            border-radius: 10px;
            z-index: 1;
          }
        `
      }
    }}
  }

`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;

  a {
    align-items: center;
    width: 100%;
    color: #000;
    padding: 15px 0;
    background: ${({showItems}) => showItems ? '#DDFAF8' : '#FFF' };

    &:hover {
      background: #DDFAF8;

      svg {
        fill: var(--primary);
        color: var(--primary);
      }

      label {
        color: var(--primary);
      }
    }
  }
`;

export const WrapperExpand = styled.div`
  display: ${({expand}) => expand ? 'flex' : 'none' };
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /*
  max-width: ${({expand}) => expand ? '100%' : '0' };
  overflow: hidden;
  visibility: ${({expand}) => expand ? 'visible' : 'hidden' };
  transition: all .15s;
  */

  svg {
    fill: #818181;
    color: #818181;
    transform: ${({showItems}) => showItems ? 'rotate(90deg)' : 'rotate(0deg)' };
    transition: all .15s;
  }
  
`;

export const Label = styled.label`
  width: max-content;
  cursor: pointer;
`;