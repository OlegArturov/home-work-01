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
import { IBattlePagePlayer } from "../../store/models/types";

export interface IPlayersCardProps {
  player: IBattlePagePlayer;
}

export default function PlayersCard({ player }: IPlayersCardProps) {
  const { t: playersCardT } = useTranslation("base_translations", {
    keyPrefix: "pages.battle_page.players_card",
  });
  const { t } = useTranslation("base_translations");

  const {
    state,
    isBattleFinished,
    isBattleFinishedWithDraw,
    setPlayerForDisplay,
    setPlayerInputError,
  } = useContext<IBattleContext>(BattleContext);

  const { getPlayerInfo } = useBattlePlayer(player?.id);

  const [userName, setUserName] = useState<string>("");

  const onInputChange = (newValue: string) => {
    if (player?.inputError) {
      setPlayerInputError!({ error: null, playerToUpdateId: player?.id });
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
      setPlayerForDisplay({
        playerMainInfo: null,
        playerToUpdateId: player?.id,
      });
    }
  };

  return (
    <Paper sx={styles.cardWrapper}>
      {isBattleFinished && !isBattleFinishedWithDraw && (
        <Typography sx={styles.placement}>
          {playersCardT(
            `placement.${
              state?.players.every(
                (playerFromList) =>
                  player!.competitiveData!.totalScore! >=
                  playerFromList!.competitiveData!.totalScore!
              )
                ? "winner"
                : "loser"
            }`
          )}
        </Typography>
      )}
      {player?.mainInfo ? (
        <>
          <CardMedia
            sx={styles.cardImage}
            component="img"
            image={player?.mainInfo.avatar_url}
            alt="Avatar"
          />
          <Typography
            sx={styles.cardUserName}
          >{`@${player?.mainInfo.login}`}</Typography>
        </>
      ) : (
        <>
          <Typography component={"h3"} sx={styles.cardTitle}>
            <Trans
              i18nKey={playersCardT("main_title", {
                playerNumber: +player?.id + 1,
              })}
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
              name={`player${player?.id}_input`}
              id={`player${player?.id}_input`}
              isError={!!player?.inputError}
              heplerText={player?.inputError || ""}
            />
          </Box>
        </>
      )}
      {player?.competitiveData ? (
        <CompetitiveInfoList playerCompetitiveInfo={player?.competitiveData} />
      ) : (
        <Box sx={styles.cardActions}>
          <Button
            label={t(`actions.${player?.mainInfo ? "reset" : "submit"}`)}
            onClick={player?.mainInfo ? onReset : onSubmit}
            type="button"
          />
        </Box>
      )}
    </Paper>
  );
}
