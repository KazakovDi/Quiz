import React, { useEffect, useState } from "react";
import FormInput from "../../Components/UI/FormInput/FormInput";
import { useAppDispatch } from "../../Redux/store";
import { searchByName } from "../../Redux/QuizSlice";
const SearchByNameInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(searchByName(inputValue));
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
      placeholder="name..."
      fullWidth
    />
  );
};

export default SearchByNameInput;
