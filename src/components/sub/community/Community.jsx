import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { ImCancelCircle } from 'react-icons/im';
import { useEffect, useRef, useState } from 'react';

function Comunity() {
	const refInput = useRef(null);
	const refTextarea = useRef(null);

	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		return data ? JSON.parse(data) : [];
	};

	const [Posts, setPosts] = useState(getLocalData());

	const resetPost = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력해주세요.');
		}

		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

		setPosts([{ title: refInput.current.value, content: refTextarea.current.value, date: new Date(korTime) }, ...Posts]);
		resetPost();
	};

	const deletePost = (delIndex) => {
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	const enableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, idx) => {
				if(editIndex === idx) post.enableUpdata = true
				return post;
			})
		)
	}

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refInput} />
					<textarea cols='30' rows='3' placeholder='leave message' ref={refTextarea}></textarea>

					<nav>
						<button onClick={resetPost}>
							<ImCancelCircle fontSize={20} color={'#555'} />
						</button>
						<button onClick={createPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
				{Posts.map((post, idx) => {
						//현재시간값이 State에 옮겨담아지는 순간에는 객체값이고  
						//다음번 렌더링 싸이클에서 useEffect에 의해 문자로 변환된다음 로컬저장소에 저장됨
						//날자값을 받는 첫번째 렌더링 타임에는 날짜값이 객체이므로 split구문에서 오류발생
						//해결방법은 처음 렌더링을 도는 시점에서 날짜를 강제로 문자화한다음 출력처리
						const stringDate = JSON.stringify(post.date);
						const textedDate = stringDate.split('T')[0].split('"')[1].split('-').join('.');
						if(post.enableUpdata) {
							// 수정모드
							return (
								<article key={idx}>
									<div className='txt'>
										<input type="text" defaultValue={post.title} />
										<textarea defaultValue={post.content}></textarea>
									</div>
									<nav>
										<button>Cancle</button>
										<button>Update</button>
									</nav>
								</article>
							);
						}else {
							// 출력모드
							return (
								<article key={idx}>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
										<span>{textedDate} </span>
									</div>
									<nav>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
						}
					)}
				</div>
			</div>
		</Layout>
	);
}

export default Comunity;

/**
 * Create : 글 작성 "POST"
 * Read : 글 불러오기 "GET"
 * Updated : 글 수정 "PUT"
 * Delete: 글 삭제 "DELETE"
 *
 * RESTful API : DB를 구조적으로 변경하기 위한 개발 방법론
 * 로컬 저장소(LocalStorage) :
 * - 모든 브라우저가 내장하고 있는 경량의 저장공간
 * - 문자값만 저장 가능
 * - 객체값을 문자화(JSON.stringify) 시켜서 저장
 * - 로컬 저장소 값을 가져올 때에는 JSON 형태로 객체로 파싱(JSON.parse)해서 가져옴
 *
 * LocalStorage 메서드
 * 저장하기 : LocalStorage.setItem('키', '문자화된 데이터')
 * 불러오기 : LocalStorage.getItem('키') : 문자값으로 불러오기 때문에 객체 형태로 파싱해야 한다.
 */
