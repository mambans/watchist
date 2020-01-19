import React from "react";
import ReactLoading from "react-loading";
import { StyledLoadingContainer } from "./StyledComponents";

export default ({ text, fontSize }) => {
  return (
    <StyledLoadingContainer color={"rgb(50, 50, 50)"} fontSize={fontSize}>
      <ReactLoading type={"bars"} color={"rgb(50, 50, 50)"} height={200} width={200} />
      <h1>{text || "Loading.."}</h1>
    </StyledLoadingContainer>
  );
};
