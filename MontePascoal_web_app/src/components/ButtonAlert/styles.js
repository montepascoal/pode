import styled from "styled-components";

export const Button = styled.button`
  background: #F0C44F;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: fit-content;
  transition: .5s;

  p {
    font-size: 14px;
    padding: 10px 16px;
    color: var(--white);
    width: 100%;
    font-family: 'Roboto', sans-serif;
  }

  div {
    height: 100%;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #CBA644;

    svg {
      color: #E5D29C;
      width: 18px;
      height: 18px;
    }
  }

  &:hover {
    filter: brightness(1.07); 
  }
`;