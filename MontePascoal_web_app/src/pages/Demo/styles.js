import styled from 'styled-components';
import media from 'styled-query';
import { FaAngleRight } from "react-icons/fa";
import { BsTriangleFill } from "react-icons/bs";

export const Container = styled.div`
  width: 100%;
  padding: 0 15px 0 15px;
  margin: 15px auto 100px auto;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: var(--white);
  padding: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const Col = styled.div`
  flex: ${props => props.flex};
  padding: 15px;
  text-align: ${props => props.align};
`;

export const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;

export const ContainerTypography = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: var(--white);

  ${media.lessThan("medium")`
    grid-template-columns: 1fr;
  `}
`;

export const BoxTypography = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--white);
  padding: 25px 15px;
  margin: 0 35px;

  ${media.lessThan("medium")`
    align-items: center;
    margin: 0;
    padding: 25px 0;
  `}
`;

export const BoxTypographyBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  background: var(--primary);
  max-width: 300px;
  width: 100%;
  margin-top: 25px;
  border-radius: 5px;
  padding-top: 25px;
  padding-bottom: 25px;

  ${media.lessThan("medium")`
    align-self: center;
  `}
`;

export const h6Typography = styled.h6`
  color: var(--text);
`;
  
export const spanTypography = styled.span`
  color: var(--text);
`;

export const sizeTypography = styled.span`
  font-size: 25px;
  color: var(--white);
  text-decoration: underline;
`;

export const ContainerColor = styled.div`
  display: flex;
  justify-content: center;
  background: var(--white);

  ${media.lessThan("767px")`
    flex-direction: column;
    align-items: center;
  `}
`;

export const BoxColor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--primary);
  color: var(--white);
  margin: 35px 35px 5px 35px;
  text-align: center;
  max-width: 350px;
  width: 100%;
  height: 250px;

  ${media.lessThan("medium")`
    max-width: 300px;
    margin: 20px 5px 0px 5px;
  `}

  ${media.between("medium", "large")`
      margin: 20px 5px 0px 5px;
  `}
`;

export const BlockContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export const BlockVariations = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 35px;
`;

const variantStudent = {
  '0':'#791712', '1':'#8E1915', '2':'#A81A15', '3': 'var(--red)', '4': '#D01F1F'
};

export const ColorsStudent = styled.div`
  background: ${props => variantStudent[props.scale]};
`;

const variantTeacher = {
  '0':'#004F7A', '1':'#005787', '2':'#006092', '3': 'var(--blue)', '4': '#007BB6'
};

export const ColorsTeacher = styled.div`
  background: ${props => variantTeacher[props.scale]};
`;

const variantAdmin = {
  '0':'#007C70', '1':'#00877B', '2':'#009286', '3': 'var(--green)', '4': '#00B4A8'
};

export const ColorsAdmin = styled.div`
  background: ${props => variantAdmin[props.scale]};
`;

export const HexColor = styled.div`
  color: var(--text);
  text-align: center;
  padding: 0 15px;
  margin: 0 35px 0 35px;
  max-width: 350px;
  width: 100%;

  ${media.lessThan("medium")`
    display: none;
  `}
`;

export const HexColorMobile = styled.div`
  color: var(--text);
  text-align: center;
  padding: 0 15px;
  margin: 5px 35px 0 35px;
  max-width: 350px;
  width: 100%;

  ${media.greaterThan("medium")`
    display: none;
  `}
`;

export const ContainerSmallColor = styled.div`
  display: flex;
  justify-content: center;
  background: var(--white);

  ${media.lessThan("767px")`
    flex-direction: column;
    align-items: center;
  `}
`;

export const ContainerMediumColor = styled.div`
  display: flex;
  justify-content: center;
  background: var(--white);

  ${media.lessThan("767px")`
    flex-direction: column;
    align-items: center;
  `}
`;

export const BoxColorMedium = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--primary);
  color: var(--white);
  margin: 35px 35px 5px 35px;
  text-align: center;
  max-width: 160px;
  width: 100%;
  height: 110px;

  ${media.lessThan("medium")`
    max-width: 300px;
    margin: 20px 5px 0px 5px;
    height: 250px;
  `}
`;

export const BlockVariationsMedium = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 30px;
`;

const variantError = {
  '0':'#B22C2B', '1':'#C32E2E', '2':'#EE3E40'
};

export const ColorsError = styled.div`
  background: ${props => variantError[props.scale]};
`;

const variantWarning = {
  '0':'#FF9D0A', '1':'#FBB300', '2':'#FFCF2C'
};

export const ColorsWarning = styled.div`
  background: ${props => variantWarning[props.scale]};
`;

const variantSuccess = {
  '0':'#008634', '1':'#009038', '2':'#00C150'
};

export const ColorsSuccess = styled.div`
  background: ${props => variantSuccess[props.scale]};
`;

export const HexColorMedium = styled.div`
  color: var(--text);
  text-align: center;
  margin: 0 35px 0 35px;
  max-width: 160px;
  width: 100%;

  ${media.lessThan("medium")`
    display: none;
  `}
`;

export const HexColorMediumMobile = styled.div`
  color: var(--text);
  text-align: center;
  margin: 0 35px 0 35px;
  max-width: 160px;
  width: 100%;

  ${media.greaterThan("medium")`
    display: none;
  `}
`;

export const ContainerButtonsIcons = styled.div`
  display: flex;
  justify-content: space-around;
  background: var(--white);
  padding: 25px 40px;

  svg {
    margin: 15px 28px;
  }

  ${media.lessThan("medium")`
    flex-direction: column;
    padding: 25px 20px;

    svg {
      margin: 15px 20px;
      width: 20px;
      height: 20px;
    }
  `}
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    margin: 25px 0;
  }

  ${media.lessThan("medium")`
    margin-bottom: 15px;
  `}
`;

export const ContainerIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ContainerInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--white);
  padding: 15px 35px;

  & > div > div { 
    margin: 10px 25px 0 0;
  }

  ${media.lessThan("medium")`
    grid-template-columns: 1fr;
    padding: 15px 0;

    & > div > div { 
      margin: 10px 0 0 0;
    }
  `}

  ${media.between("medium", "large")`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

export const ContainerInputsTest = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #f7f7f791;
  padding: 15px 35px;


  & > div > div { 
    margin: 10px 25px 0 0;
  }

  ${media.lessThan("medium")`
    grid-template-columns: 1fr;
    padding: 15px 0;

    & > div > div { 
      margin: 10px 0 0 0;
    }
  `}

  ${media.between("medium", "large")`
    grid-template-columns: repeat(2, 1fr);
  `}
`;

export const ContainerSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 35px;


  & > div > div { 
    margin: 10px 25px 0 0;
  }

  ${media.lessThan("medium")`
    grid-template-columns: 1fr;
    padding: 15px 0;

    & > div > div { 
      margin: 10px 0 0 0;
    }
  `}
`;

export const ContainerCheckRadio = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 35px;

  ${media.lessThan("medium")`
    grid-template-columns: 1fr;
    padding-top: 15px;
  `}
`;

export const BoxRadio = styled.div`
  display: flex;
  flex-direction: column;
  float: left;

  & > div:first-child { 
    padding-bottom: 25px;
  }

  ${media.lessThan("medium")`
    & > div {
      justify-content: center;
      margin: 0;
    }

    & > div:first-child { 
      padding-bottom: 15px;
    }

    & > div:last-child { 
      padding-bottom: 15px;
    }

  `}
`;

export const Topics = styled.h6`
  color: var(--text);
  margin-top: 25px;
  margin-bottom: 5px;
  background: var(--white);
  padding: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Text = styled.p`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  font-size: 12px;
  font-weight: 300;
  color: var(--white);
`;

export const TitleH1 = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: var(--white);
  text-align: start;
  padding: 5px 15px;
  margin: 0;
`;

export const TitleH2 = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: var(--white);
  text-align: start;
  padding: 5px 15px;
  margin: 0;
`;

export const TitleH3 = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: var(--white);
  text-align: start;
  padding: 5px 15px;
  margin: 0;
`;

export const TitleH6 = styled.h6`
  color: var(--white);
  margin-bottom: 5px;
`;

export const BigTitle = styled.h1`
  font-size: 250px;
  line-height: 200px;
  color: var(--text);
`;

export const BigText = styled.p`
  font-size: 250px;
  line-height: 220px;
  color: var(--text);
`;

export const Label = styled.label`
  font-weight: bold;
  color: var(--text);
  font-size: 14px;
  margin-bottom: 10px;
`;

export const IconArrowRight = styled(FaAngleRight)`
  color: var(--primary);
`;

export const IconTriangle = styled(BsTriangleFill)`
  color: var(--primary);
  margin-top: '-40px';
  margin-left: '40px';
  color: 'var(--primary)';
`;

export const Line = styled.hr`
  display: block;
  border: 0;
  border-top: 1px solid var(--gray-line);
  padding: 0 15px;
  margin: 20px 0;
`;