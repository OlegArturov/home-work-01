import { api } from "./api";
import { IGetGithubUserReposResponseItem, IGitHubUser } from "./models/battle";

export const battleApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGitHubUser: build.query<IGitHubUser, { userName: string }>({
      query: ({ userName }) => ({
        url: `${userName}`,
      }),
      providesTags: ["GitHubUserInfo"],
    }),
    getGitHubUsersRepos: build.query<
      Array<IGetGithubUserReposResponseItem>,
      { userName: string }
    >({
      query: ({ userName }) => ({
        url: `${userName}/repos?per_page=100`,
      }),
    }),
  }),
});

export const {
  useGetGitHubUserQuery,
  useLazyGetGitHubUserQuery,
  useGetGitHubUsersReposQuery,
  useLazyGetGitHubUsersReposQuery,
  endpoints: getGitHubUser,
} = battleApi;
