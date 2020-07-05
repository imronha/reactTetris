import React from "react";
import Cell from "../Cell/Cell";
import { StyledNext } from "../styles/StyledNext";

const Next = ({ next }) => (
  <StyledNext width={4} height={4}>
    {next.map((row) => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledNext>
);

export default Next;
