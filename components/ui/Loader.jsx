import React from "react";
import styled, { keyframes } from "styled-components";
import pizzapie from "/assets/images/pizzapie.svg";

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  animation: ${rotate} 1s linear;
  animation-iteration-count: infinite;
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <Image src={pizzapie} alt="loading" />
    </LoaderWrapper>
  );
};

export default Loader;
