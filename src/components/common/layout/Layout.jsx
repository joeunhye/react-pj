import './Layout.scss';

export default function Layout({ title, children }) {
	let newClass = title.toLowerCase().split(' ').join('_');

	return (
		<section className={`layout ${newClass}`}>
			<h1>{title}</h1>
			{children}
		</section>
	);
}
