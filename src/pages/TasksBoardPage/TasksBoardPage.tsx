import React, { useEffect, useState } from "react";
import {
  useCreateNewTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useSetNewTaskStatusMutation,
} from "../../store/services/todo";

import "./styles.scss";
import { ITask, TaskStatusesEnum } from "../../store/services/models/todo/todo";

export interface IActionBlock {
  title: string;
  action: TaskStatusesEnum;
  tasks: Array<ITask>;
}

export default function TasksBoardPage() {
  const [actionBlocks, setActionBlocks] = useState<Array<IActionBlock>>([
    {
      title: "To Do",
      action: TaskStatusesEnum.STATUS_TODO,
      tasks: [],
    },
    {
      title: "In Progress",
      action: TaskStatusesEnum.STATUS_IN_PROGRESS,
      tasks: [],
    },
    {
      title: "Done",
      action: TaskStatusesEnum.STATUS_DONE,
      tasks: [],
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState<string>();

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
    const doneButtonText = "Done";

    switch (status) {
      case TaskStatusesEnum.STATUS_TODO:
        actionButtonText = "In progress";
        updatedStatus = TaskStatusesEnum.STATUS_IN_PROGRESS;
        break;
      case TaskStatusesEnum.STATUS_IN_PROGRESS:
        actionButtonText = "To do";
        updatedStatus = TaskStatusesEnum.STATUS_TODO;
        break;
      default:
      case TaskStatusesEnum.STATUS_DONE:
        actionButtonText = "To archive";
        updatedStatus = TaskStatusesEnum.STATUS_DONE;
        break;
    }
    return (
      <div className="action-block-buttons">
        <button
          onClick={() => {
            if (status === TaskStatusesEnum.STATUS_DONE) {
              deleteTask({ taskId: id });
            } else {
              onActionButtonClick({ taskId: id, newStatus: updatedStatus });
            }
          }}
        >
          {actionButtonText}
        </button>
        {status === TaskStatusesEnum.STATUS_IN_PROGRESS && (
          <button
            onClick={() =>
              onActionButtonClick({
                taskId: id,
                newStatus: TaskStatusesEnum.STATUS_DONE,
              })
            }
          >
            {doneButtonText}
          </button>
        )}
      </div>
    );
  };

  const createNewTaskSubmit = () => {
    if (newTaskTitle) {
      createNewTask({
        status: TaskStatusesEnum.STATUS_TODO,
        title: newTaskTitle,
      });
      setNewTaskTitle(undefined);
    }
  };

  if (isFetchingTasksData || isLoadingTasksData) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <div className="main-actions-wrapper">
        {actionBlocks.map((actionBlock) => (
          <div key={actionBlock.action} className="action-block">
            <h3 className="action-block-title">
              {actionBlock.title}: {actionBlock.tasks.length}
            </h3>
            <ul className="action-block-items-list">
              {actionBlock.tasks.map((task) => (
                <li key={task.id} className="action-block-item">
                  <span className="action-block-item-title">{task.title}</span>
                  {renderActionButton({ id: task.id, status: task.status })}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="create-task-form">
        <input
          defaultValue={newTaskTitle}
          placeholder="name"
          onChange={(e) => {
            setNewTaskTitle(e.target.value);
          }}
        />
        <button disabled={!newTaskTitle} onClick={() => createNewTaskSubmit()}>
          Submit
        </button>
      </div>
    </>
  );
}
