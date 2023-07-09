import React, { useEffect, useState } from "react";
import FormInput from "../../Components/UI/FormInput/FormInput";
import { useAppDispatch } from "../../Redux/store";
import { searchByTags } from "../../Redux/QuizSlice";
const SearchInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(searchByTags(inputValue));
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [inputValue]);
  return (
    <FormInput
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      variant="hollow"
      placeholder="search"
    />
  );
};

export default SearchInput;
