import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

interface SimpleLinkProps extends LinkProps {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  block?: boolean;
  align?: string;
  weight?: string;
}
const SimpleLink = (props: SimpleLinkProps) => {
  return <Anchor {...props}>{props.children}</Anchor>;
};

const Anchor = styled(Link)<SimpleLinkProps>`
  display: ${(props) => (props.block ? "block" : "inline")};
  text-align: ${(props) => props.align};
  font-size: ${(props) => props.fontSize};
  color: ${(props) => (!props.color ? "rgb(41, 162, 235)" : props.color)};
  cursor: pointer;
  text-decoration: none;
  font-weight: ${(props) => (props.weight ? props.weight : "bold")};
  &:hover {
    opacity: 0.8;
  }
`;
export default SimpleLink;
