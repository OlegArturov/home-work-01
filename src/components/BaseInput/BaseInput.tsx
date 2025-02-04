import { SxProps, TextField } from "@mui/material";
import React, {
  ChangeEvent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";

export interface IBaseInputProps {
  valueForInput: string;
  setValueFromInput: (newValue: string) => void;
  placeholder?: string;
  name: string;
  id: string;
  type?: HTMLInputTypeAttribute;
  isError?: boolean;
  heplerText?: string;
}

export default function BaseInput({
  valueForInput,
  setValueFromInput,
  placeholder,
  name,
  id,
  type = "text",
  isError,
  heplerText,
}: IBaseInputProps) {
  const styles: Record<string, SxProps> = {
    textField: {
      width: "100%",
      input: {
        height: "36px",
        boxSizing: "border-box",
        padding: "0 15px",
      },
      ".MuiOutlinedInput-root": {
        backgroundColor: "#fff",
      },
      ".MuiFormHelperText-root": {
        position: "absolute",
        bottom: "-20px",
      },
    },
  };

  const [value, setValue] = useState<string>(valueForInput);

  useEffect(() => {
    if (valueForInput) setValue(valueForInput);
  }, [valueForInput]);

  const handleOnInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue: string = e.target.value;
    setValue(newValue);
    setValueFromInput(newValue);
  };

  return (
    <TextField
      defaultValue={value}
      onChange={(e) => handleOnInputChange(e)}
      placeholder={placeholder || ""}
      sx={styles.textField}
      name={name}
      id={id}
      type={type}
      error={isError}
      helperText={isError && heplerText}
    />
  );
}
