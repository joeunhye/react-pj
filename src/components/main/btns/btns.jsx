import './btns.scss';
import { useRef, useEffect } from 'react';

function btns() {
	//활성화순번, 버튼 그룹요소, section그룹요소가 담길 참조 객체 생성
	const num = useRef(0);
	const secs = useRef(null);
	const btns = useRef(null);

	//컴포넌트 마운트시 윈도우 스크롤이벤트에 연결될 함수
	const activation = () => {
		const scroll = window.scrollY;
		secs.current.forEach((el, idx) => {
			if (scroll >= el.offsetTop - window.innerHeight / 2) {
				Array.from(btns.current.children).forEach((btn) => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	//컴포넌트 마운트시
	useEffect(() => {
		//빈 참조객체에 버튼과 section요소 담아줌
		secs.current = document.querySelectorAll('.myScroll');
		num.current = secs.current.length;

		//window scroll이벤트에 activation함수 연결
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('scroll', activation);
		};
	}, []);

	console.log(num.current);
	return (
		<ul className='btns' ref={btns}>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === 0 ? 'on' : ''}></li>;
				})}
		</ul>
	);
}

export default btns;