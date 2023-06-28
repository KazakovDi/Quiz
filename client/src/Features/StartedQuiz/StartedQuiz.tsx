import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StartedQuiz = () => {
  return (
    <ActionScene>
      <Outlet />
    </ActionScene>
  );
};

const ActionScene = styled.div`
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  margin: 20px 5% 0 5%;
  padding: 20px 15px;
  height: 90vh;
`;
export default StartedQuiz;
