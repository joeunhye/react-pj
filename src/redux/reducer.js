import { combineReducers } from 'redux';
import * as types from './actionType';

const flickrReducer = (state = { flickr: [] }, action) => {
  if (action.type === types.FLICKR.start) return state;
  else if (action.type === types.FLICKR.success)
    return { ...state, flickr: action.payload };
  else if (action.type === types.FLICKR.fail)
    return { ...state, flickr: action.payload };
  else return state;
};

const youtubeReducer = (state = { youtube: [] }, action) => {
  if (action.type === types.YOUTUBE.start) return state;
  else if (action.type === types.YOUTUBE.success)
    return { ...state, youtube: action.payload };
  else if (action.type === types.YOUTUBE.fail)
    return { ...state, youtube: action.payload };
  else return state;
};

const departmentReducer = (state = { department: [] }, action) => {
  if (action.type === types.DEPARTMENT.start) return state;
  else if (action.type === types.DEPARTMENT.success)
    return { ...state, department: action.payload };
  else if (action.type === types.DEPARTMENT.fail)
    return { ...state, department: action.payload };
  else return state;
};

const historyReducer = (state = { history: [] }, action) => {
  if (action.type === types.HISTORY.start) return state;
  else if (action.type === types.HISTORY.success)
    return { ...state, history: action.payload };
  else if (action.type === types.HISTORY.fail)
    return { ...state, history: action.payload };
  else return state;
};

const reducers = combineReducers({
  flickrReducer,
  youtubeReducer,
  departmentReducer,
  historyReducer,
});
export default reducers;
