import styled from "styled-components";

export const StyledDisplayWrapper = styled.div`
  display: block;
  justify-items: center;
  margin: auto;
  width: 100%;
`;

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: block;
  justify-items: right;
  align-items: center;
  margin: auto;
  margin-bottom: 5px;
  padding: 20px;
  border: 4px solid #4d2d5f;
  min-height: 20px;
  max-width: 100%;
  width: 50%;
  border-radius: 20px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #20214c;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
