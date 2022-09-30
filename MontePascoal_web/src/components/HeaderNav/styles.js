import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  background: var(--white);
  border-top-left-radius: 35px;
`;

export const WrapperShortcuts = styled.div`
  display: flex;
  align-items: center;
  min-width: 160px;
  max-width: 160px;
  height: 100%;
  margin: 0 15px 0 30px;

  a {
    margin: 0 10px;
    transition: transform .2s;

    &:hover {
      transform: scale(1.2);
      transition: transform .2s;
    }
  }

  ${media.lessThan("767px")`
    display: none;
  `}
`;

export const Shortcut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 0 5px #CCC;

  svg {
    fill: #000;
    color: #000;
  }
`;

export const Line = styled.div`
  background: #DCDCDC;
  width: 2px;
  height: 50px;

  ${media.lessThan("767px")`
    display: none;
  `}
`;

export const WrapperAcount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 360px;
  max-width: 360px;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 0 15px 0 30px;

  ${media.greaterThan("1023px")`
    &:hover {
      & > div:nth-child(3) {
        visibility: visible;
        max-height: 250px;
        cursor: auto;
        transition: all .35s;
      }
    }
  `}

  ${media.between("768px", "1023px")`
    min-width: 300px;
    max-width: 300px;
  `}

  ${media.between("481px", "767px")`
    min-width: 250px;
    max-width: 250px;
  `}

  ${media.between("320px", "480px")`
    min-width: 150px;
    max-width: 150px;
    margin: 0 15px 0 15px;
  `}
`;

export const User = styled.div`
  display: flex;
  align-items: center;
`;

export const WrapperAvatar = styled.div`
  display: flex;
  min-width: 50px;
  max-width: 50px;
  width: 100%;
  height: 50px;
  border-radius: 50%;

  ${media.lessThan("767px")`
    min-width: 40px;
    max-width: 40px;
    height: 40px;
  `}
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
`;

export const WrapperUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 305px;
  width: 100%;
  padding-left: 10px;

  ${media.between("768px", "1023px")`
    max-width: 245px;
  `}

  ${media.between("481px", "767px")`
    max-width: 195px;
  `}

  ${media.between("320px", "480px")`
    max-width: 95px;
  `}

`;

export const NameUser = styled.p`
  margin-bottom: 5px;

  ${media.lessThan("1023px")`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export const CPFUser = styled.p`
  color: #CCC;
  font-size: 12px;
`;

export const AngleUserMenu = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: var(--primary);
    fill: var(--primary);
  }
  
  ${media.lessThan("1023px")`
    padding-right: 15px;
  `}
`;