import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import PlayersCard from "./components/PlayersCard/PlayersCard";
import BattleContext from "../../contexts/BattleContext";

import Button from "../../components/Button/Button";
import useBattle from "./hooks/useBattle";
import { styles } from "./styles";

export default function BattlePage() {
  const { t: battlePageT } = useTranslation("base_translations", {
    keyPrefix: "pages.battle_page",
  });
  const { t } = useTranslation("base_translations");

  const {
    state,
    getUsersRepos,
    setPlayerForDisplay,
    setPlayerInputError,
    resetBattleState,
    setPlayerCompetitiveInfo,
    isBattleReady,
    isBattleFinished,
    isBattleFinishedWithDraw,
  } = useBattle();

  const handleOnBattleClick = () => {
    state.players.forEach((player) => {
      getUsersRepos(player.mainInfo?.login as string, player.id);
    });
  };

  const handleOnRestartClick = () => {
    resetBattleState();
  };

  return (
    <Box sx={styles.mainWrapper}>
      <Typography component={"h1"} sx={styles.mainTitle}>
        {battlePageT("main_title")}
      </Typography>
      <BattleContext.Provider
        value={{
          state,
          setPlayerForDisplay,
          setPlayerInputError,
          setPlayerCompetitiveInfo,
          isBattleFinished,
          isBattleFinishedWithDraw,
        }}
      >
        <Box sx={styles.playersCardsWrapper}>
          {isBattleFinished && isBattleFinishedWithDraw && (
            <Typography sx={styles.drawPlacement}>
              {battlePageT("players_card.placement.draw")}
            </Typography>
          )}
          {state.players.map((player) => (
            <PlayersCard player={player} key={player.id} />
          ))}
        </Box>
        <Box sx={styles.actionWrapper}>
          {(isBattleReady || isBattleFinished) && (
            <Button
              label={t(`actions.${isBattleFinished ? "restart" : "battle"}`)}
              type="button"
              onClick={
                isBattleFinished ? handleOnRestartClick : handleOnBattleClick
              }
            />
          )}
        </Box>
      </BattleContext.Provider>
    </Box>
  );
}
