import { useCallback, useEffect, useRef, useState } from "react";
import "./Info.scss";
import { useGetCurrentScroll } from "../../../hooks/useGetCurrentScroll";

function Info() {
	const [Frame, setFrame] = useState(null);
	const currentEl = useRef(null);
	const boxEl = useRef(null);
	// const scrollFrame = currentEl.current?.closest(".wrap");
	const getScroll = useGetCurrentScroll(Frame);

	const handleScroll = useCallback(() => {
		const modifiedScroll = getScroll(currentEl);
		boxEl.current.style.transform = `rotate(${modifiedScroll}deg) scale(${1 + modifiedScroll / 300})`;
	}, [getScroll]);

	useEffect(() => {
		//Frame요소를 참조 객체에 담으면 state가 아니기 때문에 DOM요소가 추후에 담기더라도 컴포넌트가 재렌더링 안되고 이벤트연결아 안됨
		//해결방법: 해당요소를 State에 담아주고 해당 State를 의존성 배열로 해서 해당 값이 변경되면 다시 이벤트 연결 시도
		setFrame(currentEl.current?.closest(".wrap"));
	}, []);

	useEffect(() => {
		//Frame에 돔이 담겨서 재랜더링 되면 해다 구문안에서 이벤트 연결 (Banner.jsx도 동일하게 해결)
		Frame?.addEventListener("scroll", handleScroll);
		return () => Frame?.removeEventListener("scroll", handleScroll);
	}, [Frame, handleScroll]);

	return (
		<section className="info myScroll" ref={currentEl}>
			<div className="box" ref={boxEl}></div>
		</section>
	);
}

export default Info;

// document.querySelector vs useRef(DOM) (참고로 둘다 realDOM을 제어)
// document.querySelector : 이미 이전 렌더링 사이클에서 돔으로 변경된 신뢰할수 없는 예전 돔
// useRef: 똑같이 RealDOM을 담긴하지만 앞으로 realDOM으로 변화될 신뢰할수 있는 최신 돔 상태

//State vs useRef 해당 값의 변경및 적용 시점
//state값은 해당 렌더링사이클에서 값이 변경되는 것은 맞지만 실제 그 값이 적용되는 시점은 다음번 렌더링 사이클
//useRef은 해당 렌더링사이클에 값도 변경되고 바로 반영도 됨
