import { useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const rotate = useRef(0);
	let [num, setNum] = useState(0);
	const plus = () => {
		setNum(++num);
	};
	const minus = () => {
		setNum(--num);
	};
	return (
		<Layout title={'Department'}>
			<button onClick={plus}>plus</button>
			<button onClick={minus}>minus</button>
			<article
				style={{
					transform: `rotate(${45 * num}deg)`,
				}}
			></article>
		</Layout>
	);
}
