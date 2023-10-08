import { useEffect, useRef } from 'react';
import './Layout.scss';

export default function Layout({ title, children }) {
	let newClass = title.toLowerCase().split(' ').join('_');
	const refTitle = useRef(null);
	const refFrame = useRef(null);
	useEffect(() => {
		let text = refTitle.current.innerText;
		let tags = '';
		let count = 0;

		for (let letter of text) {
			tags += `<span style='display:inline-block; transition-delay:${0.1 * count}s'>${letter}</span>`;
			count++;
		}
		refTitle.current.innerHTML = tags;
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<section ref={refFrame} className={`layout ${newClass}`}>
			<h1 ref={refTitle}>{title}</h1>
			{children}
		</section>
	);
}
