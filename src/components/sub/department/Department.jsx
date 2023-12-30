import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useSelector } from 'react-redux';
import { useMembersQuery } from '../../../hooks/useMembersQuery';
import { useHistoryQuery } from '../../../hooks/useHistoryQuery';

export default function Department() {
	// const department = useSelector(store => store.memberReducer.members);
	// const history = useSelector(store => store.historyReducer.history);
	const [title, setTitle] = useState('');
	// const [department, setDepartment] = useState([]);
	// const [history, setHistory] = useState([]);
	const path = useRef(process.env.PUBLIC_URL);

	const { isLoading: memberLoading, isError: memberErr, isSuccess: memberSuccess, data: member } = useMembersQuery();

	const { isSuccess: historySuccess, data: history } = useHistoryQuery();

	// const fetchHistory = async () => {
	// 	const data = await fetch(`${path.current}/DB/history.json`);
	// 	const json = await data.json();
	// 	setHistory(json.history);
	// };

	// const fetchDepartment = async () => {
	// 	const data = await fetch(`${path.current}/DB/department.json`);
	// 	const json = await data.json();
	// 	setDepartment(json.members);
	// };

	useEffect(() => {
		// fetchDepartment();
		// fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				<h2>History</h2>
				<div className='con'>
					{historySuccess &&
						history.map((data, idx) => {
							return (
								<React.Fragment key={idx}>
									<h3>{Object.keys(data)[0]}</h3>
									<ul>
										{Object.values(data)[0].map((val, idx) => (
											<li key={idx}>{val}</li>
										))}
									</ul>
								</React.Fragment>
							);
						})}
				</div>
			</section>
			<section id='memberBox'>
				<h2>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
				<div className='con'>
					{memberLoading && <p>Loading...</p>}
					{memberSuccess &&
						member.map((member, idx) => {
							return (
								<article key={idx}>
									<div className='pic'>
										<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
									</div>
									<h3>{member.name}</h3>
									<p>{member.position}</p>
								</article>
							);
						})}
					{memberErr && <p>Fail to load Data</p>}
				</div>
			</section>
		</Layout>
	);
}
