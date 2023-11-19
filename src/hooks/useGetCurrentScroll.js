export function useGetCurrentScroll() {
    return (refEl) => {
		const scroll = window.scrollY;
		let customScroll = 0;
		if(scroll >= refEl.current?.offsetTop - window.innerHeight / 2) {
			customScroll = scroll - refEl.current?.offsetTop + window.innerHeight / 2;
		}else {
			customScroll = 0;
		}
		return customScroll;
	};
}