import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const [vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyBdfJCY-Cpvxi_gWvGVpnxqWLU4cdowO_o';
		const pid = 'PLQYyKtRo0VeHDcXQenJwEqbY8hMmNIhjV';
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setVids(json.items);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<Layout title={'Youtube'}>
			{vids.map((data, idx) => {
				return (
					<article key={idx}>
						<h2>{data.snippet.title}</h2>
						<p>{data.snippet.description}</p>
						<div className='pic'>
							<Link to={`/detail/${data.id}`}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</Link>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}
