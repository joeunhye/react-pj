import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const [vids, setVids] = useState([]);

	console.log(vids);

	useEffect(() => {
		const api_key = 'AIzaSyBdfJCY-Cpvxi_gWvGVpnxqWLU4cdowO_o';
		const pid = 'PLQYyKtRo0VeHDcXQenJwEqbY8hMmNIhjV';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		fetch(baseURL)
			.then((data) => data.json())
			.then((json) => setVids(json.items));
	}, []);
	return (
		<Layout title='Youtube'>
			{vids.map((data, idx) => {
				return (
					<article key={idx}>
						<h2>{data.snippet.title}</h2>
						<p>{data.snippet.description}</p>
						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard.url} alt='' />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
