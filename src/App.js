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
import { useEffect, useRef, useState } from 'react';
import Menu from './components/common/menu/Menu';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const [IsDark, setIsDark] = useState(false);
  // const [IsMenu, setIsMenu] = useState(false);
  const path = useRef(process.env.PUBLIC_URL);

  const fetchDepartment = async () => {
    const data = await fetch(`${path.current}/DB/department.json`);
    const json = await data.json();
    dispatch({ type: 'SET_MEMBERS', payload: json.members });
  };

  const fetchHistory = async () => {
    const data = await fetch(`${path.current}/DB/history.json`);
    const json = await data.json();
    dispatch({ type: 'SET_HISTORY', payload: json.history });
  };

  const fetchYoutube = async () => {
    const api_key = process.env.REACT_APP_YOUTUBE_KEY;
    const pid = process.env.REACT_APP_PLAYLIST;
    const num = 10;
    const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
    const data = await fetch(baseURL);
    const json = await data.json();
    dispatch({ type: 'SET_YOUTUBE', payload: json.items });
  };

  useEffect(() => {
    fetchDepartment();
    fetchHistory();
    fetchYoutube();
  }, []);

  return (
    <main className={`wrap ${useMedia()} ${IsDark ? 'dark' : ''}`}>
      {/* 중첩된 라우터로 복수개의 동일한 컴포넌트가 연결될때 처음 연결라우터만 호출하고 나머지는 무시 */}
      <Switch>
        <Route exact path="/">
          <Header isMain={true} IsDark={IsDark} setIsDark={setIsDark} />
          <MainWrap />
        </Route>
        <Route path="/">
          <Header isMain={false} IsDark={IsDark} setIsDark={setIsDark} />
        </Route>
      </Switch>
      <Route path="/department" component={Department} />
      <Route path="/community" component={Community} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/members" component={Members} />
      <Route path="/contact" component={Contact} />
      {/* 특정 URL 라우터 설정시 유튜브의 고유 아이디값을 params로 전달 */}
      <Route path="/detail/:id" component={Detail} />
      <Footer />
      <Menu />
    </main>
  );
}

export default App;
