import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  margin-bottom: 10px;
  text-align: justify;
`;

export const ContainerSlider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #DCDDE0;
  width: 100%;
  height: 517px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: #CCC;
  padding: 25px 25px 150px 25px;

  ${media.lessThan("1023px")`
    flex-direction: column;
  `}
`;

export const ContainerNews = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 300px;

  ${media.lessThan("1023px")`
    flex-direction: column;
    height: auto;
  `}
`;

export const BoxNew = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 350px;
  width: 100%;
  height: 150px;
  margin-right: 30px;
  background: #DCDDE0;

  ${media.greaterThan("1920px")`
    max-width: 100%;
    width: 100%;
    flex-grow: 1;
  `}

  ${media.lessThan("1023px")`
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 30px;
  `}
`;

export const ContainerCalendar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  margin: 50px 0;
`;

export const Title = styled.h2`
  ${media.between("768px", "1023px")`
    font-size: 35px;
  `}

  ${media.lessThan("767px")`
    font-size: 30px;
  `}
`;