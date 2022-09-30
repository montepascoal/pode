import styled from 'styled-components';

export const ButtonOutline = styled.button`
  background: transparent;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 20px;
  border: 2px solid var(--${({color}) => color});
  color: var(--${({color}) => color});
  border-radius: 5px;
  padding: 8px 30px;
  transition: 0.5s;
  margin: 15px 0;

  &:hover {
    border: 2px solid var(--${({color}) => color}-hover);
    color: var(--${({color}) => color}-hover);
  }

`;