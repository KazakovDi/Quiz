import React from "react";
import styled from "styled-components";

const Devider = (props: any) => {
  return <Box {...props} />;
};

const Box = styled.div<any>`
  margin: ${(props) => props.margin};
`;
export default Devider;
