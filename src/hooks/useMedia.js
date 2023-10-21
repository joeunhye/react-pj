import { useEffect, useState } from 'react';

export const useMedia = (opt) => {
	const [Type, setType] = useState('');

	const getClientWidth = () => {
		let width = window.innerWidth;
		if (width >= 1400) {
			setType('');
		} else if (width >= 1000 && width < 1400) {
			setType('laptop');
		} else if (width >= 640 && width < 1000) {
			setType('tablet');
		} else if (width >= 0 && width < 640) {
			setType('mobile');
		}
	};

	useEffect(() => {
		getClientWidth();
		window.addEventListener('resize', getClientWidth);

		return () => window.removeEventListener('resize', getClientWidth);
	}, []);

	return Type;
};
