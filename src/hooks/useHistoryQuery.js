import { useQuery } from '@tanstack/react-query';

const fetchHistory = async () => {
	try {
		const data = await fetch(`${process.env.PUBLIC_URL}/DB/history.json`);
		const json = await data.json();
		console.log(json.history);
		return json.history;
	} catch (err) {
		throw err;
	}
};
export const useHistoryQuery = () => {
	return useQuery(['fetchHistory'], fetchHistory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 10,
		staleTime: 1000 * 10
	});
};
