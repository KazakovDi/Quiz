import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
const Question = () => {
  const navigate = useNavigate();
  const { answer } = useParams();
  if (!answer) navigate("/");
  const QuestionItem = useSelector(
    (state: RootState) => state.Quiz.CurrentQuiz.questions[answer as any]
  );
  console.log(QuestionItem);
  return <div>Question</div>;
};

export default Question;
