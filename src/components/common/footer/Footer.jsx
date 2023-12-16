import { Link } from 'react-router-dom';
import { FaYoutube, FaTwitter } from 'react-icons/fa6';
import './Footer.scss';
import { useSelector } from 'react-redux';

export default function Footer() {
	const MemberData = useSelector(store => store.memberReducer.members);
	console.log(MemberData);
	return (
		<footer>
			<h1>DecodeLab</h1>
			<p>2023 Decodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					<Link to='/'>
						<FaYoutube size={20} />
					</Link>
				</li>
				<li>
					<Link to='/'>
						<FaTwitter size={20} />
					</Link>
				</li>
			</ul>
		</footer>
	);
}
