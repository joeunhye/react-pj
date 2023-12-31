import "./btns.scss";
import { useRef, useEffect, useState } from "react";
import Anime from "../../../asset/anime.js";
import { useThrottle } from "../../../hooks/useThrottle.js";

function Btns() {
	//활성화순번, 버튼 그룹요소, section그룹요소가 담길 참조 객체 생성
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const btns = useRef(null);
	const scrollFrame = btns.current?.parentElement.parentElement;

	//컴포넌트 마운트시 윈도우 스크롤이벤트에 연결될 함수
	//activation함수를 setTimeout을 묶어놓은 다음에 setTimeout이 끝나야지만 eventBlocker값을 비움으로써
	//강제로 0.5초동안 함수 호출을 막아줌
	const activation = () => {
		const scroll = btns.current?.parentElement.parentElement.scrollTop;
		console.log(scroll);
		secs.current.forEach((el, idx) => {
			if (scroll >= el.offsetTop - window.innerHeight / 2) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove("on"));
				btns.current.children[idx]?.classList.add("on");

				Array.from(secs.current).forEach(sec => sec.classList.remove("on"));
				secs.current[idx].classList.add("on");
			}
		});
	};

	const activation2 = useThrottle(activation);
	const handleClick = idx => {
		new Anime(btns.current?.parentElement.parentElement, { scroll: secs.current[idx].offsetTop }, { duration: 500 });
	};

	//컴포넌트 마운트시
	useEffect(() => {
		//빈 참조객체에 버튼과 section요소 담아줌
		secs.current = btns.current.parentElement.querySelectorAll(".myScroll");
		setNum(secs.current.length);

		//window scroll이벤트에 activation함수 연결
		scrollFrame?.addEventListener("scroll", activation2);
		// return () => scrollFrame?.removeEventListener("scroll", activation2);
	}, [activation2, scrollFrame]);

	useEffect(activation, [Num, scrollFrame]);

	return (
		<ul className="btns" ref={btns}>
			{Array(Num)
				.fill("abc")
				.map((_, idx) => {
					return <li key={idx} onClick={() => handleClick(idx)}></li>;
				})}
		</ul>
	);
}

export default Btns;
