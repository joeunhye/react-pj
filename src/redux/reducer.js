import { combineReducers } from 'redux';
import * as types from './actionType';
import clientAction from './clientActionType';

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

const modalReducer = (state = { modal: fasle }, action) => {
  if (action.type === clientAction.modal)
    return { ...state, modal: action.payload };
  else return state;
};

const menuReducer = (state = { menu: fasle }, action) => {
  if (action.type === clientAction.menu)
    return { ...state, menu: action.payload };
  else return state;
};

const darkReducer = (state = { dark: fasle }, action) => {
  if (action.type === clientAction.menu)
    return { ...state, dark: action.payload };
  else return state;
};

const reducers = combineReducers({
  flickrReducer,
  youtubeReducer,
  departmentReducer,
  historyReducer,
  modalReducer,
  menuReducer,
  darkReducer,
});
export default reducers;
