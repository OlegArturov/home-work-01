// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useMemo, useReducer } from "react";
import { initialState, reducer } from "../store/reducer";
import {
  actionCreatorForBattleStore,
  BattlerPageActionTypes,
  ISetPlayerCompetitiveDataPayload,
  ISetPlayerInputErrorPayload,
  ISetPlayerPayload,
} from "../store/actions";
import { useLazyGetGitHubUsersReposQuery } from "../../../store/services/battle";

export default function useBattle() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [getUserReposTrigger] = useLazyGetGitHubUsersReposQuery();

  const isBattleReady = useMemo(
    () => state.players?.every((player) => player.mainInfo),
    [state.players]
  );

  const isBattleFinished = useMemo(
    () => state.players?.every((player) => player.competitiveData),
    [state.players]
  );

  const isBattleFinishedWithDraw = useMemo(
    () =>
      state.players?.every((player, index) => {
        return (
          player.competitiveData?.totalScore ===
          state.players[index === 0 ? index : index - 1]?.competitiveData
            ?.totalScore
        );
      }),
    [state.players]
  );

  const setPlayerForDisplay = (payload: ISetPlayerPayload) => {
    dispatch(
      actionCreatorForBattleStore(
        BattlerPageActionTypes.SET_PLAYER_FOR_DSPLAY,
        payload
      )
    );
  };

  const setPlayerInputError = (payload: ISetPlayerInputErrorPayload) => {
    dispatch(
      actionCreatorForBattleStore(
        BattlerPageActionTypes.SET_PLAYER_INPUT_ERROR,
        payload
      )
    );
  };

  const setPlayerCompetitiveInfo = (
    payload: ISetPlayerCompetitiveDataPayload
  ) => {
    dispatch(
      actionCreatorForBattleStore(
        BattlerPageActionTypes.SET_PLAYER_COMPETITIVE_DATA,
        payload
      )
    );
  };

  const getUsersRepos = (userName: string, playerToUpdateId: string) => {
    getUserReposTrigger({ userName })
      .unwrap()
      .then((reposData) => {
        setPlayerCompetitiveInfo({ playerToUpdateId, reposData });
      })
      .catch((err) => console.error(err));
  };

  const resetBattleState = () => {
    dispatch(
      actionCreatorForBattleStore(BattlerPageActionTypes.RESET_STATE, null)
    );
  };

  return {
    state,
    setPlayerForDisplay,
    setPlayerInputError,
    getUsersRepos,
    setPlayerCompetitiveInfo,
    resetBattleState,
    isBattleReady,
    isBattleFinished,
    isBattleFinishedWithDraw,
  };
}
