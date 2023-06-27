import React from "react";
import styled from "styled-components";

const Sidebar = () => {
  return <Aside>Sidebar</Aside>;
};

export default Sidebar;

const Aside = styled.aside`
  display: flex;
  overflowy: scroll;
  width: 400px;
  background-color: #fff;
`;
