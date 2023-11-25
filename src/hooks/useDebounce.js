import { useRef, useState } from 'react';

//인수로 화면의 렌더링을 발생시키는 특정 state값을 받음
export function useDebounce(value) {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	//내부적으로 새로운 state에 옮겨담음
	const eventBlockr = useRef(null);

	//인수로 받은 state값이 변경될때마다 setTimeout호출을 계속 초기화
	clearTimeout(eventBlockr.current);

	//아래 setIntimeout에 의해서 원래 state값이 0.5초안에 계속 변경되는 중이면
	//새로운 state로 옮겨담지 않고 변경되는 값이 멈춘 뒤, 0.5초가 지나야지만 새로운 state로 옮겨줌 (debouncing처리)
	eventBlockr.current = setTimeout(() => {
		setDebouncedVal(value);
	}, 500);

	return DebouncedVal;
}
