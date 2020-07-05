import styled from "styled-components";

export const StyledNext = styled.div`
  display: grid;
  min-height: 100%;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(20vw / ${(props) => props.width})
  );
  grid-template-columns: repeat(${(props) => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  max-width: 20vw;
  background: #111;
  margin: auto;
  margin-bottom: 10px;
  width: 100%;
`;
