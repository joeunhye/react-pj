import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Detail from './components/sub/youtube/Detail';
import Youtube from './components/sub/youtube/Youtube';
import { useMedia } from './hooks/useMedia';
import './styles/Variable.scss';
import './styles/Global.scss';
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Menu from './components/common/menu/Menu';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/devtools';

function App() {
	const [IsDark, setIsDark] = useState(false);
	const [IsMenu, setIsMenu] = useState(false);
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<main className={`wrap ${useMedia()} ${IsDark ? 'dark' : ''}`}>
				{/* 중첩된 라우터로 복수개의 동일한 컴포넌트가 연결될때 처음 연결라우터만 호출하고 나머지는 무시 */}
				<Switch>
					<Route exact path='/'>
						<Header isMain={true} IsDark={IsDark} setIsDark={setIsDark} IsMenu={IsMenu} setIsMenu={setIsMenu} />
						<MainWrap />
					</Route>
					<Route path='/'>
						<Header isMain={false} IsDark={IsDark} setIsDark={setIsDark} IsMenu={IsMenu} setIsMenu={setIsMenu} />
					</Route>
				</Switch>
				<Route path='/department' component={Department} />
				<Route path='/community' component={Community} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/members' component={Members} />
				<Route path='/contact' component={Contact} />
				{/* 특정 URL 라우터 설정시 유튜브의 고유 아이디값을 params로 전달 */}
				<Route path='/detail/:id' component={Detail} />
				<Footer />
				<Menu IsMenu={IsMenu} setIsMenu={setIsMenu} />
			</main>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
