import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { HiBars4 } from 'react-icons/hi2';
import { useDispatch, useSelector } from 'react-redux';

export default function Header({ isMain, IsDark, setIsDark }) {
	const dispatch = useDispatch();
	const menu = useSelector(store => store.menuReducer.isOpen);

	return (
		<header className={isMain ? 'main' : ''}>
			<h1>
				<Link to='/'>DECODELAB ♥</Link>
			</h1>
			<ul>
				<li>
					<NavLink to='/department' activeClassName={'on'}>
						Department
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={'on'}>
						Community
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={'on'}>
						Gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={'on'}>
						Youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						Members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						Contact
					</NavLink>
				</li>
			</ul>

			<div className={`themeBox ${IsDark && 'dark'}`} onClick={() => setIsDark(!IsDark)}>
				<div className='ball'></div>
			</div>

			<HiBars4
				fontSize={20}
				color={'#777'}
				className='bars'
				onClick={() => dispatch({ type: 'SET_MENU', payload: !menu })}
			/>
		</header>
	);
}
