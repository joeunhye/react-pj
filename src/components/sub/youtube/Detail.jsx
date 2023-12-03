import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const params = useRef(id);

	useEffect(() => {
		const api_key = 'AIzaSyBdfJCY-Cpvxi_gWvGVpnxqWLU4cdowO_o';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${params.current}`;

		fetch(baseURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items[0]);
				setData(json.items[0]);
			});
	}, []);

	return (
		<Layout title={'Detail'}>
			<iframe width='100%' height='500' title='youtube' src={`https://www.youtube.com/embed/${data?.snippet.resourceId.videoId}`}></iframe>
		</Layout>
	);
}
