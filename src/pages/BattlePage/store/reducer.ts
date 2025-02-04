import {
  IGetGithubUserReposResponseItem,
  IGitHubUserCompetitiveInfo,
} from "../../../store/services/models/battle";
import { BattlePageActions, BattlerPageActionTypes } from "./actions";
import { IBattlerPaggeInitialState } from "./models/types";

const initialState: IBattlerPaggeInitialState = {
  firstPlayer: null,
  secondPlayer: null,
  firstPlayerInputError: null,
  secondPlayerInputError: null,
  firstPlayerCompetitiveData: null,
  secondPlayerCompetitiveData: null,
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

const reducer = (
  state: IBattlerPaggeInitialState = initialState,
  { type, payload }: BattlePageActions
): IBattlerPaggeInitialState => {
  switch (type) {
    case BattlerPageActionTypes.SET_FIRST_PLAYER_FOR_DISPLAY:
      return { ...state, firstPlayer: payload };
    case BattlerPageActionTypes.SET_SECOND_PLAYER_FOR_DISPLAY:
      return { ...state, secondPlayer: payload };
    case BattlerPageActionTypes.SET_FIRST_PLAYER_INPUT_ERROR:
      return { ...state, firstPlayerInputError: payload };
    case BattlerPageActionTypes.SET_SECOND_PLAYER_INPUT_ERROR:
      return { ...state, secondPlayerInputError: payload };
    case BattlerPageActionTypes.SET_FIRST_PLAYER_COMPETITIVE_DATA:
      return {
        ...state,
        firstPlayerCompetitiveData: calculateCompetitiveData(
          state.firstPlayer?.followers || 0,
          payload
        ),
      };
    case BattlerPageActionTypes.SET_SECOND_PLAYER_COMPETITIVE_DATA:
      return {
        ...state,
        secondPlayerCompetitiveData: calculateCompetitiveData(
          state.secondPlayer?.followers || 0,
          payload
        ),
      };
    case BattlerPageActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export { reducer, initialState };
