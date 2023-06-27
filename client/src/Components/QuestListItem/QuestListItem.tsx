import React from "react";
import styled from "styled-components";
import Flex from "../UI/Flex/Flex";
import Button from "../UI/Button/Button";
import { IconTrashX, IconPencil } from "@tabler/icons-react";
import { error, calm } from "../Style/pallete";
import { QuiestionProps } from "../../types/quiztypes";
import { useAppDispatch } from "../../Redux/store";
import { deleteQuestion, editModal } from "../../Redux/QuizSlice";
const QuestListItem = ({ id, type, questionBody, answers }: QuiestionProps) => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper>
      <InfoContainer>
        <h3>{questionBody ? questionBody : "No question yet"}</h3>
        <p>
          type: {type}, answers count: {answers.length}
        </p>
      </InfoContainer>
      <Controls justify="around">
        <Button
          onClick={() => {
            dispatch(editModal({ id, type, questionBody, answers }));
          }}
          svgHeight="40px"
          svgWidth="40px"
          bgColor={calm}
          color="#fff"
          type="button"
        >
          <IconPencil />
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteQuestion(id));
          }}
          svgHeight="40px"
          svgWidth="40px"
          bgColor={error}
          color="#fff"
          type="button"
        >
          <IconTrashX />
        </Button>
      </Controls>
    </Wrapper>
  );
};

const InfoContainer = styled.div`
  h3 {
    font-size: 30px;
  }
  p {
    font-size: 24px;
  }
`;
const Controls = styled(Flex)`
  button:last-child {
    margin-left: 10px;
  }
`;
const Wrapper = styled.div`
  padding: 0 10px;
  border-bottom: 1px solid gray;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default QuestListItem;
