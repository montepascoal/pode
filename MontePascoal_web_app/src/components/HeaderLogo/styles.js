import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  flex-grow: 11;
  justify-content: space-between;
  background: var(--primary);
  height: 100%;
`;

export const WrapperLogo = styled.div`
  display: flex;
  align-items: center;
  max-width: 250px;
  width: 100%;
  padding: 15px 30px;

  ${media.lessThan("480px")`
    padding: 15px;
  `}
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
`;