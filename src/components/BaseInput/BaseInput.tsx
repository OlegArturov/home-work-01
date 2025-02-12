import { SxProps, TextField } from "@mui/material";
import React, { HTMLInputTypeAttribute } from "react";

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

  return (
    <TextField
      defaultValue={valueForInput}
      onChange={(e) => setValueFromInput(e.target.value)}
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
