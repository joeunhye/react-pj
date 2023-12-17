import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

/*
	actionType.js 
	--문자열인 액션타입을 객체 형태로 미리 정의해서 재활용하기 위한 액션타임 모음파일

	store.js
	--전역 객체 생성, saga 미들웨어 추가 설정

	reducer.js
	--전역 데이터 변경함수 (기존 리듀서에 비래 pending, fullfiled, rejected에 대한 추가작업)

	api.js
	--fetching함수를 모아놓는 파일 (컴포넌트 외부에서 fetching함수를 관리하기 위함)

	saga.js
	--리듀서의 특정 액션을 인지해서 비동기 데이터 호출 및 데이터 상태에 따른 새로운 액션 객체를 생성한 뒤 다시 리듀서에 전달 
*/
