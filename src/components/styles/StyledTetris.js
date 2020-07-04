import styled from "styled-components";
import bgImage from "../../images/bg.png";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: block;
  background-color: coral;
  align-items: flex-start;
  padding: 15px;
  max-width: 400px;

  aside {
    width: 100%;
    display: block;
    padding: 5px;
    background-color: green;
  }
`;
