import { useState, useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const [department, setDepartment] = useState([]);
	console.log(department);
	useEffect(() => {
		fetch(`${process.env.PUBLIC_URL}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => setDepartment(json.members));
	}, []);
	return <Layout title={'Department'}></Layout>;
}
