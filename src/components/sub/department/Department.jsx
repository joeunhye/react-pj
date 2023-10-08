import { useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const rotate = useRef(0);
	const box = useRef(null);

	const plus = () => {
		++rotate.current;
		box.current.style.transform = `rotate(${45 * rotate.current}deg)`;
	};
	const minus = () => {
		--rotate.current;
		box.current.style.transform = `rotate(${45 * rotate.current}deg)`;
	};
	return (
		<Layout title={'Department'}>
			<button onClick={plus}>plus</button>
			<button onClick={minus}>minus</button>
			<article ref={box}></article>
		</Layout>
	);
}
