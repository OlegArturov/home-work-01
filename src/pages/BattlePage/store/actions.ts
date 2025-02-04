import {
  IGetGithubUserReposResponseItem,
  IGitHubUser,
} from "../../../store/services/models/battle";

export enum BattlerPageActionTypes {
  SET_FIRST_PLAYER_FOR_DISPLAY = "SET_FIRST_PLAYER_FOR_DISPLAY",
  SET_SECOND_PLAYER_FOR_DISPLAY = "SET_SECOND_PLAYER_FOR_DISPLAY",
  SET_FIRST_PLAYER_INPUT_ERROR = "SET_FIRST_PLAYER_INPUT_ERROR",
  SET_SECOND_PLAYER_INPUT_ERROR = "SET_SECOND_PLAYER_INPUT_ERROR",
  SET_FIRST_PLAYER_COMPETITIVE_DATA = "SET_FIRST_PLAYER_COMPETITIVE_DATA",
  SET_SECOND_PLAYER_COMPETITIVE_DATA = "SET_SECOND_PLAYER_COMPETITIVE_DATA",
  RESET_STATE = "RESET_STATE",
}

type BattlePageActions =
  | {
      type: BattlerPageActionTypes.SET_FIRST_PLAYER_FOR_DISPLAY;
      payload: IGitHubUser | null;
    }
  | {
      type: BattlerPageActionTypes.SET_SECOND_PLAYER_FOR_DISPLAY;
      payload: IGitHubUser | null;
    }
  | {
      type: BattlerPageActionTypes.SET_FIRST_PLAYER_INPUT_ERROR;
      payload: string | null;
    }
  | {
      type: BattlerPageActionTypes.SET_SECOND_PLAYER_INPUT_ERROR;
      payload: string | null;
    }
  | {
      type: BattlerPageActionTypes.SET_FIRST_PLAYER_COMPETITIVE_DATA;
      payload: Array<IGetGithubUserReposResponseItem> | null;
    }
  | {
      type: BattlerPageActionTypes.SET_SECOND_PLAYER_COMPETITIVE_DATA;
      payload: Array<IGetGithubUserReposResponseItem> | null;
    }
  | {
      type: BattlerPageActionTypes.RESET_STATE;
      payload: null;
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
