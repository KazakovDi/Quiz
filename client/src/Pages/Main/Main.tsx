import React from "react";

import Header from "../../Features/Header/Header";
import Footer from "../../Features/Footer/Footer";
import QuizesScreen from "../../Features/QuizesScreen/QuizesScreen";
import Sidebar from "../../Features/Sidebar/Sidebar";
import styled from "styled-components";
const data = [
  {
    preview: "",
    heading: "test",
    description: "some description here",
    anchor: "/",
  },
  {
    preview: "",
    heading: "test 2",
    description: "some description here 2",
    anchor: "/",
  },
  // {
  //   preview: "",
  //   heading: "test 3",
  //   description: "some description here 3",
  //   anchor: "/",
  // },
];
const Main = () => {
  return (
    <Wrapper>
      <Header />
      <MainBlock>
        <Sidebar />
        <QuizesScreen data={data} />
      </MainBlock>
      <Footer />
    </Wrapper>
  );
};
const MainBlock = styled.main`
  display: flex;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;
export default Main;
