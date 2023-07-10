import React from "react";
import styled from "styled-components";
import { changeSortMethod } from "../../Redux/QuizSlice";
import { useAppDispatch } from "../../Redux/store";
import { Sort } from "../../types/sort";

const SortSelect = () => {
  const dispatch = useAppDispatch();
  return (
    <Select
      onChange={(event) =>
        dispatch(changeSortMethod(event.target.value as Sort))
      }
    >
      <option value={Sort.AZ}>A-Z</option>
      <option value={Sort.AZR}>Z-A</option>
      <option selected value={Sort.NEW}>
        Newest
      </option>
      <option value={Sort.OLD}>Older</option>
      <option value={Sort.LONG}>Longest</option>
      <option value={Sort.SHORT}>Shortest</option>
    </Select>
  );
};

const Select = styled.select`
  padding: 5px 5px 2px 0;
`;
export default SortSelect;
