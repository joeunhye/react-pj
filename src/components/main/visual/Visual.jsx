import { Swiper, SwiperSlide } from 'swiper/react';
import './Visual.scss';
import 'swiper/css';
import { Autoplay } from 'swiper';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Visual() {
	const SlideData = useSelector(store => store.youtubeReducer.youtube);
	// const [SlideData, setSlideData] = useState([]);
	const [ActiveIndex, setActiveIndex] = useState(0);
	const shortenText = useCustomText('shorten');

	return (
		<figure className='myScroll'>
			<div className='txtBox'>
				<ul>
					{SlideData.map((txt, idx) => {
						if (idx >= 5) return null;
						return (
							<li key={idx} className={idx === ActiveIndex ? 'on' : ''}>
								{/* {txt.name} */}
								<h3>{shortenText(txt.snippet.title, 50)}</h3>
								<Link to={`/detail/${txt.id}`}>
									<em>view Detail</em>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				onSlideChange={el => setActiveIndex(el.realIndex)}
				breakpoints={{
					1000: {
						slidesPerView: 2,
						spaceBetween: 50
					},
					1400: {
						slidesPerView: 3,
						spaceBetween: 50
					}
				}}>
				{SlideData.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='pic'>
								{/* <img src={`${path.current}/img/${data.pic}`} alt='' />
								<img src={`${path.current}/img/${data.pic}`} alt='' /> */}
								<p>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</p>
								<p>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</p>
							</div>
							<h3>{data.snippet.title}</h3>
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
