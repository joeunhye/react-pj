export function useSplitText() {
	return (ref) => {
		let text = ref.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-delay:${0.1 * count}s'>${letter}</span>`;
			count++;
		}
		ref.current.innerHTML = tags;
	};
}
