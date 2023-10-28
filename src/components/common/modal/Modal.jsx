import './Modal.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
/*
motion : 모션을 걸고 싶은 jsx 요소 앞쪽에 motion을 추가하면 initial, animate, exit라는 속성으로 모션설정 가능케하는 컴포넌트
AnimatePresence : 모션을 적용할 컴포넌트의 wrapping 컴포넌트 - 자식요소의 모션이 끝날 때까지 언마운트되는 시점을 홀딩처리
적용가능한 모션 속성 : opacity, scale, rotate, x, y
*/

export default function Modal({ IsOpen, setIsOpen, children }) {
	const handleClose = () => setIsOpen((IsOpen) => !IsOpen);

	useEffect(() => {
		document.body.style.overflow = IsOpen ? 'hidden' : 'auto';
	}, [IsOpen]);
	return (
		<AnimatePresence>
			{IsOpen && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%' }}
					animate={{ opacity: 1, x: '0%' }}
					exit={{ opacity: 0, x: '-100%', transition: { duration: 0.3 } }}
					transition={{ duration: 0.7 }}
				>
					<div className='con'>{children}</div>
					<span onClick={handleClose}>Close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
