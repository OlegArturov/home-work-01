import { List, ListItem, SxProps, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import BattleContext, {
  IBattleContext,
} from "../../../../contexts/BattleContext";

export interface ICompetitiveInfoListProps {
  playerNumber: number;
}

export default function CompetitiveInfoList({
  playerNumber,
}: ICompetitiveInfoListProps) {
  const { t: playersCardT } = useTranslation("base_translations", {
    keyPrefix: "pages.battle_page.players_card",
  });

  const styles: Record<string, SxProps> = {
    listStyles: {
      backgroundColor: "#fff",
      borderRadius: "5px",
      m: "5px",
    },
  };

  const { state } = useContext<IBattleContext>(BattleContext);

  const currentCompetitiveInfo = useMemo(
    () =>
      playerNumber === 1
        ? state?.firstPlayerCompetitiveData
        : state?.secondPlayerCompetitiveData,

    [
      playerNumber,
      state?.firstPlayerCompetitiveData,
      state?.secondPlayerCompetitiveData,
    ]
  );

  return (
    currentCompetitiveInfo && (
      <List sx={styles.listStyles}>
        <ListItem>
          <Typography>
            {playersCardT("list_titles.followers")}
            {currentCompetitiveInfo.followersCount}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            {playersCardT("list_titles.repositories_stars")}
            {currentCompetitiveInfo.repositoriesStars}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography fontWeight={600}>
            {playersCardT("list_titles.total_score")}
            {currentCompetitiveInfo.totalScore}
          </Typography>
        </ListItem>
      </List>
    )
  );
}
