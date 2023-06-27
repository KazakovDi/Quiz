import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { disabled } from "../../Style/pallete";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  color?: string;
  clickable?: boolean;
  border?: string;
  fontSize?: string;
  fullWidth?: boolean;
  variant?: "outlined" | "filled" | "hollow";
  hover?: boolean;
  svgWidth?: string;
  svgHeight?: string;
}

const Button = (props: ButtonProps) => {
  return <Btn {...props}>{props.children}</Btn>;
};

const Btn = styled.button<ButtonProps>`
  border-radius: 6px;
  outline: none;
  user-select: none;
  border: 1px solid;
  border-color: ${(props) =>
    props.variant === "hollow"
      ? "transparent"
      : props.disabled
      ? disabled
      : props.color};
  cursor: ${(props) => (props.disabled ? "unset" : "pointer")};
  font-size: ${(props) => props.fontSize};
  padding: 10px;
  width: ${(props) => props.fullWidth && "100%"};
  color: ${(props) => (props.disabled ? "#fff" : props.color)};
  background-color: ${(props) =>
    props.disabled
      ? disabled
      : props.variant === "outlined"
      ? "none"
      : props.variant === "hollow"
      ? "transparent"
      : props.bgColor};
  border: ${(props) => props.border};
  transition: 0.1s ease;
  &:hover {
    background-color: ${(props) =>
      props.disabled
        ? disabled
        : props.variant === "outlined" && props.hover && props.color};
    color: ${(props) => props.variant === "outlined" && props.hover && "#fff"};
  }
  * {
    margin: 0 !important;
    font-size: ${(props) => props.fontSize};
    width: ${(props) => props.svgWidth};
    height: ${(props) => props.svgHeight};
  }
`;
export default Button;
