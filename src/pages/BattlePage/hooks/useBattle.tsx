import React, { useMemo, useReducer } from "react";
import { initialState, reducer } from "../store/reducer";
import {
  IGetGithubUserReposResponseItem,
  IGitHubUser,
} from "../../../store/services/models/battle";
import {
  actionCreatorForBattleStore,
  BattlerPageActionTypes,
} from "../store/actions";
import { useLazyGetGitHubUsersReposQuery } from "../../../store/services/battle";

export default function useBattle() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [getUserReposTrigger] = useLazyGetGitHubUsersReposQuery();

  const isBattleReady = useMemo(
    () => !!(state.firstPlayer && state.secondPlayer),
    [state.firstPlayer, state.secondPlayer]
  );

  const isBattleFinished = useMemo(
    () =>
      !!(state.firstPlayerCompetitiveData && state.secondPlayerCompetitiveData),
    [state.firstPlayerCompetitiveData, state.secondPlayerCompetitiveData]
  );

  const isBattleFinishedWithDraw = useMemo(
    () =>
      state.firstPlayerCompetitiveData?.totalScore ===
      state.secondPlayerCompetitiveData?.totalScore,
    [state.firstPlayerCompetitiveData, state.secondPlayerCompetitiveData]
  );

  const setPlayerForDisplay = (
    user: IGitHubUser | null,
    playerNumber: number
  ) => {
    dispatch(
      actionCreatorForBattleStore(
        playerNumber === 1
          ? BattlerPageActionTypes.SET_FIRST_PLAYER_FOR_DISPLAY
          : BattlerPageActionTypes.SET_SECOND_PLAYER_FOR_DISPLAY,
        user
      )
    );
  };

  const setPlayerInputError = (error: string | null, playerNumber: number) => {
    dispatch(
      actionCreatorForBattleStore(
        playerNumber === 1
          ? BattlerPageActionTypes.SET_FIRST_PLAYER_INPUT_ERROR
          : BattlerPageActionTypes.SET_SECOND_PLAYER_INPUT_ERROR,
        error
      )
    );
  };

  const setPlayerCompetitiveInfo = (
    data: Array<IGetGithubUserReposResponseItem> | null,
    playerNumber: number
  ) => {
    dispatch(
      actionCreatorForBattleStore(
        playerNumber === 1
          ? BattlerPageActionTypes.SET_FIRST_PLAYER_COMPETITIVE_DATA
          : BattlerPageActionTypes.SET_SECOND_PLAYER_COMPETITIVE_DATA,
        data
      )
    );
  };

  const getUsersRepos = (userName: string, playerNumber: number) => {
    getUserReposTrigger({ userName })
      .unwrap()
      .then((res) => {
        setPlayerCompetitiveInfo(res, playerNumber);
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
