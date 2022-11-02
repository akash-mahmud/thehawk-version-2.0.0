import axios from "axios";
import  Axios  from "axios";
import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,} from "../constants/UserConstants";




export const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/user', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    const expiry = {time: Date.now()+86400000}
    localStorage.setItem("userInfoExpiry", JSON.stringify(expiry))
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        // error.response && error.response.data.message
        //   ?
           error.response.data.message
          // : error.message,
    });
  }
};

export const allUserAction = () => async (dispatch) => {
  dispatch({
    type: ALL_USER_REQUEST,
  });
  try {
   
    const {data} = await axios.get('/api/user', {
        
      headers: {
        Accept:"appllication/json",
        "Content-Type":"appllication/json"
      },
      credentials:"include"
    })
    // const data = await res.json();
    dispatch({ type: ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_USER_FAIL, payload: error.message });
  }
};
