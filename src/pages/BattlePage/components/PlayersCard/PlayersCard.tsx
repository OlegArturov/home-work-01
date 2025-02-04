import { Box, CardMedia, Paper, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import BaseInput from "../../../../components/BaseInput/BaseInput";
import Button from "../../../../components/Button/Button";
import BattleContext, {
  IBattleContext,
} from "../../../../contexts/BattleContext";
import CompetitiveInfoList from "../CompetitiveInfoList/CompetitiveInfoList";
import useBattlePlayer from "../../hooks/useBattlePlayer";
import { styles } from "./styles";

export interface IPlayersCardProps {
  playerNumber: number;
}

export default function PlayersCard({ playerNumber }: IPlayersCardProps) {
  const { t: playersCardT } = useTranslation("base_translations", {
    keyPrefix: "pages.battle_page.players_card",
  });
  const { t } = useTranslation("base_translations");

  const {
    state,
    setPlayerForDisplay,
    setPlayerInputError,
    isBattleFinished,
    isBattleFinishedWithDraw,
  } = useContext<IBattleContext>(BattleContext);

  const { currentCompetitiveInfo, currentError, currentUser, getPlayerInfo } =
    useBattlePlayer(playerNumber, state!);

  const [userName, setUserName] = useState<string>("");

  const onInputChange = (newValue: string) => {
    const currentPlayerError =
      playerNumber === 1
        ? state?.firstPlayerInputError
        : state?.secondPlayerInputError;
    if (currentPlayerError) {
      setPlayerInputError!(null, playerNumber);
    }
    setUserName(newValue);
  };

  const onSubmit = () => {
    if (userName?.length >= 3) {
      getPlayerInfo(
        userName,
        setPlayerForDisplay,
        setUserName,
        setPlayerInputError
      );
    }
  };

  const onReset = () => {
    if (setPlayerForDisplay) {
      setPlayerForDisplay(null, playerNumber);
    }
  };

  return (
    <Paper sx={styles.cardWrapper}>
      {isBattleFinished && !isBattleFinishedWithDraw && (
        <Typography sx={styles.placement}>
          {playersCardT(
            `placement.${
              currentCompetitiveInfo.current!.totalScore >
              currentCompetitiveInfo.rival!.totalScore
                ? "winner"
                : "loser"
            }`
          )}
        </Typography>
      )}
      {currentUser ? (
        <>
          <CardMedia
            sx={styles.cardImage}
            component="img"
            image={currentUser.avatar_url}
            alt="Avatar"
          />
          <Typography
            sx={styles.cardUserName}
          >{`@${currentUser.login}`}</Typography>
        </>
      ) : (
        <>
          <Typography component={"h3"} sx={styles.cardTitle}>
            <Trans
              i18nKey={playersCardT("main_title", { playerNumber })}
              components={{
                b: <b />,
              }}
            />
          </Typography>
          <Box sx={styles.cardContent}>
            <BaseInput
              valueForInput={userName}
              setValueFromInput={(newValue) => onInputChange(newValue)}
              placeholder={playersCardT("input_placeholder") || ""}
              name={`player${playerNumber}_input`}
              id={`player${playerNumber}_input`}
              isError={!!currentError}
              heplerText={currentError || ""}
            />
          </Box>
        </>
      )}
      {currentCompetitiveInfo.current ? (
        <CompetitiveInfoList playerNumber={playerNumber} />
      ) : (
        <Box sx={styles.cardActions}>
          <Button
            label={t(`actions.${currentUser ? "reset" : "submit"}`)}
            onClick={currentUser ? onReset : onSubmit}
            type="button"
          />
        </Box>
      )}
    </Paper>
  );
}
