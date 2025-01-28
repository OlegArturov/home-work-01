import { ISelectOption } from "../../../../components/Select/SelectTypes";
import { TaskStatusesEnum } from "../../../../store/services/models/todo/todo";

export interface ITaskFormProps {
  statusesForSelect: ISelectOption[];
  newTaskStatusForSubmit: TaskStatusesEnum;
  newTaskTitleForSubmit: string | undefined;
  setNewTaskTitleForSubmit: (taskTitle: string) => void;
  setNewTaskStatusForSubmit: (taskStatus: TaskStatusesEnum) => void;
  onSubmit: () => void;
}
