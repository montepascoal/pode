import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #DCDDE0;
  width: 100%;
  height: 100%;
`;

export const WrapperAngleLeft = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;

  svg {
    font-size: 35px;
    color: #FFF;
    fill: #FFF;
    opacity: .5;
    transition: opacity .15s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

export const WrapperAngleRight = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;

  svg {
    font-size: 35px;
    color: #FFF;
    fill: #FFF;
    opacity: .5;
    transition: opacity .15s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

export const WrapperBullets = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  right: 0;
  bottom: 0;
  left: 0;
  margin-bottom: 15px;

  ${media.lessThan("767px")`
    display: none;
  `}
`;

export const Bullet = styled.div`
  width: 10px;
  height: 10px;
  background: #EFEFEF;
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

export const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 0;
  padding-top: 39.41%;
  background-image: url(${({slides}) => slides.imgDesktop });
  background-size: contain;
  background-repeat: no-repeat;

  ${media.lessThan("1023px")`
    //height: 700px;
    padding-top: 95.05%;
    background-image: url(${({slides}) => slides.imgTablet });
  `}

  ${media.lessThan("767px")`
    //height: 190px;
    padding-top: 52.50%;
    background-image: url(${({slides}) => slides.imgMobile });
  `}
`;

export const Item = styled.img`
  width: 100%;
  height: 100%;
`;