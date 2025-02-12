import {
  IGetGithubUserReposResponseItem,
  IGitHubUserCompetitiveInfo,
} from "../../../store/services/models/battle";
import {
  BattlePageActions,
  BattlerPageActionTypes,
  ISetPlayerCompetitiveDataPayload,
  ISetPlayerInputErrorPayload,
  ISetPlayerPayload,
} from "./actions";
import { IBattlePagePlayer, IBattlerPaggeInitialState } from "./models/types";

const initialState: IBattlerPaggeInitialState = {
  players: [
    {
      id: "0",
      mainInfo: null,
      inputError: null,
      competitiveData: null,
    },
    {
      id: "1",
      mainInfo: null,
      inputError: null,
      competitiveData: null,
    },
  ],
};

const calculateCompetitiveData = (
  followersCount: number,
  reposData: Array<IGetGithubUserReposResponseItem> | null
): IGitHubUserCompetitiveInfo | null => {
  if (!reposData) {
    return null;
  }
  const repositoriesStars = reposData.reduce(
    (acc, curr) => acc + curr.stargazers_count,
    0
  );
  const totalScore = followersCount + repositoriesStars;
  return { followersCount, repositoriesStars, totalScore };
};

const updatePlayerMainInfo = (
  prevPlayers: IBattlePagePlayer[],
  { playerMainInfo, playerToUpdateId }: ISetPlayerPayload
) => {
  return prevPlayers.map((player) => ({
    ...player,
    mainInfo: player.id === playerToUpdateId ? playerMainInfo : player.mainInfo,
  }));
};

const updatePlayerInputError = (
  prevPlayers: IBattlePagePlayer[],
  { error, playerToUpdateId }: ISetPlayerInputErrorPayload
) => {
  return prevPlayers.map((player) => ({
    ...player,
    inputError: player.id === playerToUpdateId ? error : player.inputError,
  }));
};

const updatePlayerCompetitiveData = (
  prevPlayers: IBattlePagePlayer[],
  { reposData, playerToUpdateId }: ISetPlayerCompetitiveDataPayload
) => {
  return prevPlayers.map((player) => ({
    ...player,
    competitiveData:
      player.id === playerToUpdateId
        ? calculateCompetitiveData(player.mainInfo?.followers || 0, reposData)
        : player.competitiveData,
  }));
};
const reducer = (
  state: IBattlerPaggeInitialState = initialState,
  { type, payload }: BattlePageActions
): IBattlerPaggeInitialState => {
  switch (type) {
    case BattlerPageActionTypes.SET_PLAYER_FOR_DSPLAY:
      return {
        ...state,
        players: updatePlayerMainInfo(state.players, payload),
      };
    case BattlerPageActionTypes.SET_PLAYER_INPUT_ERROR:
      return {
        ...state,
        players: updatePlayerInputError(state.players, payload),
      };
    case BattlerPageActionTypes.SET_PLAYER_COMPETITIVE_DATA:
      return {
        ...state,
        players: updatePlayerCompetitiveData(state.players, payload),
      };
    case BattlerPageActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export { reducer, initialState };
