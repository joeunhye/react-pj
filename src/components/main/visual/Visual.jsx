import { Swiper, SwiperSlide } from 'swiper/react';
import './Visual.scss';
import 'swiper/css';
import { Autoplay } from 'swiper';
import { useEffect, useState, useRef } from 'react';

export default function Visual() {
	const [SlideData, setSlideData] = useState([]);
	const [ActiveIndex, setActiveIndex] = useState(0);

	const path = useRef(process.env.PUBLIC_URL);

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_KEY;
		const pid = process.env.REACT_APP_PLAYLIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setSlideData(json.items);
	};

	const fetchData = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		setSlideData(json.members);
	};

	useEffect(() => {
		// fetchData();
		fetchYoutube();
	}, []);

	console.log(ActiveIndex);

	return (
		<figure className='myScroll'>
			<div className='txtBox'>
				<ul>
					{SlideData.map((txt, idx) => {
						if (idx >= 5) return null;
						return (
							<li key={idx} className={idx === ActiveIndex ? 'on' : ''}>
								{/* {txt.name} */}
								<h3>{txt.snippet.title}</h3>
								<span>
									<em>view Detail</em>
								</span>
							</li>
						);
					})}
				</ul>
			</div>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={50}
				slidesPerView={3}
				loop={true}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				onSlideChange={(el) => setActiveIndex(el.realIndex)}
			>
				{SlideData.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='pic'>
								{/* <img src={`${path.current}/img/${data.pic}`} alt='' />
								<img src={`${path.current}/img/${data.pic}`} alt='' /> */}
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

// 리액트 안에서 특정 정보값을 담아주는 선택지
// useState : 화면에 출력이 되어야하는 중요한 데이터값
// useRef : 단지 모션을 위한 돔의 스타일값, 특정 함수의 구동을 위한 정보값(인스턴스)
