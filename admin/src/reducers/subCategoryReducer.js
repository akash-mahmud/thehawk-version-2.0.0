import { SUB_CATEGORY_LIST_FAIL, SUB_CATEGORY_LIST_REQUEST, SUB_CATEGORY_LIST_SUCCESS } from "../constants/subCategorConstants";


export const subCategoryListReducer = (
  state = { loading: true, subCategories: [] },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case SUB_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        subCategories: action.payload,
      };
    case SUB_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
