import React, { useEffect } from "react";

import Header from "../../Features/Header/Header";
import Footer from "../../Features/Footer/Footer";
import QuizesScreen from "../../Features/QuizesScreen/QuizesScreen";
import Sidebar from "../../Features/Sidebar/Sidebar";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { fetchQuizes } from "../../Redux/QuizSlice";
import SearchInput from "../../Features/SearchInput/SearchInput";
import Flex from "../../Components/UI/Flex/Flex";
const Main = () => {
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.Quiz.Quizes);
  useEffect(() => {
    dispatch(fetchQuizes());
  }, []);
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
