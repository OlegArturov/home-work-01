export interface IGitHubUser {
  id: number;
  node_id: string;
  login: string;
  avatar_url: string;
  followers: number;
}

export interface IGetGithubUserReposResponseItem {
  stargazers_count: number;
}

export interface IGitHubUserCompetitiveInfo {
  followersCount: number;
  repositoriesStars: number;
  totalScore: number;
}
