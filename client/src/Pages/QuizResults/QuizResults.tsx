import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { calculateResult } from "../../Redux/QuizSlice";

const QuizResults = () => {
  const dispatch = useAppDispatch();
  const Result = useSelector((state: RootState) => state.Quiz.Result);
  const Answers = useSelector((state: RootState) => state.Quiz.Answers);
  useEffect(() => {
    dispatch(calculateResult());
  }, []);
  return (
    <div>
      {Result}/{Answers.length}
    </div>
  );
};

export default QuizResults;
