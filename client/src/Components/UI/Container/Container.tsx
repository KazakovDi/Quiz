import React from "react";
import styled from "styled-components";

const Container = (props: any) => {
  return <Box>{props.children}</Box>;
};

const Box = styled.div`
  margin: 0 5%;
`;
export default Container;
