import React from "react";
import styled from "styled-components";
import { success } from "../../Components/Style/pallete";

const ProgressBar = (props: any) => {
  return (
    <ProgressBarWrapper>
      <Progress {...props} />
    </ProgressBarWrapper>
  );
};
const ProgressBarWrapper = styled.div`
  border: 1px solid #000;
  width: 100%;
  height: 10px;
  border-radius: 3px;
  position: relative;
`;
const Progress = styled.div<any>`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: ${success};
  height: 100%;
  width: ${(props) => (props.prog * 100) / props.max}%;
`;
export default ProgressBar;
