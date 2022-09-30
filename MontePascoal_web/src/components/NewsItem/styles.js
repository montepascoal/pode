import styled from 'styled-components';
import media from 'styled-query';

export const Container = styled.div`
  display: flex;
  flex: 0 0 33.333333%;
  width: 100%;
  margin-right: 30px;
  background: #FFF;
  border-radius: 5px;
  padding: 10px;
  overflow: hidden;

  a {
    flex-direction: column;
  }

  ${media.lessThan("1023px")`
    margin-right: 15px;
    flex: 0 0 50%;
  `}

  ${media.lessThan("767px")`
    margin-right: 10px;
    flex: 0 0 100%;
  `}
`;

export const Author = styled.h5`
  color: var(--primary);
  font-weight: 500;
  padding-bottom: 30px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const Image = styled.img`
  width: 100px;
  height: 50px;
`;

export const Resume = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  text-align: justify;
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;