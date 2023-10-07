import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Visual from './components/main/visual/Visual';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import './styles/Global.scss';
import { Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Header />

			<Route exact path='/' component={Visual} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />

			<Footer />
		</>
	);
}

export default App;
