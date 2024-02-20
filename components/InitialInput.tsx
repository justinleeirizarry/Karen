import React from "react";
import TextareaWithButton from "./TextInput";

interface InitialInputProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function InitialInput({
  input,
  handleInputChange,
  onSubmit,
}: InitialInputProps) {
  return (
    <TextareaWithButton
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={onSubmit} // Ensure onSubmit is correctly used as the form submission handler
    />
  );
}

export default InitialInput;
