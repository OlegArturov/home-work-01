import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const getBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_HOMEWORK_API_HOST,
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await getBaseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["TasksState"],
  endpoints: () => ({}),
});
