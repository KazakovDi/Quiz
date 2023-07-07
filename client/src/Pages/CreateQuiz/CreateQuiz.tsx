import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import FormInput from "../../Components/UI/FormInput/FormInput";
import QuestListItem from "../../Components/QuestListItem/QuestListItem";
import Button from "../../Components/UI/Button/Button";
import { IconPlus } from "@tabler/icons-react";
import { error, calm, disabled, success } from "../../Components/Style/pallete";
import QuestionModal from "../../Components/QuestionModal/QuestionModal";
import { RootState, useAppDispatch } from "../../Redux/store";
import { useSelector } from "react-redux";
import { addQuestion, editModal, fetchCreateQuiz } from "../../Redux/QuizSlice";
import Flex from "../../Components/UI/Flex/Flex";
import styled from "styled-components";
import Devider from "../../Components/UI/Devider/Devider";
import GoBackBtn from "../../Components/GoBackBtn/GoBackBtn";
import { QuizProps } from "../../types/quiztypes";
import { clearCreatingQuiz } from "../../Redux/QuizSlice";
const CreateQuiz = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>();
  const questions = useSelector(
    (state: RootState) => state.Quiz.CreatingQuiz.questions
  );
  const dispatch = useAppDispatch();

  const HandleSubmit = (values: any) => {
    const newQuiz: QuizProps = { ...values };
    newQuiz.cover = "";
    newQuiz.questions = [...questions];
    dispatch(fetchCreateQuiz(newQuiz));
    dispatch(clearCreatingQuiz());
  };
  return (
    <FormWrapper align="center" justify="center">
      <GoBackBtn variant="hollow" color={calm} absolute top="5px" left="5px" />
      <Form onSubmit={handleSubmit(HandleSubmit)}>
        <Flex direction="column">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <FormInput
                {...field}
                label="Quiz tittle"
                fontSize="36px"
                variant="underlined"
                placeholder="Input quiz title here"
                radius="5px"
                required
                fullWidth
              />
            )}
          />
          <Devider margin={"20px 0 0 0"} />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Input your quiz description (optional)</Label>
                <Devider margin={"5px 0 0 0"} />
                <Description
                  id="description"
                  {...field}
                  rows={4}
                  maxLength={150}
                  placeholder="Type the question (150 symbols)"
                />
              </div>
            )}
          />
        </Flex>
        <Devider margin={"20px 0 0 0"} />
        <Flex direction="column">
          <Flex align="center">
            <Heading>Add new question</Heading>
            <Button
              onClick={() => {
                dispatch(addQuestion());
              }}
              bgColor={calm}
              color="#fff"
              type="button"
            >
              <IconPlus />
            </Button>
          </Flex>
          <Devider margin={"20px 0 0 0"} />
          <QuestionsWrapper>
            {questions.map((item) => {
              return <QuestListItem {...item} />;
            })}
          </QuestionsWrapper>
        </Flex>
        <QuestionModal />
        <Devider margin={"20px 0 0 0"} />
        <Flex justify="end">
          <Button color={"#fff"} bgColor={success} fontSize="24px">
            Submit
          </Button>
        </Flex>
      </Form>
    </FormWrapper>
  );
};

const Heading = styled.h3`
  margin: 0;
  margin-right: 10px;
  font-size: 30px;
`;
const Label = styled.label`
  font-size: 36px;
  margin: 10px 0;
  font-weight: bold;
`;
const Description = styled.textarea`
  resize: none;
  outline: none;
  font-size: 24px;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
`;
const QuestionsWrapper = styled.div`
  width: 100%;
  max-height: 500px;
  overflow-y: scroll;
`;
const Form = styled.form`
  border-radius: 8px;
  border: 1px solid #000;
  padding: 5px 10px;
`;
const FormWrapper = styled(Flex)`
  width: 100vw;
  height: 100vh;
`;
export default CreateQuiz;
