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
  align-items: flex-start;
  max-width: 600px;
  margin: auto;
  width: 100%;
`;

// aside {
//   width: 100%;
//   display: inline-block;
//   padding: 5px;
// }
