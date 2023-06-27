import React from "react";
import styled from "styled-components";
import SimpleLink from "../UI/SimpleLink/SimpleLink";
import Flex from "../UI/Flex/Flex";
import { QuizProps } from "../../types/quiztypes";

const QuizListItem = ({ cover, title, quizDescription, _id }: QuizProps) => {
  return (
    <QuizCard>
      {!cover ? (
        <img
          width="300px"
          height="200px"
          src={"http://localhost:3000/Quiza.png"}
        />
      ) : (
        <img src={cover} />
      )}
      <Heading>{title}</Heading>
      <Description>{quizDescription}</Description>
      <Flex justify="end">
        <SimpleLink to={`/${_id}`}>Start</SimpleLink>
      </Flex>
    </QuizCard>
  );
};

const QuizCard = styled.article`
  background-color: #fff;
  max-width: 300px;
  padding: 0px 15px 15px 10px;
`;

const Heading = styled.h3`
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  text-align: justify;
  box-orient: vertical;
  height: 60px;
  width: 300px;
  &:first-letter {
    text-transform: capitalize;
  }
`;
export default QuizListItem;
