import { Box, ListItem, ListItemIcon, Typography } from "@mui/material";
import React from "react";
import { ITodosListItemProps } from "./TodosListTypes";
import CircleIcon from "@mui/icons-material/Circle";

export default function TodosListItem({
  task,
  renderActionButton,
}: ITodosListItemProps) {
  return (
    <ListItem sx={{ width: "100%" }}>
      <Box sx={{ width: "50%", display: "flex", alignItems: "center" }}>
        <ListItemIcon>
          <CircleIcon sx={{ fontSize: 8, color: "gray" }} /> {/* Кружок */}
        </ListItemIcon>
        <Typography sx={{ fontSize: "14px" }}>{task.title}</Typography>
      </Box>
      {renderActionButton({ id: task.id, status: task.status })}
    </ListItem>
  );
}
