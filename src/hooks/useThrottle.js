import { useRef } from 'react';

// 인수로 Throttle을 적용할 함수를 전달받음.
export function useThrottle(func) {
	// 내부적으로 useRef를 통해서 setTimeout의 리턴값을 받을 참조객체 생성 (커스텀훅이기 때문에 내장훅 활용가능)
	const eventBlockr = useRef(null);
	return () => {
		if (eventBlockr.current) return;
		eventBlockr.current = setTimeout(() => {
			func();
			eventBlockr.current = null;
		}, 500);
	};
}
