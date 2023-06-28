import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/UI/Button/Button";
import { additional, calm } from "../../Components/Style/pallete";
import Flex from "../../Components/UI/Flex/Flex";
import { setAnswer } from "../../Redux/QuizSlice";
const Question = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { question } = useParams();
  const { id } = useParams();
  if (!question) navigate("/");
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const { questionBody, answers, type } = useSelector(
    (state: RootState) => state.Quiz.CurrentQuiz.questions[question as any]
  );
  console.log(answers);
  return (
    <>
      <pre>{questionBody}</pre>
      {answers.map((item, index) => {
        return (
          <Flex key={item.id}>
            {item.body === chosenAnswer ? (
              <Button
                onClick={() => setChosenAnswer(item.body)}
                variant="filled"
                color="#fff"
                bgColor={calm}
              >
                Choose
              </Button>
            ) : (
              <Button
                onClick={() => setChosenAnswer(item.body)}
                variant="outlined"
                color={calm}
              >
                Choose
              </Button>
            )}

            <pre>{item.body}</pre>
          </Flex>
        );
      })}
      <Flex justify="end">
        {Number(question) === answers.length - 1 ? (
          <Link to={`/start-quiz/${id}/results`}>
            <Button
              onClick={() => {
                dispatch(setAnswer(chosenAnswer));
                setChosenAnswer(null);
              }}
              disabled={chosenAnswer === null}
              variant="filled"
              color="#fff"
              bgColor={additional}
            >
              Next
            </Button>
          </Link>
        ) : (
          <Link to={`/start-quiz/${id}/${Number(question) + 1}`}>
            <Button
              onClick={() => {
                dispatch(setAnswer(chosenAnswer));
                setChosenAnswer(null);
              }}
              disabled={chosenAnswer === null}
              variant="filled"
              color="#fff"
              bgColor={additional}
            >
              Next
            </Button>
          </Link>
        )}
      </Flex>
    </>
  );
};

export default Question;
