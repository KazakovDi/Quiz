import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { calculateResult } from "../../Redux/QuizSlice";
import { Link } from "react-router-dom";
import Button from "../../Components/UI/Button/Button";
import { calm } from "../../Components/Style/pallete";
import ProgressBar from "../../Features/ProgressBar/ProgressBar";

const QuizResults = () => {
  const dispatch = useAppDispatch();
  const Result = useSelector((state: RootState) => state.Quiz.Result);
  const Answers = useSelector((state: RootState) => state.Quiz.Answers);
  useEffect(() => {
    dispatch(calculateResult());
  }, []);
  return (
    <div>
      <ProgressBar prog={1} max={1} />
      {Result}/{Answers.length}
      <Link to="/">
        <Button variant="filled" color="#fff" bgColor={calm}>
          Return
        </Button>
      </Link>
    </div>
  );
};

export default QuizResults;
