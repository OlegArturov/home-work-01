export enum TaskStatusesEnum {
  STATUS_TODO = 0,
  STATUS_IN_PROGRESS,
  STATUS_DONE,
}

export interface ITask {
  id: string;
  title: string;
  status: TaskStatusesEnum;
}

export interface ISetNewTaskStatusRequest {
  taskId: string;
  status: TaskStatusesEnum;
}

export interface ICreateNewTaskRequest {
  status: TaskStatusesEnum;
  title: string;
}
