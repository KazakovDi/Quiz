import React from "react";
import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";

const BlockLink = (props: LinkProps) => {
  return <Anchor {...props}>BlockLink</Anchor>;
};

const Anchor = styled(Link)`
  display: block;
`;

export default BlockLink;
