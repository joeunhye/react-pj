import { useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import Modal from '../../common/modal/Modal';

export default function Department() {
	const [open, setOpen] = useState(false);

	return (
		<Layout title={'Department'}>
			<button onClick={() => setOpen(!open)}>{open ? 'CLOSE' : 'OPEN'}</button>
			{open && <Modal />}
		</Layout>
	);
}
