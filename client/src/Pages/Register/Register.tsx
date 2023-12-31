import React from "react";
import styled from "styled-components";
import Flex from "../../Components/UI/Flex/Flex";
import { Controller } from "react-hook-form";
import FormInput from "../../Components/UI/FormInput/FormInput";
import { useForm } from "react-hook-form";
import { RegisterProps } from "../../types/userInterfaces";
import Devider from "../../Components/UI/Devider/Devider";
import Button from "../../Components/UI/Button/Button";
import { calm } from "../../Components/Style/pallete";
import SimpleLink from "../../Components/UI/SimpleLink/SimpleLink";
import { useAppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../../Redux/UserSlice";
const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<RegisterProps>();
  const submitHandler = async (values: RegisterProps) => {
    const { payload }: any = await dispatch(fetchRegister(values));
    console.log(payload);
    if (payload.token) {
      window.localStorage.setItem("token", payload.token);
      navigate("/");
    }
  };
  return (
    <Wrapper align="center" justify="center">
      <Form onSubmit={handleSubmit(submitHandler)}>
        <FormHeading>Register</FormHeading>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              fontSize="50px"
              variant="underlined"
              placeholder="Username"
              required
              fullWidth
            />
          )}
        />
        <Devider margin={"40px 0 0 0"} />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              fontSize="50px"
              variant="underlined"
              placeholder="Email"
              required
              type="email"
              fullWidth
            />
          )}
        />
        <Devider margin={"40px 0 0 0"} />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <FormInput
              {...field}
              fontSize="50px"
              variant="underlined"
              placeholder="Password"
              required
              fullWidth
            />
          )}
        />
        <Devider margin={"40px 0 0 0"} />
        <SimpleLink
          block
          align="center"
          weight="400"
          fontSize="32px"
          to={"/auth/login"}
        >
          Already have an account ? Login now
        </SimpleLink>
        <Devider margin={"10px 0 0 0"} />

        <Button
          fontSize="50px"
          bgColor={calm}
          color="#fff"
          variant="filled"
          fullWidth
        >
          Register
        </Button>
      </Form>
    </Wrapper>
  );
};
const FormHeading = styled.h1`
  font-size: 50px;

  text-align: center;
  margin: 0 0 10px 0;
`;
const Wrapper = styled(Flex)`
  width: 100vw;
  height: 100vh;
`;
const Form = styled.form`
  border: 1px solid #000;
  border-radius: 8px;
  padding: 10px 15px;
`;
export default Register;
