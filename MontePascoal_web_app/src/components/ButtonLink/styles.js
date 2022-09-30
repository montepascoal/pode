import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled(Link)`
  background: var(--${({ color }) => color});
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--white);
  border: 0;
  border-radius: 5px;
  padding: 8px 30px;
  transition: 0.5s;
  margin: 15px 0;

  &:hover {
    background: var(--${({ color }) => color}-hover);
  }

  &:disabled {
    opacity: 0.6;
  }
`;
