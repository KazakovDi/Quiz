import { IconArrowBigLeftFilled } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button, { ButtonProps } from "../UI/Button/Button";
import styled from "styled-components";

interface GoBackBtnProps extends ButtonProps {
  absolute?: boolean;
  bottom?: string;
  top?: string;
  right?: string;
  left?: string;
}

const GoBackBtn = (props: GoBackBtnProps) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Btn {...props} onClick={goBack}>
      <IconArrowBigLeftFilled />
    </Btn>
  );
};

const Btn = styled(Button)<GoBackBtnProps>`
  position: ${(props) => (props.absolute ? "absolute" : "static")};
  border: none;
  background: none;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;
export default GoBackBtn;
