import { RSS_LIST_FAIL, RSS_LIST_REQUEST, RSS_LIST_SUCCESS, SINGLE_RSS_LIST_FAIL, SINGLE_RSS_LIST_REQUEST, SINGLE_RSS_LIST_SUCCESS } from "../constants/rssConstants";


export const rssListReducer = (
  state = { loading: true, rss: [] },
  action
) => {
  switch (action.type) {
    case RSS_LIST_REQUEST:
      return { loading: true };
    case RSS_LIST_SUCCESS:
      return {
        loading: false,
        rss: action.payload,
      };
    case RSS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const singleRssReducer = (
  state = { loading: true, rssData: [] },
  action
) => {
  switch (action.type) {
    case SINGLE_RSS_LIST_REQUEST:
      return { loading: true };
    case SINGLE_RSS_LIST_SUCCESS:
      return {
        loading: false,
        rssData: action.payload,
      };
    case SINGLE_RSS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
