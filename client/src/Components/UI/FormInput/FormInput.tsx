import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import Flex from "../Flex/Flex";
import { calm } from "../../Style/pallete";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "filled" | "underlined" | "empty" | "hollow";
  radius?: string;
  bgColor?: string;
  fontSize?: string;
  label?: string;
  mark?: string;
  fullWidth?: boolean;
}

const FormInput = (props: FormInputProps) => {
  return (
    <Wrapper {...props}>
      {props.label ? (
        <Flex align="center" justify="between">
          <Label>{props.label}</Label>
          {props.required ? <Mark>{props.mark ? props.mark : "*"}</Mark> : null}
        </Flex>
      ) : null}
      <Input {...props} />
    </Wrapper>
  );
};
const Wrapper = styled.div<FormInputProps>`
  position: relative;
  width: ${(props) => (props.fullWidth ? "100%" : "fit-content")};
  * {
    font-size: ${(props) => props.fontSize};
  }
`;
const Mark = styled.p`
  margin: 0;
  color: red;
`;
const Label = styled.label`
  font-weight: bold;
`;
const Input = styled.input<FormInputProps>`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  padding: 5px 5px 2px 0;
  border: ${(props) =>
    props.variant === "hollow" ? "2px solid #000" : "none"};
  border-bottom: ${(props) =>
    props.variant === "underlined" && "4px solid " + calm};
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "transparent"};
  border-radius: ${(props) => props.variant !== "underlined" && props.radius};
`;

export default FormInput;
