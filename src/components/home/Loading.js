import React from "react";
// import FadeIn from "react-fade-in";
// import Lottie from "react-lottie";
import ReactLoading from "react-loading";
// import "bootstrap/dist/css/bootstrap.css";
import { StyledLoadingContainer } from "./StyledComponents";

export default () => {
  return (
    <StyledLoadingContainer>
      <ReactLoading type={"bars"} color={"#ffffff"} height={200} width={200} />
      <h1>Loading..</h1>
    </StyledLoadingContainer>
  );
};
