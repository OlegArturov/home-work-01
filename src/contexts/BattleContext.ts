import { createContext } from "react";
import { IBattlerPaggeInitialState } from "../pages/BattlePage/store/models/types";
import {
  IGetGithubUserReposResponseItem,
  IGitHubUser,
} from "../store/services/models/battle";

export type ISetPlayerForDisplay =
  | ((name: IGitHubUser | null, playerNumber: number) => void)
  | null;
export type ISetPlayerInputError =
  | ((error: string | null, playerNumber: number) => void)
  | null;
export type ISetPlayerCompetitiveInfo =
  | ((
      data: Array<IGetGithubUserReposResponseItem> | null,
      playerNumber: number
    ) => void)
  | null;

export interface IBattleContext {
  state: IBattlerPaggeInitialState | null;
  setPlayerForDisplay: ISetPlayerForDisplay;
  setPlayerInputError: ISetPlayerInputError;
  setPlayerCompetitiveInfo: ISetPlayerCompetitiveInfo;
  isBattleFinished: boolean | null;
  isBattleFinishedWithDraw: boolean | null;
}

const BattleContext = createContext<IBattleContext>({
  state: null,
  setPlayerForDisplay: null,
  setPlayerInputError: null,
  setPlayerCompetitiveInfo: null,
  isBattleFinished: null,
  isBattleFinishedWithDraw: null,
});

export default BattleContext;
