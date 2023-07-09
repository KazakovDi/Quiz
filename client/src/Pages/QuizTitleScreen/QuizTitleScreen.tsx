import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../../Redux/store";
import {
  clearAnswers,
  clearResult,
  fetchQuizById,
} from "../../Redux/QuizSlice";
import { useSelector } from "react-redux";
import Flex from "../../Components/UI/Flex/Flex";
import Button from "../../Components/UI/Button/Button";
import { additional } from "../../Components/Style/pallete";
import GoBackBtn from "../../Components/GoBackBtn/GoBackBtn";
import styled from "styled-components";
const QuizTitleScreen = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearAnswers());
    dispatch(clearResult());
    if (id) dispatch(fetchQuizById(id));
  }, []);

  const { title, description, cover, _id, questions } = useSelector(
    (state: RootState) => state.Quiz.CurrentQuiz
  );
  return (
    <Flex direction="column">
      <Flex align="center">
        <GoBackBtn />
        <h1>{title}</h1>
      </Flex>
      {cover ? (
        <Cover
          width="100%"
          height="600px"
          src={`http://localhost:5000${cover}`}
          alt="cover image"
        />
      ) : (
        <Cover width="100%" src="http://localhost:3000/Quiza.png" />
      )}
      <pre>{description}</pre>
      <Flex align="center" justify="between">
        <p>Questions count: {questions.length}</p>
        <Link to={"0"}>
          <Button variant="filled" color="#fff" bgColor={additional}>
            Start
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

const Cover = styled.img`
  width: 100%;
  height: 600px;
`;
export default QuizTitleScreen;
