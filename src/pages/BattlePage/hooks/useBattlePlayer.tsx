// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useLazyGetGitHubUserQuery } from "../../../store/services/battle";
import {
  ISetPlayerForDisplay,
  ISetPlayerInputError,
} from "../../../contexts/BattleContext";
import { useTranslation } from "react-i18next";

export default function useBattlePlayer(playerId: string) {
  const { t: playersCardT } = useTranslation("base_translations", {
    keyPrefix: "pages.battle_page.players_card",
  });
  const [trigger] = useLazyGetGitHubUserQuery();

  const getPlayerInfo = (
    nameForSearch: string,
    setter: ISetPlayerForDisplay,
    setUserName: (newName: string) => void,
    setPlayerInputError: ISetPlayerInputError
  ) => {
    trigger({ userName: nameForSearch })
      .unwrap()
      .then((playerMainInfo) => {
        setter!({ playerMainInfo, playerToUpdateId: playerId });
        setUserName("");
      })
      .catch((err) => {
        setPlayerInputError!({
          error: playersCardT("input_helper_text_error"),
          playerToUpdateId: playerId,
        });
        console.error(err);
      });
  };
  return { getPlayerInfo };
}
