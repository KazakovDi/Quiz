import React from "react";
import { AnswerProps } from "../../types/quiztypes";
import Flex from "../UI/Flex/Flex";

const AnswerTestItem = ({ isCorrect, body, id }: AnswerProps) => {
  return (
    <Flex align="center" justify="between">
      <label>AnswerTestItem</label>
    </Flex>
  );
};

export default AnswerTestItem;
