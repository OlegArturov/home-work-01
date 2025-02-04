import { SxProps } from "@mui/material";
import { DefaultTFuncReturn } from "i18next";

export interface IButtonProps {
  label: DefaultTFuncReturn;
  isFullWidth?: boolean;
  type: "button" | "submit" | "reset" | undefined;
  color:
    | "primary"
    | "inherit"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick?: () => void;
  sx?: SxProps;
}
