import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useFetch } from '../../../hooks/useFetch';

const path = process.env.PUBLIC_URL;

export default function Department() {
	const [title, setTitle] = useState('');
	const [department, setDepartment] = useState([]);
	const [history, setHistory] = useState([]);
	const fetchData = useFetch();

	useEffect(() => {
		fetchData(`${path}/DB/history.json`, setHistory);
		fetchData(`${path}/DB/department.json`, setDepartment, setTitle);
	}, []);
	return (
		<Layout title={'Department'}>
			<section id='historyBox'>
				<h2>History</h2>
				<div className='con'>
					{history.map((data, idx) => {
						return (
							<React.Fragment key={idx}>
								<h2>{Object.keys(data)[0]}</h2>
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
				{department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt='' />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
