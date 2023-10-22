import Layout from '../../common/layout/Layout';
import Masonry from 'react-masonry-component';
import './Gallery.scss';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const myID = '199369997@N05';

	const fetchGallery = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = process.env.REACT_APP_FLICKR_KEY;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const num = 50;
		let url = '';
		const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;

		opt.type === 'user' && (url = url_user);
		opt.type === 'interest' && (url = url_interest);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};
	useEffect(() => {
		fetchGallery({ type: 'user', id: myID });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet'>
					<button onClick={() => fetchGallery({ type: 'interest' })}>Interest Gallrey</button>
					<button onClick={() => fetchGallery({ type: 'user', id: myID })}>My Gallrey</button>
				</nav>
			</article>
			<div className='frame'>
				<Masonry elementType={'div'} options={{ transitionDuration: 0.5 }} disableImagesLoaded={false} updateOnEachImageLoad={false}>
					{Pics.map((pic, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`} alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} />
									</div>
									<h2>{pic.title}</h2>

									<div className='profile'>
										<img
											src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
											alt={pic.owner}
											onError={(e) => {
												e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
											}}
										/>
										<span onClick={(e) => fetchGallery({ type: 'user', id: e.target.innerText })}>{pic.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
