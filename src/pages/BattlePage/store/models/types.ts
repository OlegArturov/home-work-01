import {
  IGitHubUser,
  IGitHubUserCompetitiveInfo,
} from "../../../../store/services/models/battle";

interface IBattlePagePlayer {
  id: string;
  mainInfo: IGitHubUser | null;
  inputError: string | null;
  competitiveData: IGitHubUserCompetitiveInfo | null;
}

interface IBattlerPaggeInitialState {
  players: IBattlePagePlayer[];
}

export type { IBattlerPaggeInitialState, IBattlePagePlayer };
