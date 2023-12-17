/*
  takeLatest(제일 마지막 요청만 수행), takeEvery (들어오는 모든 요청을 전부수행)
  all (saga관련 메서드들을 비동기적으로 호출)
  put (saga에서 만들어진 액션객체를 리듀서에 전달, 기존 dispatch랑 동일 )
  fork (saga명령어 실행함수)
  call (saga에서 api관련 axios함수를 호출하때 쓰는 함수, 두번째 인수값 전달가능)
*/

import { takeLatest, all, put, fork, call } from "redux-saga/effects";
import { fetchFlickr } from "./api";
import * as types from "./actionType";

//리듀서에 요청받은 초기 action타입을 가로채서 fetching관련 saga함수
function* callFlickr() {
  //컴포넌트에서 FLICIKR_START타입 액션객체가 전달되면 해당 이벤트를 takeLatest가 받아서 returnFlickr함수 호출
  yield takeLatest("FLICKR_START", returnFlickr);
}

//callFlickr에 의해 호출되며 외부 api함수 호출해 결과값을 액션 객체로 만들어 반환하는 saga함수
function* returnFlickr(action) {
  try {
    //fetchFlcker에는 인수로 Opt객체가 전달되야 되기 때문에 컴포넌트에서 {type: 'FLICKR_START', Opt: {type: 'user', user:'사용자아이디'}}
    const response = yield call(fetchFlickr, action.Opt);
    yield put({
      type: types.FLICKR.success,
      payload: response,
    });
  } catch (err) {
    yield put({ type: types.FLICKR.fail, payload: err });
  }
}

//위에 정의한 saga함수를 제너레이터함수에 의해 내부 로직에 맞게 동기적으로 수행 후 결과값을 rootSaga 객체로 묶어서 반환
export default function* rootSaga() {
  yield all([fork(callFlickr)]);
}
