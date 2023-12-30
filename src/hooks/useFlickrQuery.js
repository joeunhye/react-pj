import { useQuery } from '@tanstack/react-query';

const fetchFlickr = async ({ queryKey: [queryName, option] }) => {
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = process.env.REACT_APP_FLICKR_KEY;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const num = 40;
	let url = '';
	const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
	const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${option.id}`;
	const url_search = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${option.keyword}`;

	option.type === 'user' && (url = url_user);
	option.type === 'interest' && (url = url_interest);
	option.type === 'search' && (url = url_search);

	const data = await fetch(url);
	const json = await data.json();
	return json.photos.photo;
};

export const useFlickrQuery = opt => {
	return useQuery(['flickrQuery', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24
	});
};
