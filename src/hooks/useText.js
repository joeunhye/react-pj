export function useSplitText() {
	return (ref, interval = 0, delay = 0) => {
		let text = ref.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-delay:${interval * count + delay}s'>${letter}</span>`;
			count++;
		}
		ref.current.innerHTML = tags;
	};
}

export function useCustomText(type) {
	const toUpperText = (txt) => txt.charAt(0).toUpperCase() + txt.slice(1);

	// 훅 호출 시 인수로 전달된 문자값이 shorten이면 말줄임표를 붙이는 함수 리턴
	// 훅 호출 시 인수로 전달된 문자값이 combined이면 구분자를 통해서 문자를 분리한 뒤 특정 문자를 이어 붙이는 함수 리턴
	if (type === 'shorten') {
		return (txt, len) => {
			if (txt.length > len) {
				return txt.slice(0, len) + '...';
			} else {
				return txt;
			}
		};
	}
	if (type === 'combined') {
		return (txt, spc) => {
			const resultText = txt
				.split(/-|_|\+|\./)
				.map((data) => toUpperText(data))
				.join(spc);

			return resultText;
		};
	}
}
