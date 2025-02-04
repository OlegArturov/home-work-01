import React from "react";
import { Button as ButtonMUI } from "@mui/material";
import { IButtonProps } from "./ButtonTypes";

export default function Button({
  label,
  isFullWidth,
  type,
  color = "primary",
  onClick,
  sx,
}: IButtonProps) {
  return (
    <ButtonMUI
      sx={{ ...sx, textTransform: "initial", whiteSpace: "nowrap" }}
      fullWidth={isFullWidth}
      type={type}
      variant="contained"
      color={color}
      onClick={onClick ? () => onClick() : () => {}}
    >
      {label}
    </ButtonMUI>
  );
}
