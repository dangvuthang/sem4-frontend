import { useState } from "react";
import validate from "../../../utils/validate";
const useForm = inputField => {
  const [inputValue, setInputValue] = useState(inputField);
  const [errorMsg, setErrorMsg] = useState(
    Object.keys(inputField).reduce(
      (prev, curr) => ({ ...prev, [curr]: "" }),
      {}
    )
  );

  const handleOnChange = ({ target: inputElement }) => {
    if (inputElement.type === "file") {
      return setInputValue({
        ...inputValue,
        [inputElement.id]: inputElement.files[0],
      });
    }
    if (inputElement.value.length > 0) inputElement.classList.add("has-value");
    else inputElement.classList.remove("has-value");
    const errorObj = { ...errorMsg };
    let message = validate(inputElement);
    if (inputElement.id === "confirmPassword") {
      if (inputElement.value !== inputValue.password)
        message = "Confirm Password and Password does not match.";
      else message = "";
    }
    if (!message) {
      delete errorObj[inputElement.id];
      setErrorMsg({ ...errorObj });
    } else {
      setErrorMsg({ ...errorObj, [inputElement.id]: message });
    }
    setInputValue({ ...inputValue, [inputElement.id]: inputElement.value });
  };

  const buttonDisabled = () => {
    const isDisabled = Object.keys(errorMsg).length > 0;
    return isDisabled;
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
