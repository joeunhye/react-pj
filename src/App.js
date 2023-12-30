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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const [IsDark, setIsDark] = useState(false);
	const [IsMenu, setIsMenu] = useState(false);
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<main className={`wrap ${useMedia()} ${IsDark ? 'dark' : ''}`}>
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
				<Route path='/detail/:id' component={Detail} />
				<Footer />
				<Menu IsMenu={IsMenu} setIsMenu={setIsMenu} />
			</main>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

/*
	redux기반으로 서버사이드 데이터를 전역 state에 저장시의 문제점
	1.redux의 태생자체가 클라이언트사이드 데이터의 전역관리 목적이었기 때문에 서버사이드 데이터관리의 비효율적
	2.서버사이드 데이터는 클라이언트쪽에 제어권이 없으므로 서버데이터변경시 클라이언트는 해당 변경사항 인식불가
	3.실시간으로 자주바뀌는 서버사이드 데이터가 정적인상태로 클라이언트의 전역객체에 저장시 연결되어 있는 모든 컴포넌트는 
	out-dated된 서버데이터를 활용하게 되므로 문제발생 여지가 많음
	4.전역으로 서버데이터 요청을 해서 저장해도 똑같은 데이터요청이 또 들어가면 같은 데이터임에도 불구하고 기존 리덕스시스템에서는 해당 데이터가 같은지 구별할 방법이 없기 때문에 다시 refetching하는 문제점 발생

	요즘의 전역데이터 관리 트랜드
	1.client-side-data와 server-side-data를 구분해서 관리
	2.server-side-data는 굳이 전역객체에 저장하지 않고 해당 데이터가 필요할때마다 요청, 이때 요청하는 데이터가 이전에 한번이라도 사용한 이력이 있으면 re-fetching하는 것이 아닌 캐시에 등록되어 있는 값을 재활용
	3.client-side-data는 이미 리액트에 내장되어 있는 context api기반의 경량의 커스텀훅으로 만들어서 관리 
	(단지 간단한 client-side-data를 관리할때 굳이 무거운 리덕스 라이브러리를 쓸 필요가 없어짐)
*/

export default App;
