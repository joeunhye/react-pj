import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchGallery = async () => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '2a1a0aebb34012a99c23e13b49175343';
		const method_interest = 'flickr.interestingness.getList';
		const num = 40;
		const url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};
	useEffect(() => {
		fetchGallery();
	}, []);

	return (
		<Layout title={'Gallery'}>
			<p>갤러리 상세페이지</p>
		</Layout>
	);
}
