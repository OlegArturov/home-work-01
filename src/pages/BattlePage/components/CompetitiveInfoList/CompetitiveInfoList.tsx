import { List, ListItem, SxProps, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { IGitHubUserCompetitiveInfo } from "../../../../store/services/models/battle";

export interface ICompetitiveInfoListProps {
  playerCompetitiveInfo: IGitHubUserCompetitiveInfo;
}

export default function CompetitiveInfoList({
  playerCompetitiveInfo,
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

  return (
    playerCompetitiveInfo && (
      <List sx={styles.listStyles}>
        <ListItem>
          <Typography>
            {playersCardT("list_titles.followers")}
            {playerCompetitiveInfo.followersCount}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            {playersCardT("list_titles.repositories_stars")}
            {playerCompetitiveInfo.repositoriesStars}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography fontWeight={600}>
            {playersCardT("list_titles.total_score")}
            {playerCompetitiveInfo.totalScore}
          </Typography>
        </ListItem>
      </List>
    )
  );
}
