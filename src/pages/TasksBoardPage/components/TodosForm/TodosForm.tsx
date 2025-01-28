import { Box, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "../../../../components/Select/Select";
import { ITaskFormProps } from "./TodosFormTypes";
import { useTranslation } from "react-i18next";
import { TaskStatusesEnum } from "../../../../store/services/models/todo/todo";
import Button from "../../../../components/Button/Button";

export default function TodosForm({
  statusesForSelect,
  newTaskStatusForSubmit,
  newTaskTitleForSubmit,
  setNewTaskStatusForSubmit,
  setNewTaskTitleForSubmit,
  onSubmit,
}: ITaskFormProps) {
  const { t } = useTranslation("base_translations", {
    keyPrefix: "pages.tasksBoardPage.todosForm",
  });
  const [taskTitle, setTaskTitle] = useState<string | undefined>(
    newTaskTitleForSubmit
  );
  const [taskStatus, setTaskStatus] = useState<TaskStatusesEnum>(
    newTaskStatusForSubmit
  );

  useEffect(() => {
    if (taskTitle) {
      setNewTaskTitleForSubmit(taskTitle);
    }
  }, [taskTitle]);

  useEffect(() => {
    setNewTaskStatusForSubmit(taskStatus);
  }, [taskStatus]);

  const handleOnSubmit = () => {
    onSubmit();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography variant="h4" sx={{ fontSize: "16px", mb: "10px" }}>
        {t("formTitle")}
      </Typography>
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <TextField
          label={t("taskTitleLabel")}
          value={taskTitle}
          type="name"
          onChange={(e) => setTaskTitle(e.target.value)}
          fullWidth
        />
        <Select
          defaultValue={taskStatus}
          options={statusesForSelect}
          selectLabel={t("statusesSelectLabel")}
          onChange={(val) => setTaskStatus(val as TaskStatusesEnum)}
        />
        <Button
          label={t("submitButtonText")}
          isFullWidth={true}
          type="submit"
          color="primary"
        />
      </Box>
    </Paper>
  );
}
