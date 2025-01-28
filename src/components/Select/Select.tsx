import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectMUI,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ISelectProps } from "./SelectTypes";

export default function Select({
  options,
  selectLabel,
  defaultValue,
  onChange,
}: ISelectProps) {
  const [value, setValue] = useState<string | number>(defaultValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <FormControl fullWidth margin="normal">
      {selectLabel && (
        <InputLabel id="simple-select-label">{selectLabel}</InputLabel>
      )}

      {options.length && (
        <SelectMUI
          id="simple-select-label"
          labelId="simple-select-label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label={selectLabel}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectMUI>
      )}
    </FormControl>
  );
}
