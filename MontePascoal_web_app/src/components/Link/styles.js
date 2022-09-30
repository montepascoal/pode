import { Link as oLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(oLink)`
  color: var(--${({color}) => color});
  cursor: pointer;
  /*margin: 25px 0;*/
  transition: color 0.5s;

  svg {
    fill: var(--${({color}) => color});
    color: var(--${({color}) => color});
  }
  
  &:hover {
    color: var(--${({color}) => color}-hover);
    transition: color 0.5s;
  }

`;

export const Anchor = styled.a`
  color: var(--${({color}) => color});
  cursor: pointer;
  transition: color 0.5s;

  svg {
    fill: var(--${({color}) => color});
    color: var(--${({color}) => color});
  }

  &:hover {
    color: var(--${({color}) => color}-hover);
    transition: color 0.5s;
  }

`;