import { combineReducers } from "redux";
import * as actionType from "./actionType";

const flickrReducer = (state = { flickr: [] }, action) => {
  switch (action.type) {
    // 컴포넌트에서 dispatch로 전달되는 초기 액션 타입
    // 해당 액션 타입을 리듀서가 받자마자 해당 업무를 saga한테 전달
    // saga가 추후 액션 타입을 전달받아서 데이터 fetching 요청 시작 (success 액션, fail 액션 객체 생성)
    case actionType.FLICKR.start:
      return state;

    // saga가 전달한 액션타입이 success일 때 데이터 가공
    case actionType.FLICKR.succes:
      return { ...state, flickr: action.payload };

    // saga가 전달한 액션타입이 fail일 때 데이터 가공
    case actionType.FLICKR.fail:
      return { ...state, flickr: action.payload };

    // 위 세가지 경우의 액션 타입이 아닐 경우 아무런 작업 없이 기존 객체 리턴
    default:
      return state;
  }
};

const reducers = combineReducers({ flickrReducer });

export default reducers;
