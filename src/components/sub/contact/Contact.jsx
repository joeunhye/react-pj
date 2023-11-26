import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';

export default function Contact() {
	const { kakao } = window;
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const mapInstance = useRef(null);
	const form = useRef(null);
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

	// useMemo는 함수 자체가 아닌 함수가 반환하는 리턴값을 메모이제이션하기 때문에 무조건 첫번째 인수값으로 특정값을 리턴하는 익명함수가 등록되어야함.
	const marker = useMemo(() => {
		new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: new kakao.maps.MarkerImage(info.current[Index].imgSrc, info.current[Index].imgSize, info.current[Index].imgPos),
		}),
			[kakao, Index];
	});

	const sendEmail = (e) => {
		e.preventDefault();

		if (!user.value || !email.value || !txtArea.value) return alert('이름, 답장받을 메일주소, 문의내용을 모두 입력하세요.');

		emailjs.sendForm('service_3gl8h0o', 'template_0oischp', form.current, 'nbe94GhHPql5TNg3s').then(
			(result) => {
				alert('문의 내용이 성공적으로 전달되었습니다.');
				const [user, email] = form.current.querySelectorAll('input');
				const txtArea = form.current.querySelector('textarea');

				user.value = '';
				email.value = '';
				txtArea.value = '';
			},
			(error) => {
				alert('문의 내용 전달에 실패했습니다.');
				console.error(error);
			}
		);
	};

	const roadView = useCallback(() => {
		//roadview setting
		//두번째 인수값 50(m단위)은 마커위치로부터 로드뷰가 출력될수 있는 가장 가까운 거리의 범위지정
		new kakao.maps.RoadviewClient().getNearestPanoId(info.current[Index].latlng, 50, (id) => {
			new kakao.maps.Roadview(viewFrame.current).setPanoId(id, info.current[Index].latlng);
		});
	}, [Index, kakao]);

	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(info.current[Index].latlng);
		roadView();
	}, [Index, roadView]);

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.maps.Map(mapFrame.current, { center: info.current[Index].latlng });
		mapInstance.current.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);
		marker.setMap(mapInstance.current);

		setTraffic(false);
		setView(false);
		roadView();

		window.addEventListener('resize', setCenter);
	}, [Index, kakao, marker, roadView, setCenter]);

	//교통정보 보기 토글 기능
	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
		return () => window.removeEventListener('resize', setCenter);
	}, [setCenter]);

	return (
		<Layout title={'Contact us'}>
			<div className='mailBox'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					{/* from_name : 이메일 템플릿에서 전송하는 사람 이름 변수명*/}
					<input type='text' name='from_name' />
					<label>Email</label>
					{/* reply_to : 이메일 템플릿에서 답장할 메일 주소 변수명 */}
					<input type='email' name='reply_to' />
					<label>Message</label>
					{/* message : 이메일 템플릿에서 문의 메세지 변수명 */}
					<textarea name='message' />
					<input type='reset' value='Reset' />
					<input type='submit' value='Send' />
				</form>
			</div>
			<div className='mapBox'>
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
				{!View && <button onClick={() => setTraffic(!Traffic)}>{Traffic ? '교통정보 끄기' : '교통정보 보기'}</button>}
				<button onClick={() => setView(!View)}>{View ? '지도보기' : '로드뷰보기'}</button>
			</div>
		</Layout>
	);
}
