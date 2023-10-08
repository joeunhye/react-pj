import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout({ title, children }) {
	let newClass = title.toLowerCase().split(' ').join('_');

	const refTitle = useRef(null);
	const refFrame = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle, 0.1, 2);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<section ref={refFrame} className={`layout ${newClass}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</section>
	);
}
