import { createContext } from "react";
import { IBattlerPaggeInitialState } from "../pages/BattlePage/store/models/types";
import {
  ISetPlayerCompetitiveDataPayload,
  ISetPlayerInputErrorPayload,
  ISetPlayerPayload,
} from "../pages/BattlePage/store/actions";

export type ISetPlayerForDisplay =
  | (({ playerMainInfo, playerToUpdateId }: ISetPlayerPayload) => void)
  | null;
export type ISetPlayerInputError =
  | (({ error, playerToUpdateId }: ISetPlayerInputErrorPayload) => void)
  | null;
export type ISetPlayerCompetitiveInfo =
  | (({
      reposData,
      playerToUpdateId,
    }: ISetPlayerCompetitiveDataPayload) => void)
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
