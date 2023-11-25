export function useGetCurrentScroll() {
	return (refEl) => {
		const scroll = window.scrollY;
		const baseLine = window.innerHeight / 2;
		let customScroll = 0;

		if (scroll >= refEl.current?.offsetTop - baseLine) {
			//스크롤 시 기준점은 커스텀 하더라도 실제 위치값이 바뀌면 안되므로 baseLine빼주는 기능을 제거
			customScroll = scroll - refEl.current?.offsetTop;
		} else {
			//마찬가지로 해당 영역을 벗어날때는 baseLine을 빼준값으로 초기화
			customScroll = -baseLine;
		}
		return customScroll;
	};
}
