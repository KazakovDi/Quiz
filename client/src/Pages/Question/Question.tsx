import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/UI/Button/Button";
import { additional, calm } from "../../Components/Style/pallete";
import Flex from "../../Components/UI/Flex/Flex";
import { setAnswer } from "../../Redux/QuizSlice";
import ProgressBar from "../../Features/ProgressBar/ProgressBar";
import { QuestionTypes } from "../../types/quiztypes";
import FormInput from "../../Components/UI/FormInput/FormInput";
const Question = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { question } = useParams();
  const { id } = useParams();
  if (!question) navigate("/");
  const [choosenAnswers, setChosenAnswer] = useState<string[]>([]);
  const [fullAnswer, setFullAnswer] = useState<string>("");
  const { questionBody, answers, type } = useSelector(
    (state: RootState) => state.Quiz.CurrentQuiz.questions[question as any]
  );
  const questions = useSelector(
    (state: RootState) => state.Quiz.CurrentQuiz.questions
  );
  const ChooseAnswer = (id: string) => {
    if (type === QuestionTypes.TEST) {
      setChosenAnswer((prevState) => [...prevState, id]);
    } else if (type === QuestionTypes.MULTI) {
      const index = choosenAnswers.findIndex((value) => value === id);
      if (index === -1) {
        setChosenAnswer((prevState) => [...prevState, id]);
      } else {
        console.log(choosenAnswers.slice(index, 1));
      }
    }
  };

  const SubmitAnswer = () => {
    if (type === QuestionTypes.FULL) {
      dispatch(setAnswer([fullAnswer]));
      setChosenAnswer([]);
    } else {
      dispatch(setAnswer(choosenAnswers));
      setChosenAnswer([]);
    }
  };
  return (
    <>
      <ProgressBar prog={question} max={questions.length} />
      <pre>{questionBody}</pre>
      {type === QuestionTypes.FULL ? (
        <FormInput
          variant="underlined"
          onChange={(e) => setFullAnswer(e.target.value)}
          value={fullAnswer}
        />
      ) : (
        <>
          {answers.map((item, index) => {
            return (
              <Flex key={item.id}>
                {choosenAnswers.findIndex((value) => value === item.body) >
                -1 ? (
                  <Button
                    onClick={() => ChooseAnswer(item.id)}
                    variant="filled"
                    color="#fff"
                    bgColor={calm}
                  >
                    Choose
                  </Button>
                ) : (
                  <Button
                    onClick={() => ChooseAnswer(item.id)}
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
        </>
      )}
      <Flex justify="end">
        {Number(question) === questions.length - 1 ? (
          <Link to={`/start-quiz/${id}/results`}>
            <Button
              onClick={SubmitAnswer}
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
              onClick={SubmitAnswer}
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
