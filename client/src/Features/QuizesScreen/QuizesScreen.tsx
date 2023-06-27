import React from "react";
import { QuizItemParams } from "../../Components/QuizListItem/QuizListItem";
import QuizListItem from "../../Components/QuizListItem/QuizListItem";
import Flex from "../../Components/UI/Flex/Flex";
import styled from "styled-components";
const QuizesScreen = ({ data }: { data: QuizItemParams[] }) => {
  return (
    <Wrapper>
      <Flex wrap="wrap" justify="around">
        {data.map((item) => {
          return <QuizListItem {...item} />;
        })}
      </Flex>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 60%;
  border: 1px solid #000;
  padding: 5px 15px;
`;
export default QuizesScreen;
