import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../Components/UI/Button/Button";
import { clearSortProps, searchByAuthor } from "../../Redux/QuizSlice";
import { RootState, useAppDispatch } from "../../Redux/store";
import SearchByAuthorInput from "../SearchByAuthor/SearchByAuthor";
import SearchByNameInput from "../SearchByNameInput/SearchByNameInput";
import SearchByTagsInput from "../SearchByTagsInput/SearchByTagsInput";
import SortSelect from "../SortSelect/SortSelect";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector((state: RootState) => state.User.username);
  return (
    <Aside>
      <SearchByNameInput />
      <SearchByTagsInput />
      <SearchByAuthorInput />
      <Button
        onClick={() => {
          dispatch(clearSortProps());
          dispatch(searchByAuthor(currentUser));
        }}
      >
        Show mine
      </Button>
      <Button onClick={() => dispatch(searchByAuthor(""))}>Show All</Button>
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
