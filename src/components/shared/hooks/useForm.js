import { useState } from "react";
import validate from "../../../utils/validate";
const useForm = inputField => {
  const [inputValue, setInputValue] = useState(inputField);
  const [errorMsg, setErrorMsg] = useState(
    Object.keys(inputField).reduce(
      (prev, curr) => Object.assign(prev, { [curr]: "" }),
      {}
    )
  );

  const handleOnChange = ({ target: inputElement }) => {
    if (inputElement.value.length > 0) inputElement.classList.add("has-value");
    else inputElement.classList.remove("has-value");
    const errorObj = { ...errorMsg };
    const message = validate(inputElement);
    if (!message) {
      delete errorObj[inputElement.id];
      setErrorMsg({ ...errorObj });
    } else {
      setErrorMsg({ ...errorObj, [inputElement.id]: message });
    }
    setInputValue({ ...inputValue, [inputElement.id]: inputElement.value });
  };

  const buttonDisabled = () => {
    const disabled = Object.keys(errorMsg).length > 0;
    return disabled;
  };

  return [
    inputValue,
    errorMsg,
    handleOnChange,
    buttonDisabled,
    setInputValue,
    setErrorMsg,
  ];
};

export default useForm;
