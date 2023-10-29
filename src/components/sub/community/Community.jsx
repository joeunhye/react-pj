import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { ImCancelCircle } from 'react-icons/im';
import { useRef } from 'react';

function Comunity() {
	const refInput = useRef(null);
	const refTextarea = useRef(null);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refInput} />
					<textarea cols='30' rows='3' placeholder='leave message' ref={refTextarea}></textarea>

					<nav>
						<button>
							<ImCancelCircle fontSize={20} color={'#555'} />
						</button>
						<button>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'></div>
			</div>
		</Layout>
	);
}

export default Comunity;
