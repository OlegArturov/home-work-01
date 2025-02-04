import React, { useMemo } from "react";
import { IBattlerPaggeInitialState } from "../store/models/types";
import { useLazyGetGitHubUserQuery } from "../../../store/services/battle";
import {
  ISetPlayerForDisplay,
  ISetPlayerInputError,
} from "../../../contexts/BattleContext";
import { useTranslation } from "react-i18next";

export default function useBattlePlayer(
  playerNumber: number,
  state: IBattlerPaggeInitialState
) {
  const { t: playersCardT } = useTranslation("base_translations", {
    keyPrefix: "pages.battle_page.players_card",
  });
  const [trigger] = useLazyGetGitHubUserQuery();

  const currentUser = useMemo(
    () => (playerNumber === 1 ? state?.firstPlayer : state?.secondPlayer),
    [playerNumber, state?.firstPlayer, state?.secondPlayer]
  );
  const currentError = useMemo(
    () =>
      playerNumber === 1
        ? state?.firstPlayerInputError
        : state?.secondPlayerInputError,
    [playerNumber, state?.firstPlayerInputError, state?.secondPlayerInputError]
  );

  const currentCompetitiveInfo = useMemo(
    () =>
      playerNumber === 1
        ? {
            current: state?.firstPlayerCompetitiveData,
            rival: state?.secondPlayerCompetitiveData,
          }
        : {
            current: state?.secondPlayerCompetitiveData,
            rival: state?.firstPlayerCompetitiveData,
          },
    [
      playerNumber,
      state?.firstPlayerCompetitiveData,
      state?.secondPlayerCompetitiveData,
    ]
  );

  const getPlayerInfo = (
    nameForSearch: string,
    setter: ISetPlayerForDisplay,
    setUserName: (newName: string) => void,
    setPlayerInputError: ISetPlayerInputError
  ) => {
    trigger({ userName: nameForSearch })
      .unwrap()
      .then((res) => {
        setter!(res, playerNumber);
        setUserName("");
      })
      .catch((err) => {
        setPlayerInputError!(
          playersCardT("input_helper_text_error"),
          playerNumber
        );
        console.error(err);
      });
  };
  return { currentUser, currentError, currentCompetitiveInfo, getPlayerInfo };
}
