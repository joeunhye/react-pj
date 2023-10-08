import './Modal.scss';
import { useEffect, useState } from 'react';

export default function Modal() {
	const [num, setNum] = useState(0);
	useEffect(() => {
		// console.log('컴포넌트 마운트 시 호출');
		document.body.style.overflow = 'hidden';

		return () => {
			console.log('컴포넌트 언마운트 시 호출');
			document.body.style.overflow = 'auto';
		};
	}, []);

	useEffect(() => {
		// console.log('num 변경 시 호출');
	}, [num]);
	return (
		<aside className='modal'>
			<button onClick={() => setNum(num - 1)}>Minus</button>
			<button onClick={() => setNum(num + 1)}>Plus</button>

			<h1>{num}</h1>
		</aside>
	);
}
