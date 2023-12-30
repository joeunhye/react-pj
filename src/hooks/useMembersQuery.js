import { useQuery } from '@tanstack/react-query';

const fetchMembers = async () => {
	try {
		const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
		const json = await data.json();
		return json.members;
	} catch (err) {
		throw err;
	}
};

export const useMembersQuery = num => {
	//useQuery는 첫번째 쿼리키에 두번째 함수의 promise 반환값을 mapping하기 때문에
	//만약 중복 요청이 들어갈때 쿼리키가 동일하면 절대 refetching을 하지 않음
	//만약 동일 서버데이터에서 인수에 따라 다른 값을 refetching하게 하고 싶으면 인수로 전달된 값을
	//쿼리키의 배열 두번째 인수로 넘기면 인수에 값이 다르게 들어갈때마다 배열의 쿼리키값이 달라지므로 refetching가능해짐
	return useQuery(['fetchMembers'], fetchMembers, {
		refetchOnMount: true,
		refetchOnWindowFocus: true,
		cacheTime: 1000 * 60 * 5,
		//다른 쿼리키가 들어가서 refetching을 해야될때 특정 데이터의 staleTime이 아직 남아있다면
		//fresh상태로 인지하기 때문에 refetching하지 않고 캐시에 등록된 값을 재활용
		staleTime: 1000 * 10
	});
};
