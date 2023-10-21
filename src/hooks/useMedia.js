import { useEffect, useState } from 'react';

export const useMedia = (opt) => {
	const defOpt = {
		mobile: 640,
		tablet: 1000,
		laptop: 1400,
	};
	const result = { ...defOpt, ...opt };
	const [Type, setType] = useState('');

	const getClientWidth = () => {
		let width = window.innerWidth;
		if (width >= result.laptop) {
			setType('');
		} else if (width >= result.tablet && width < result.laptop) {
			setType('laptop');
		} else if (width >= result.mobile && width < result.tablet) {
			setType('tablet');
		} else if (width >= 0 && width < result.mobile) {
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
