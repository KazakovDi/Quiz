import React, { useEffect, useState } from "react";
import FormInput from "../../Components/UI/FormInput/FormInput";
import { useAppDispatch } from "../../Redux/store";
import { searchByAuthor } from "../../Redux/QuizSlice";
const SearchByAuthorInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(searchByAuthor(inputValue));
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
      placeholder="author..."
      fullWidth
    />
  );
};

export default SearchByAuthorInput;
