import Layout from '../../common/layout/Layout';
import Masonry from 'react-masonry-component';
import { LuSearch } from 'react-icons/lu';
import './Gallery.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import Modal from '../../common/modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';
import clientAction from '../../../redux/clientActionType';

export default function Gallery() {
  const myID = '199369997@N05';
  // const [Pics, setPics] = useState([]);
  let [isUser, setIsUser] = useState(myID);
  let [currentType, setCurrentType] = useState('mine');
  const refElBtnSet = useRef(null);
  const refElInput = useRef(null);
  // let [IsOpen, setIsOpen] = useState(false);
  const [Index, setIndex] = useState(0);

  const dispatch = useDispatch();
  const Pics = useSelector((store) => store.flickrReducer.flickr);

  // const fetchFlickr = useCallback(
  //   async (opt) => {
  //     const baseURL =
  //       "https://www.flickr.com/services/rest/?format=json&nojsoncallback=1";
  //     const key = process.env.REACT_APP_FLICKR_KEY;
  //     const method_interest = "flickr.interestingness.getList";
  //     const method_user = "flickr.people.getPhotos";
  //     const method_search = "flickr.photos.search";
  //     const num = 50;
  //     let url = "";
  //     const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
  //     const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;
  //     const url_search = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.keyword}&safe_search=1`;

  //     opt.type === "user" && (url = url_user);
  //     opt.type === "interest" && (url = url_interest);
  //     opt.type === "search" && (url = url_search);

  //     const data = await fetch(url);
  //     const json = await data.json();
  //     if (json.photos.photo.length === 0) {
  //       const [btnInterest, btnMine] =
  //         refElBtnSet.current.querySelectorAll("button");
  //       currentType === "interest" && btnInterest.classList.add("on");
  //       currentType === "mine" && btnMine.classList.add("on");
  //       return alert("해당 검색어에 결과값이 없습니다.");
  //     }
  //     setPics(json.photos.photo);

  //     console.log("...fetching💨");
  //   },
  //   [currentType]
  // );

  const activateBtn = (e) => {
    const btns = refElBtnSet.current.querySelectorAll('button');
    btns.forEach((btn) => btn.classList.remove('on'));
    if (e.target.nodeName === 'BUTTON') {
      e.target.classList.add('on');
    }
  };

  const handleClickInterest = (e) => {
    if (e.target.classList.contains('on')) return;
    setIsUser('');
    activateBtn(e);
    // fetchFlickr({ type: 'interest' });
    dispatch({ type: types.FLICKR.start, Opt: { type: 'interest' } });
    setCurrentType('interest');
  };

  const handleClickMine = (e) => {
    if (e.target.classList.contains('on') || isUser === myID) return;
    setIsUser(myID);
    activateBtn(e);
    // fetchFlickr({ type: 'user', id: myID });
    dispatch({ type: types.FLICKR.start, Opt: { type: 'user', id: myID } });
    setCurrentType('mine');
  };

  const handleClickUser = (e) => {
    if (isUser) return;
    setIsUser(e.target.innerText);
    activateBtn(e);
    // fetchFlickr({ type: 'user', id: e.target.innerText });
    dispatch({
      type: types.FLICKR.start,
      Opt: { type: 'user', id: e.target.innerText },
    });
    setCurrentType('user');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = refElInput.current.value;
    refElInput.current.value = '';
    if (!tags.trim()) return;
    setIsUser('');
    activateBtn(e);
    // fetchFlickr({ type: 'search', keyword: tags });
    dispatch({
      type: types.FLICKR.start,
      Opt: { type: 'search', keyword: tags },
    });
    setCurrentType('search');
  };

  const handleModal = (idx) => {
    dispatch({ type: clientAction.modal, payload: true });
    setIndex(idx);
  };

  // useEffect(() => {
  //   // fetchFlickr({ type: 'user', id: myID });
  //   // fetchFlickr({ type: 'search', keyword: 'landscape' });
  // }, [fetchFlickr]);

  return (
    <>
      <Layout title={'Gallery'}>
        <article className="controls">
          <nav className="btnSet" ref={refElBtnSet}>
            <button onClick={handleClickInterest}>Interest Gallrey</button>
            <button className="on" onClick={handleClickMine}>
              My Gallrey
            </button>
          </nav>

          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." ref={refElInput} />
            <button className="btnSearch">
              <LuSearch fontSize={20} color={'#bbb'} />
            </button>
          </form>
        </article>
        <div className="frame">
          <Masonry
            elementType={'div'}
            options={{ transitionDuration: '0.5s' }}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false}
          >
            {Pics.map((pic, idx) => {
              return (
                <article key={idx}>
                  <div className="inner">
                    <div className="pic" onClick={() => handleModal(idx)}>
                      <img
                        src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_w.jpg`}
                        alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
                      />
                    </div>
                    <h2>{pic.title}</h2>

                    <div className="profile">
                      <img
                        src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
                        alt={pic.owner}
                        onError={(e) => {
                          e.target.setAttribute(
                            'src',
                            'https://www.flickr.com/images/buddyicon.gif'
                          );
                        }}
                      />
                      <span onClick={handleClickUser}>{pic.owner}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </Masonry>
        </div>
      </Layout>

      {/* 모달 호출 시 출력 유무를 결정하는 state 값과 state변경 함수를 모달의 props로 전달 - 이유 : 모달의 열고 닫기를 부모가 아닌 자식 컴포넌트에서 결정하게 하기 위함 */}
      <Modal>
        <img
          src={`https://live.staticflickr.com/${Pics[Index]?.server}/${Pics[Index]?.id}_${Pics[Index]?.secret}_b.jpg`}
          alt="pic"
        />
      </Modal>
    </>
  );
}
