import { Swiper, SwiperSlide } from 'swiper/react';
import './Visual.scss';
import 'swiper/css';
import { Autoplay } from 'swiper';
import { useEffect, useState, useRef } from 'react';

export default function Visual() {
	const [SlideData, setSlideData] = useState([]);
	const [ActiveIndex, setActiveIndex] = useState(0);

	const path = useRef(process.env.PUBLIC_URL);

	const fetchData = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		setSlideData(json.members);
	};

	useEffect(() => {
		fetchData();
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
								{txt.name}
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
								<img src={`${path.current}/img/${data.pic}`} alt='' />
								<img src={`${path.current}/img/${data.pic}`} alt='' />
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
