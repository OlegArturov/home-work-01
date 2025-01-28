import React, { useEffect, useState } from "react";
import {
  useCreateNewTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useSetNewTaskStatusMutation,
} from "../../store/services/todo";

import "./styles.scss";
import { ITask, TaskStatusesEnum } from "../../store/services/models/todo/todo";
import TodosForm from "./components/TodosForm/TodosForm";
import { useTranslation } from "react-i18next";
import { ISelectOption } from "../../components/Select/SelectTypes";
import TodosList from "./components/TodosList/TodosList";
import Button from "../../components/Button/Button";
import { Box, Paper, Typography } from "@mui/material";

export interface IActionBlock {
  title: string;
  action: TaskStatusesEnum;
  tasks: Array<ITask>;
}

export default function TasksBoardPage() {
  const { t } = useTranslation("base_translations", {
    keyPrefix: "pages.tasksBoardPage",
  });

  const getActionsBlockFromEnum = (): IActionBlock[] => {
    const blocks = Object.entries(TaskStatusesEnum)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => ({
        title: t(`actionBlocks.titles.${key}`),
        action: value as TaskStatusesEnum,
        tasks: [],
      }));

    const onHoldIndex = blocks.findIndex(
      (block) => block.action === TaskStatusesEnum.ON_HOLD
    );
    if (onHoldIndex > -1) {
      const [onHoldBlock] = blocks.splice(onHoldIndex, 1);
      blocks.splice(1, 0, onHoldBlock);
    }
    return blocks;
  };

  const getStatusesForTodosFormSelect = (): ISelectOption[] => {
    return Object.entries(TaskStatusesEnum)
      .filter(
        ([key, value]) =>
          isNaN(Number(key)) && value !== TaskStatusesEnum.ON_HOLD
      )
      .map(([key, value]) => ({
        value,
        label: t(`todosForm.statusesSelectOptionTitles.${key}`),
      }));
  };

  const [actionBlocks, setActionBlocks] = useState<Array<IActionBlock>>(
    getActionsBlockFromEnum()
  );

  const [newTaskTitleForSubmit, setNewTaskTitleForSubmit] = useState<
    string | undefined
  >("");
  const [newTaskStatusForSubmit, setNewTaskStatusForSubmit] =
    useState<TaskStatusesEnum>(TaskStatusesEnum.STATUS_TODO);

  const {
    data: tasksData,
    isFetching: isFetchingTasksData,
    isLoading: isLoadingTasksData,
  } = useGetTasksQuery();

  const [setNewTaskStatus] = useSetNewTaskStatusMutation();
  const [createNewTask] = useCreateNewTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    if (tasksData) {
      const updatedActionBlocks: Array<IActionBlock> = actionBlocks.map(
        (actionBlock) => {
          return {
            ...actionBlock,
            tasks: tasksData.filter(
              (task) => task.status === actionBlock.action
            ),
          };
        }
      );
      setActionBlocks(updatedActionBlocks);
    }
  }, [tasksData]);

  const onActionButtonClick = ({
    taskId,
    newStatus,
  }: {
    taskId: string;
    newStatus: TaskStatusesEnum;
  }): void => {
    setNewTaskStatus({ taskId, status: newStatus });
  };

  const renderActionButton = ({
    id,
    status,
  }: {
    id: string;
    status: TaskStatusesEnum;
  }) => {
    let actionButtonText;
    let updatedStatus: TaskStatusesEnum;
    const doneButtonText = t("actionBlocks.actionButtons.done");
    const inProgressButtonText = t("actionBlocks.actionButtons.inProgress");
    const onHoldButtonText = t("actionBlocks.actionButtons.onHold");
    const toDoButtonText = t("actionBlocks.actionButtons.toDo");
    const toArchiveButtonText = t("actionBlocks.actionButtons.toArchive");

    switch (status) {
      case TaskStatusesEnum.STATUS_TODO:
        actionButtonText = inProgressButtonText;
        updatedStatus = TaskStatusesEnum.STATUS_IN_PROGRESS;
        break;
      case TaskStatusesEnum.STATUS_IN_PROGRESS:
        actionButtonText = toDoButtonText;
        updatedStatus = TaskStatusesEnum.STATUS_TODO;
        break;
      case TaskStatusesEnum.STATUS_DONE:
        actionButtonText = toArchiveButtonText;
        updatedStatus = TaskStatusesEnum.STATUS_DONE;
        break;
      case TaskStatusesEnum.ON_HOLD:
        actionButtonText = toDoButtonText;
        updatedStatus = TaskStatusesEnum.STATUS_TODO;
        break;
      default:
        actionButtonText = "";
        break;
    }

    const isInProgressStatus = status === TaskStatusesEnum.STATUS_IN_PROGRESS;
    const isOnHoldStatus = status === TaskStatusesEnum.ON_HOLD;
    return (
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <Button
          label={actionButtonText}
          color="secondary"
          type="button"
          onClick={() => {
            if (status === TaskStatusesEnum.STATUS_DONE) {
              deleteTask({ taskId: id });
            } else {
              onActionButtonClick({ taskId: id, newStatus: updatedStatus });
            }
          }}
          sx={{ mt: "5px" }}
        />
        {(isInProgressStatus || isOnHoldStatus) && (
          <Button
            label={isInProgressStatus ? doneButtonText : inProgressButtonText}
            color="secondary"
            type="button"
            onClick={() =>
              onActionButtonClick({
                taskId: id,
                newStatus: isInProgressStatus
                  ? TaskStatusesEnum.STATUS_DONE
                  : TaskStatusesEnum.STATUS_IN_PROGRESS,
              })
            }
            sx={{ ml: "5px", mt: "5px" }}
          />
        )}
        {isInProgressStatus && (
          <Button
            label={onHoldButtonText}
            color="secondary"
            type="button"
            onClick={() =>
              onActionButtonClick({
                taskId: id,
                newStatus: TaskStatusesEnum.ON_HOLD,
              })
            }
            sx={{ mt: "5px" }}
          />
        )}
      </Box>
    );
  };

  const createNewTaskSubmit = () => {
    if (newTaskTitleForSubmit && newTaskStatusForSubmit !== undefined) {
      createNewTask({
        status: newTaskStatusForSubmit,
        title: newTaskTitleForSubmit,
      });
      setNewTaskTitleForSubmit(undefined);
      setNewTaskStatusForSubmit(TaskStatusesEnum.STATUS_TODO);
    }
  };

  if (isFetchingTasksData || isLoadingTasksData) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <TodosForm
        newTaskTitleForSubmit={newTaskTitleForSubmit}
        newTaskStatusForSubmit={newTaskStatusForSubmit}
        setNewTaskTitleForSubmit={setNewTaskTitleForSubmit}
        setNewTaskStatusForSubmit={setNewTaskStatusForSubmit}
        statusesForSelect={getStatusesForTodosFormSelect()}
        onSubmit={() => createNewTaskSubmit()}
      />
      <Paper
        sx={{
          p: 2,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          mt: 1,
        }}
      >
        {actionBlocks.map((actionBlock) => (
          <Box
            key={actionBlock.action}
            sx={{
              width: `calc((100% / ${actionBlocks.length}) - 10px)`,
              border: "1px solid gray",
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h3"
              sx={{ p: 2, fontSize: "16px", fontWeight: 600 }}
            >
              {actionBlock.title}: {actionBlock.tasks.length}
            </Typography>
            <TodosList
              renderActionButton={renderActionButton}
              tasks={actionBlock.tasks}
            />
          </Box>
        ))}
      </Paper>
    </>
  );
}
