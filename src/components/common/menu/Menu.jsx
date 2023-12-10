import './Menu.scss';

export default function Menu({ IsMenu, setIsMenu }) {
	return (
		IsMenu && (
			<div className='Menu' onClick={() => setIsMenu(false)}>
				Menu
			</div>
		)
	);
}
