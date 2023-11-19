import { useEffect, useRef } from 'react';
import './Banner.scss';
import { useGetCurrentScroll } from '../../../hooks/useGetCurrentScroll';

function Banner() {
	const currentEl = useRef(null)
	const titleEl = useRef(null);
	const getScroll = useGetCurrentScroll();
	const handleScroll = () => {
		const modifiedScroll = getScroll(currentEl);
		titleEl.current.style.transform = `translateX(${modifiedScroll}px)`;
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<section className='banner myScroll' ref={currentEl}>
			<h1 ref={titleEl}>Banner</h1>
		</section>
	);
}

export default Banner;