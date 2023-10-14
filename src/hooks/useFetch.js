export function useFetch() {
	return (url, setValue, setkey) => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				setValue && setValue(Object.values(json)[0]);
				setkey && setkey(Object.keys(json)[0]);
			});
	};
}
