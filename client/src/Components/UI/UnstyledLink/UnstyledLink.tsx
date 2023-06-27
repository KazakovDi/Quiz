import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
const UnstyledLink = (props: LinkProps) => {
  return <Anchor {...props}>{props.children}</Anchor>;
};

const Anchor = styled(Link)`
  text-decoration: none;
  color: #000;
`;
export default UnstyledLink;
