import './Modal.scss';
import { useEffect, useState } from 'react';

export default function Modal() {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<aside className='modal'>
			<div className='con'></div>
			<span>close</span>
		</aside>
	);
}
