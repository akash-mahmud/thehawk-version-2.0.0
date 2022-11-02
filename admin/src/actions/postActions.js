import Axios from "axios";
import {
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "../constants/postConstants";

export const listpost = () => async (dispatch) => {
  dispatch({
    type: POST_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/post`);
    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: POST_LIST_FAIL, payload: error.message });
  }
};
