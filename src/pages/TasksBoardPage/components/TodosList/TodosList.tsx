import React from "react";
import { ITodosListProps } from "./TodosListTypes";
import { List } from "@mui/material";
import TodosListItem from "./TodosListItem";

export default function TodosList({
  tasks,
  renderActionButton,
}: ITodosListProps) {
  return (
    <List sx={{ widht: "100%" }}>
      {tasks.map((task) => (
        <TodosListItem
          key={task.id}
          task={task}
          renderActionButton={renderActionButton}
        />
      ))}
    </List>
  );
}
