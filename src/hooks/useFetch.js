export function useFetch() {
	return (url, setValue, setkey) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				setkey && setkey(Object.keys(json)[0]);
				setValue && setValue(Object.values(json)[0]);
			});
	};
}
