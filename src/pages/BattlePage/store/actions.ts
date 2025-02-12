import {
  IGetGithubUserReposResponseItem,
  IGitHubUser,
} from "../../../store/services/models/battle";

export interface ISetPlayerPayload {
  playerMainInfo: IGitHubUser | null;
  playerToUpdateId: string;
}

export interface ISetPlayerInputErrorPayload {
  error: string | null;
  playerToUpdateId: string;
}

export interface ISetPlayerCompetitiveDataPayload {
  reposData: Array<IGetGithubUserReposResponseItem> | null;
  playerToUpdateId: string;
}

export enum BattlerPageActionTypes {
  SET_PLAYER_FOR_DSPLAY = "SET_PLAYER_FOR_DSPLAY",
  SET_PLAYER_INPUT_ERROR = "SET_PLAYER_INPUT_ERROR",
  SET_PLAYER_COMPETITIVE_DATA = "SET_PLAYER_COMPETITIVE_DATA",
  RESET_STATE = "RESET_STATE",
}

type BattlePageActions =
  | {
      type: BattlerPageActionTypes.RESET_STATE;
      payload: null;
    }
  | {
      type: BattlerPageActionTypes.SET_PLAYER_FOR_DSPLAY;
      payload: ISetPlayerPayload;
    }
  | {
      type: BattlerPageActionTypes.SET_PLAYER_INPUT_ERROR;
      payload: ISetPlayerInputErrorPayload;
    }
  | {
      type: BattlerPageActionTypes.SET_PLAYER_COMPETITIVE_DATA;
      payload: ISetPlayerCompetitiveDataPayload;
    };

export const actionCreatorForBattleStore = <
  T extends BattlePageActions["type"]
>(
  type: T,
  payload: Extract<BattlePageActions, { type: T }>["payload"]
): BattlePageActions => {
  return { type, payload } as BattlePageActions;
};

export type { BattlePageActions };
