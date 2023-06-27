import React from "react";
import QuizListItem from "../../Components/QuizListItem/QuizListItem";
import Flex from "../../Components/UI/Flex/Flex";
import styled from "styled-components";
import { QuizProps } from "../../types/quiztypes";
const QuizesScreen = ({ data }: { data: QuizProps[] }) => {
  return (
    <Wrapper>
      <Flex wrap="wrap" justify="around">
        {data.map((item) => {
          console.log(item);
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
