import React, { AnchorHTMLAttributes } from "react";
import styled from "styled-components";
const TextAnchor = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return <Anchor {...props}>{props.children}</Anchor>;
};

const Anchor = styled.a`
  text-decoration: none;
  font-weight: 700;
`;
export default TextAnchor;
