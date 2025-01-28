import {
  ITask,
  TaskStatusesEnum,
} from "../../../../store/services/models/todo/todo";

export interface ITodosListProps {
  tasks: Array<ITask>;
  renderActionButton: ({
    id,
    status,
  }: {
    id: string;
    status: TaskStatusesEnum;
  }) => React.JSX.Element;
}

export interface ITodosListItemProps {
  task: ITask;
  renderActionButton: ({
    id,
    status,
  }: {
    id: string;
    status: TaskStatusesEnum;
  }) => React.JSX.Element;
}
