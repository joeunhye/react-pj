import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	const [data, setData] = useState(null);

	useEffect(() => {
		const api_key = 'AIzaSyBdfJCY-Cpvxi_gWvGVpnxqWLU4cdowO_o';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&Id=${id}`;

		fetch(baseURL)
			.then((data) => data.json())
			.then((json) => console.log(json.items[0]));
	}, []);

	return (
		<Layout title={'Detail'}>
			<iframe frameborder='0'></iframe>
		</Layout>
	);
}
