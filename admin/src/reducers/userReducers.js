import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,} from "../constants/UserConstants";


export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL
    :
      return { loading: false, error: action.payload };
    // case USER_SIGNOUT:
    //   return {};
    default:
      return state;
  }
};

export const allUserReducer = 
( state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return { loading: true };
    case ALL_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case ALL_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
