import Layout from '../../common/layout/Layout';
import Masonry from 'react-masonry-component';
import { LuSearch } from 'react-icons/lu';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';

export default function Gallery() {
	const myID = '199369997@N05';
	const [Pics, setPics] = useState([]);
	const [isUser, setIsUser] = useState(myID);
	const refElBtnSet = useRef(null);
	const refElInput = useRef(null);

	const fetchGallery = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = process.env.REACT_APP_FLICKR_KEY;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 50;
		let url = '';
		const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;
		const url_search = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.keyword}&safe_search=1`;

		opt.type === 'user' && (url = url_user);
		opt.type === 'interest' && (url = url_interest);
		opt.type === 'search' && (url = url_search);

		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);

		console.log('...fetching💨');
	};

	const activateBtn = (e) => {
		const btns = refElBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		if (e.target.nodeName === 'BUTTON') {
			e.target.classList.add('on');
		}
	};

	const handleClickInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		setIsUser('');
		activateBtn(e);
		fetchGallery({ type: 'interest' });
	};

	const handleClickMine = (e) => {
		if (e.target.classList.contains('on') || isUser === myID) return;
		setIsUser(myID);
		activateBtn(e);
		fetchGallery({ type: 'user', id: myID });
	};

	const handleClickUser = (e) => {
		if (isUser) return;
		setIsUser(e.target.innerText);
		activateBtn(e);
		fetchGallery({ type: 'user', id: e.target.innerText });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const tags = refElInput.current.value;
		if (!tags.trim()) return;
		setIsUser('');
		activateBtn(e);
		fetchGallery({ type: 'search', keyword: tags });
	};

	useEffect(() => {
		//fetchGallery({ type: 'user', id: myID });
		fetchGallery({ type: 'search', keyword: 'landscape' });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet' ref={refElBtnSet}>
					<button onClick={handleClickInterest}>Interest Gallrey</button>
					<button className='on' onClick={handleClickMine}>
						My Gallrey
					</button>
				</nav>

				<form onSubmit={handleSubmit}>
					<input type='text' placeholder='Search...' ref={refElInput} />
					<button className='btnSearch'>
						<LuSearch fontSize={20} color={'#bbb'} />
					</button>
				</form>
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
										<span onClick={handleClickUser}>{pic.owner}</span>
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
