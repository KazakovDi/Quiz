import React, { useState, useEffect } from "react";
import Flex from "../UI/Flex/Flex";
import styled from "styled-components";
import FormInput from "../UI/FormInput/FormInput";
import Button from "../UI/Button/Button";
import { blocked, calm, error, success } from "../Style/pallete";
import { IconPlus, IconX } from "@tabler/icons-react";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { QuestionTypes } from "../../types/quiztypes";
import Devider from "../UI/Devider/Devider";
import {
  changeQuestionType,
  changeTestAnswer,
  addAnswer,
  removeAnswerById,
  changeQuestionBody,
  changeAnswerBody,
  changeMultiTestAnswer,
  closeModal,
  submitQuestion,
} from "../../Redux/QuizSlice";
const QuestionModal = () => {
  const dispatch = useAppDispatch();
  const [bodyValue, setBodyValue] = useState<string>("");
  const [changingAnswer, setChangingAnswer] = useState<any>({ id: "" });
  const CurrentQuestion = useSelector(
    (state: RootState) => state.Quiz.CreatingQuestion
  );
  const answers = useSelector((state: RootState) => {
    if (state.Quiz.CreatingQuestion) return state.Quiz.CreatingQuestion.answers;
    else return [];
  });

  const ChangeTestAnswerHandler = (id: string) => {
    dispatch(changeTestAnswer(id));
  };
  const ChangeMultiAnswerHandler = (id: string) => {
    dispatch(changeMultiTestAnswer(id));
  };
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(changeQuestionBody(bodyValue));
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [bodyValue]);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(changeAnswerBody(changingAnswer));
      if (CurrentQuestion?.type === QuestionTypes.FULL)
        dispatch(addAnswer(changingAnswer));
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [changingAnswer]);
  if (!CurrentQuestion) return null;
  return (
    <ModalBackground>
      <ModalWrapper>
        <CanselButton
          variant="hollow"
          color={error}
          svgHeight="30px"
          svgWidth="30px"
          onClick={() => dispatch(closeModal())}
        >
          <IconX />
        </CanselButton>
        <Form>
          <Devider margin="20px 0 0 0" />
          <FormSectionHeading>Choose question type:</FormSectionHeading>
          <Devider margin="16px 0 0 0" />
          <TypeBox>
            <Flex align="center" justify="between">
              <Label htmlFor="test">Test</Label>
              <Button
                color={
                  CurrentQuestion.type === QuestionTypes.TEST ? "#fff" : calm
                }
                type="button"
                bgColor={
                  CurrentQuestion.type === QuestionTypes.TEST ? calm : "none"
                }
                variant={
                  CurrentQuestion.type === QuestionTypes.TEST
                    ? "filled"
                    : "outlined"
                }
                onClick={() => dispatch(changeQuestionType(QuestionTypes.TEST))}
              >
                select
              </Button>
            </Flex>

            <Flex align="center" justify="between">
              <Label htmlFor="multitest">Multitest</Label>
              <Button
                color={
                  CurrentQuestion.type === QuestionTypes.MULTI ? "#fff" : calm
                }
                type="button"
                bgColor={
                  CurrentQuestion.type === QuestionTypes.MULTI ? calm : "none"
                }
                variant={
                  CurrentQuestion.type === QuestionTypes.MULTI
                    ? "filled"
                    : "outlined"
                }
                onClick={() =>
                  dispatch(changeQuestionType(QuestionTypes.MULTI))
                }
              >
                select
              </Button>
            </Flex>

            <Flex align="center" justify="between">
              <Label htmlFor="full">Full answer</Label>
              <Button
                color={
                  CurrentQuestion.type === QuestionTypes.FULL ? "#fff" : calm
                }
                type="button"
                bgColor={
                  CurrentQuestion.type === QuestionTypes.FULL ? calm : "none"
                }
                variant={
                  CurrentQuestion.type === QuestionTypes.FULL
                    ? "filled"
                    : "outlined"
                }
                onClick={() => dispatch(changeQuestionType(QuestionTypes.FULL))}
              >
                select
              </Button>
            </Flex>
          </TypeBox>
          <Devider margin="20px 0 0 0" />

          <div>
            <FormSectionHeading>Type the question</FormSectionHeading>
            <Devider margin="16px 0 0 0" />
            <QuestionBody
              defaultValue={CurrentQuestion.questionBody}
              onChange={(e) => setBodyValue(e.target.value)}
              rows={4}
              maxLength={100}
              placeholder="Type the question (100 symbols)"
            />
          </div>
          {CurrentQuestion.type === QuestionTypes.FULL ? (
            <FormInput
              fullWidth
              placeholder="Type an answer (45 symbols)"
              maxLength={45}
              fontSize="20px"
              variant="underlined"
              required
              onChange={(e) => {
                setChangingAnswer({
                  body: e.target.value,
                  id: "" + Math.random(),
                  isCorrect: true,
                });
              }}
            />
          ) : (
            <div style={{ marginBottom: "60px" }}>
              <Devider margin="20px 0 0 0" />
              <Flex align="center">
                <FormSectionHeading>Add answers</FormSectionHeading>
                <Button
                  disabled={answers.length > 5}
                  onClick={() => dispatch(addAnswer(false as never))}
                  type="button"
                  variant="outlined"
                  svgHeight="20px"
                  svgWidth="20px"
                  hover
                  color={blocked}
                  style={{ marginLeft: "10px" }}
                >
                  <IconPlus />
                </Button>
              </Flex>

              <Devider margin="0 0 8px 0" />

              {answers.map((item) => {
                return (
                  <AnswerItem
                    isActive={item.isCorrect}
                    key={item.id}
                    align="center"
                    justify="between"
                  >
                    <FormInput
                      fullWidth
                      placeholder="Type an answer (45 symbols)"
                      maxLength={45}
                      fontSize="20px"
                      variant="underlined"
                      required
                      defaultValue={item.body}
                      onChange={(e) =>
                        setChangingAnswer({
                          body: e.target.value,
                          id: item.id,
                        })
                      }
                    />
                    <Flex>
                      <Button
                        color={item.isCorrect ? "#fff" : calm}
                        type="button"
                        bgColor={item.isCorrect ? calm : "none"}
                        variant={item.isCorrect ? "filled" : "outlined"}
                        onClick={() =>
                          CurrentQuestion.type === QuestionTypes.TEST
                            ? ChangeTestAnswerHandler(item.id)
                            : ChangeMultiAnswerHandler(item.id)
                        }
                      >
                        select
                      </Button>
                      <Button
                        color={"#fff"}
                        type="button"
                        bgColor={error}
                        variant="filled"
                        onClick={() => dispatch(removeAnswerById(item.id))}
                      >
                        delete
                      </Button>
                    </Flex>
                  </AnswerItem>
                );
              })}
            </div>
          )}

          <Flex justify="end">
            <Button
              fontSize={"22px"}
              color="#fff"
              bgColor={success}
              type="button"
              onClick={() => {
                dispatch(submitQuestion(CurrentQuestion));
                dispatch(closeModal());
              }}
            >
              Submit
            </Button>
          </Flex>
        </Form>
      </ModalWrapper>
    </ModalBackground>
  );
};
const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;
const Form = styled.form`
  padding: 5px 10px;
`;
const TypeBox = styled.div`
  width: fit-content;
  font-size: 20px;
  & > div {
    margin: 10px 0;
  }
`;
const Label = styled.label`
  cursor: pointer;
  user-select: none;
  margin-right: 10px;
`;
const AnswerItem = styled(Flex)<any>`
  margin: 20px 0;
  button {
    margin-left: 10px;
  }
  background-color: ${(props) => props.isActive && "rgba(4, 139, 230, 0.2)"};
`;
const FormSectionHeading = styled.h4`
  margin: 0;
  font-size: 24px;
`;
const QuestionBody = styled.textarea`
  font-size: 22px;
  padding-top: 5px;
  padding-left: 8px;
  width: 100%;
  box-sizing: border-box;
  resize: none;
`;
const ModalWrapper = styled.div`
  position: relative;
  border-radius: 5px;
  border: 2px solid #000;
  min-width: 500px;
  background-color: #fff;
  padding: 6px 10px;
`;

const CanselButton = styled(Button)`
  position: absolute;
  right: 5px;
  top: 5px;
`;
export default QuestionModal;
