import { useRef, useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const mapInstance = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const info = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},

		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	const marker = new kakao.maps.Marker({
		position: info.current[Index].latlng,
		image: new kakao.maps.MarkerImage(
			info.current[Index].imgSrc,
			info.current[Index].imgSize,
			info.current[Index].imgPos
		),
	});

	const setCenter = () => mapInstance.current.setCenter(info.current[Index].latlng);

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.maps.Map(mapFrame.current, { center: info.current[Index].latlng });
		mapInstance.current.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);
		marker.setMap(mapInstance.current);

		//roadview setting
		new kakao.maps.RoadviewClient().getNearestPanoId(info.current[Index].latlng, 50, (id) => {
			new kakao.maps.Roadview(viewFrame.current).setPanoId(id, info.current[Index].latlng);
		});

		setTraffic(false);
		setView(false);

		window.addEventListener('resize', setCenter);
	}, [Index]);

	//교통정보 보기 토글 기능
	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
		return () => window.removeEventListener('resize', setCenter);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<div className='container'>
				<article id='map' ref={mapFrame} className={View ? '' : 'on'}></article>
				<article id='view' ref={viewFrame} className={View ? 'on' : ''}></article>
			</div>

			<ul className='branch'>
				{info.current.map((el, idx) => (
					<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
						{el.title}
					</li>
				))}
			</ul>

			<button onClick={setCenter}>위치 초기화</button>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? '교통정보 끄기' : '교통정보 보기'}</button>
			<button onClick={() => setView(!View)}>{View ? '지도보기' : '로드뷰보기'}</button>
		</Layout>
	);
}