import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { categoryListReducer } from "./reducers/categoryreducers";
import { postListReducer } from "./reducers/postReducer";
import { subCategoryListReducer } from "./reducers/subCategoryReducer";
import { allUserReducer,  userSigninReducer } from "./reducers/userReducers";
import {  rssListReducer } from "./reducers/rssReducers"
const initialState = {};
const reducer = combineReducers({
categoryList:categoryListReducer,
postList: postListReducer,
subCategoryList:subCategoryListReducer,
userSignin: userSigninReducer,
rssList:rssListReducer ,
allUsers:allUserReducer ,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
