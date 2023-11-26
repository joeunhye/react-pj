import { useCallback, useEffect, useRef } from 'react';
import './Info.scss';
import { useGetCurrentScroll } from '../../../hooks/useGetCurrentScroll';

function Info() {
	const currentEl = useRef(null);
	const boxEl = useRef(null);
	const getScroll = useGetCurrentScroll();

	const handleClick = useCallback(() => {
		const modifiedScroll = getScroll(currentEl);
		boxEl.current.style.transform = `rotate(${modifiedScroll}deg) scale(${1 + modifiedScroll / 300})`;
	}, [getScroll]);

	useEffect(() => {
		window.addEventListener('scroll', handleClick);
		return () => window.removeEventListener('scroll', handleClick);
	}, [handleClick]);

	return (
		<section className='info myScroll' ref={currentEl}>
			<div className='box' ref={boxEl}></div>
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
