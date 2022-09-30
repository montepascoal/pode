import styled from 'styled-components';
import media from 'styled-query';
import { FaFacebookSquare } from "react-icons/fa";

export const Container = styled.div`
  display: flex;

  ${media.lessThan("767px")`
    flex-direction: column;
  `}
`;

export const WrapperImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 65%;
  width: 100%;

  ${media.greaterThan("huge")`
    max-width: 80%;
  `}

  ${media.between("1024px", "1440px")`
    max-width: 75%;
  `}

  ${media.lessThan("767px")`
    max-width: 100%;
  `}
`;

export const Image = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100vh;

  ${media.lessThan("1023px")`
    display: none;
  `}
`;

export const ImageTablet = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100vh;
  display: none;

  ${media.between("768px", "1023px")`
    display: block;
  `}
`;

export const ImageMobile = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100vh;
  display: none;

  ${media.lessThan("767px")`
    display: block;
  `}
`;

export const WrapperBullets = styled.div`
  display: flex;
  position: absolute;
  bottom: 15px;

  ${media.lessThan("767px")`
    display: none;
  `}
`;

export const Bullet = styled.div`
  width: 10px;
  height: 10px;
  background: #FFF;
  border-radius: 50%;
  margin: 0 3px;
`;

export const BulletActive = styled.div`
  width: 20px;
  height: 10px;
  background: #FFF;
  border-radius: 25%;
  margin: 0 3px;
`;

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 45%;
  left: 68%;
  transform: translate(-50%, -50%);
  padding: 50px;
  background: var(--white);
  box-shadow: 0px 0px 0px var(--gray-line), 0px 0px 10px var(--gray-line);
  border-radius: 10px;
  max-width: 450px;
  width: 100%;

  ${media.greaterThan("huge")`
    left: 80%;
  `}

  ${media.between("1024px", "1440px")`
    left: 75%;
  `}

  ${media.between("481px", "767px")`
    top: 45%;
    left: 50%;
    max-width: 430px;
    padding: 25px;
  `}

  ${media.between("320px", "480px")`
    top: 45%;
    left: 50%;
    max-width: 300px;
    padding: 25px;
  `}

`;

export const Title = styled.h2`
  text-align: center;

  ${media.between("320px", "480px")`
    font-size: 35px;
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  input {
    padding: 15px 40px 15px 10px;
  }

  ${media.between("481px", "767px")`
    max-width: 85%;
  `}

  ${media.between("320px", "480px")`
    max-width: 250px;
  `}
`;

export const RememberResetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;

  ${media.lessThan("767px")`
    label, a {
      font-size: 12px;
    }
  `}
`;

export const WrapperContactSocial = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  max-width: 35%;
  width: 100%;
  padding: 10px;

  ${media.greaterThan("huge")`
    max-width: 20%;
  `}

  ${media.between("1024px", "1440px")`
    max-width: 25%;
  `}

  ${media.between("481px", "767px")`
    max-width: 450px;
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translateX(-50%);
  `}

  ${media.between("320px", "480px")`
    max-width: 85%;
    position: absolute;
    top: 85%;
    left: 10%;
  `}
`;

export const WrapperContact = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    margin-right: 15px;
  }
  
  svg {
    fill: #CCC;
    color: #CCC;
    margin-right: 5px;
  }

  ${media.between("1024px", "1440px")`
    a {
      margin-right: 5px;
    }
  `}

  ${media.lessThan("1023px")`
    a {
      margin-right: 10px;
    }
  `}

  ${media.between("481px", "767px")`
    a {
      margin-right: 25px;
    }
  `}

  ${media.lessThan("767px")`
    svg { 
      fill: #FFF;
      color: #FFF;
    }
  `}
`;

export const ContainerPhone = styled.div`
  display: flex;
`;

export const LabelPhone = styled.label`
  font-weight: bold;
  color: #CCC;
  cursor: pointer;

  ${media.lessThan("767px")`
    color: #FFF;
  `}
`;

export const WrapperSocial = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 25px;

  a {
    margin-right: 10px;
  }

  svg {
    fill: #CCC;
    color: #CCC;
    font-size: 30px;
  }

  ${media.lessThan("767px")`
    svg {
      fill: #FFF;
      color: #FFF;
      font-size: 25px;
    }
  `}
`;

export const LogoSocial = styled.img`
  width: 100px;

  ${media.lessThan("1023px")`
    display: none;
  `}
`;

export const LogoSocialMobile = styled.img`
  width: 100px;
  display: none;

  ${media.lessThan("1023px")`
    display: block;
  `}
`;

export const IconFacebook = styled(FaFacebookSquare)`
  background: #CCC;
  padding: 4px;
  fill: #FFF !important;
  color: #FFF !important;

  ${media.lessThan("767px")`
    background: #FFF;
    padding: 3px;
    fill: var(--primary) !important;
    color: var(--primary) !important;
  `}
`;