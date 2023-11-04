import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import News from './components/main/news/News';
import Visual from './components/main/visual/Visual';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Detail from './components/sub/youtube/Detail';
import Youtube from './components/sub/youtube/Youtube';
import { useMedia } from './hooks/useMedia';
import './styles/Global.scss';
import { Route } from 'react-router-dom';

function App() {
	return (
		<main className={useMedia({ tablet: 800 })}>
			<Header />
			<Route exact path='/'>
				<Visual />
				<News />
			</Route>
			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			{/* 특정 URL 라우터 설정시 유튜브의 고유 아이디값을 params로 전달 */}
			<Route path='/detail/:id' component={Detail} />
			<Footer />
		</main>
	);
}

export default App;
