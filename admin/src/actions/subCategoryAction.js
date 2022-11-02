import Axios from "axios";
import { SUB_CATEGORY_LIST_FAIL, SUB_CATEGORY_LIST_REQUEST, SUB_CATEGORY_LIST_SUCCESS } from "../constants/subCategorConstants";


export const listSubCategory = () => async (dispatch) => {
  dispatch({
    type: SUB_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/subCategory`);
    dispatch({ type: SUB_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SUB_CATEGORY_LIST_FAIL, payload: error.message });
  }
};
