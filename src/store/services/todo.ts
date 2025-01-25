import { api } from "./api";
import {
  ICreateNewTaskRequest,
  ISetNewTaskStatusRequest,
  ITask,
} from "./models/todo/todo";

export const todoApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Array<ITask>, void>({
      query: () => ({
        url: "",
      }),
      providesTags: ["TasksState"],
    }),
    setNewTaskStatus: build.mutation<void, ISetNewTaskStatusRequest>({
      query: ({ taskId, status }) => ({
        url: `/${taskId}`,
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ status }),
      }),
      invalidatesTags: ["TasksState"],
    }),
    createNewTask: build.mutation<void, ICreateNewTaskRequest>({
      query: ({ status, title }) => ({
        url: "",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: { status, title },
      }),
      invalidatesTags: ["TasksState"],
    }),
    deleteTask: build.mutation<void, { taskId: string }>({
      query: ({ taskId }) => ({
        url: `/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TasksState"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useSetNewTaskStatusMutation,
  useCreateNewTaskMutation,
  useDeleteTaskMutation,
  endpoints: { getTasks, setNewTaskStatus },
} = todoApi;
