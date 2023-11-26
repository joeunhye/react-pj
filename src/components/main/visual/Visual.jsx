import { Swiper, SwiperSlide } from 'swiper/react';
import './Visual.scss';
import 'swiper/css';
import { useEffect, useState } from 'react';
const path = process.env.PUBLIC_URL;

export default function Visual() {
	const [SlideData, setSlideData] = useState([]);

	const fetchData = async () => {
		const data = await fetch(`${path}/DB/department.json`);
		const json = await data.json();
		setSlideData(json.members);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<figure className='myScroll'>
			<Swiper spaceBetween={50} slidesPerView={3} loop={true}>
				{SlideData.map((data, idx) => (
					<SwiperSlide key={idx}>
						<img src={`${path}/img/${data.pic}`} alt='' />
					</SwiperSlide>
				))}
			</Swiper>
		</figure>
	);
}
