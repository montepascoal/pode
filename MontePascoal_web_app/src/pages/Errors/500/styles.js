import styled from 'styled-components';
import media from 'styled-query';
import { FaFacebookSquare } from "react-icons/fa";

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-self: center;
`;

export const WrapperError = styled.div`
  margin: auto;
  text-align: center;
`;

export const CodeError = styled.h1`
  font-size: 250px;
  color: var(--primary);
  text-align: center;
  line-height: 190px;
  padding-bottom: 25px;

  ${media.between("320px", "480px")`
    font-size: 200px;
    line-height: 150px;
  `}
`;

export const Error = styled.h1`
  color: var(--text);
  text-align: center;
  font-size: 50px;
  font-weight: 500;

  ${media.between("320px", "480px")`
    font-size: 35px;
  `}
`;

export const Text = styled.p`
  font-size: 20px;
  color: var(--text);
  text-align: center;
  margin-top: 10px;

  ${media.between("320px", "480px")`
    font-size: 11px;
  `}
`;

export const WrapperContactSocial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 50px 10px 20px 10px;
`;

export const ContainerSocial = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: #CCC;
    color: #CCC;
    font-size: 25px;
  }

  ${media.between("768px", "1024px")`
    svg {
      font-size: 20px;
    }
  `}

  ${media.between("320px", "480px")`
    flex-direction: column;
  `}
`;

export const Social = styled.div`
  display: flex;
  align-items: center;
  
  a {
    margin-right: 15px;
  }

  ${media.between("320px", "480px")`
    margin-bottom: 10px;
  `}
`;

export const Phone = styled.div`
  display: flex;
  align-items: center;
`;

export const IconFacebook = styled(FaFacebookSquare)`
  background: #CCC;
  padding: 4px;
  fill: #FFF !important;
  color: #FFF !important;
`;

export const ContainerPhone = styled.div`
  display: flex;
  align-items: center;

  svg { 
    margin-right: 5px;
  }
`;

export const LabelPhone = styled.label`
  font-weight: bold;
  color: #CCC;
  cursor: pointer;
  margin-right: 0;

  ${media.between("768px", "1024px")`
    font-size: 11px;
  `}
`;

export const Line = styled.hr`
  border-right: 1px solid #CCC;
  margin: 0 25px;
  height: 15px;

  ${media.between("768px", "1024px")`
    margin: 0 10px;
  `}
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  ${media.lessThan("767px")`
    display: none;
  `}
`;

export const Image = styled.img`
  width: 100%;
  margin: auto;
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Logo = styled.img`
  width: 150px;
`;