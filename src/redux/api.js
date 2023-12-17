export const fetchFlickr = async (opt) => {
  const baseURL =
    "https://www.flickr.com/services/rest/?format=json&nojsoncallback=1";
  const key = process.env.REACT_APP_FLICKR_KEY;
  const method_interest = "flickr.interestingness.getList";
  const method_user = "flickr.people.getPhotos";
  const method_search = "flickr.photos.search";
  const num = 50;
  let url = "";
  const url_interest = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
  const url_user = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.id}`;
  const url_search = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.keyword}&safe_search=1`;

  opt.type === "user" && (url = url_user);
  opt.type === "interest" && (url = url_interest);
  opt.type === "search" && (url = url_search);

  const data = await fetch(url);
  const json = await data.json();

  console.log("...fetching💨");
  return json;
};

/*
  redux로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에 부수효과를 발생시키지 않는 순수함수 형태로 제작
  부수효과 (Side Effect) : 순수 JS기능이 아닌 DOM이나 리액트 컴포넌트의 외부 도움을 통해 화면의 변경점을 야기시키는 효과 
  순수함수 (Pure Function) : 부수효과를 발생시키지 않는 순수 자바스크립트로만 구현 가능한 함수
*/
