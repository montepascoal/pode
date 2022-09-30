import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  max-height: 80px;
  height: 100%;
  background: #F3C1C0;

  ${media.between("768px", "1023px")`
    min-height: 70px;
    max-height: 70px;
  `}

  ${media.lessThan("767px")`
    min-height: 60px;
    max-height: 60px;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const WrapperBreadcrumb = styled.div`
  display: flex;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
`;

export const Breadcrumb = styled.div`
  display: flex;
  justify-content: center;
  background: #C7FDCC;
  min-height: 45px;
  max-height: 45px;
  height: 100%;

  ${media.between("768px", "1023px")`
    min-height: 40px;
    max-height: 40px;
  `}

  ${media.lessThan("767px")`
    min-height: 35px;
    max-height: 35px;
  `}
`;

export const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FCFCC6;
  min-width: 45px;
  max-width: 45px;
  width: 100%;
`;

export const WrapperPage = styled.div`
  overflow: auto;
  height: 100vh;
  width: 100%;
`;

export const Title = styled.h2`
  ${media.between("768px", "1023px")`
    font-size: 35px;
  `}

  ${media.lessThan("767px")`
    font-size: 30px;
  `}
`;

export const TitleVertical = styled.h2`
  writing-mode: vertical-rl;
  font-size: 30px;

  ${media.between("768px", "1023px")`
    font-size: 35px;
  `}

  ${media.lessThan("767px")`
    font-size: 25px;
  `}
`;