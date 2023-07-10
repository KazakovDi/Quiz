import React from "react";
import styled from "styled-components";
import SearchByNameInput from "../SearchByNameInput/SearchByNameInput";
import SearchByTagsInput from "../SearchByTagsInput/SearchByTagsInput";
import SortSelect from "../SortSelect/SortSelect";

const Sidebar = () => {
  return (
    <Aside>
      <SearchByNameInput />
      <SearchByTagsInput />
      <SortSelect />
    </Aside>
  );
};

export default Sidebar;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  overflowy: scroll;
  width: 400px;
  background-color: #fff;
  padding: 10px 5px;
  box-sizing: border-box;
  * {
    margin: 5px 0;
    font-size: 24px;
  }
`;
