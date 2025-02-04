import {
  IGitHubUser,
  IGitHubUserCompetitiveInfo,
} from "../../../../store/services/models/battle";

interface IBattlerPaggeInitialState {
  firstPlayer: IGitHubUser | null;
  secondPlayer: IGitHubUser | null;
  firstPlayerInputError: string | null;
  secondPlayerInputError: string | null;
  firstPlayerCompetitiveData: IGitHubUserCompetitiveInfo | null;
  secondPlayerCompetitiveData: IGitHubUserCompetitiveInfo | null;
}

export type { IBattlerPaggeInitialState };
