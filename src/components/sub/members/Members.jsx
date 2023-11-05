import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState, useRef, useEffect } from 'react';

export default function Members() {
	const initVal = useRef({
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		edu: '',
		gender: '',
		interest: [],
		comments: '',
	});
	const [Val, setVal] = useState(initVal.current);

	const handleChange = e => {
		const {name, value} = e.target;
		setVal({...Val, [name]: value})
	}

	useEffect(() => {
		console.log(Val);
	}, [Val])
	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									<tr>
										<td>
											<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
										</td>
										<td>
											<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
										</td>
									</tr>
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
										</td>
									</tr>

									<tr>
										<td colSpan='2'>
											<select name='edu'>
												<option defaultValue=''>Education</option>
												<option defaultValue='elementary-school'>초등학교 졸업</option>
												<option defaultValue='middle-school'>중학교 졸업</option>
												<option defaultValue='high-school'>고등학교 졸업</option>
												<option defaultValue='college'>대학교 졸업</option>
											</select>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='radio' defaultValue='female' id='female' name='gender' />
											<label htmlFor='female'>Female</label>

											<input type='radio' defaultValue='male' id='male' name='gender' />
											<label htmlFor='male'>Male</label>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' />
											<label htmlFor='game'>Game</label>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<textarea name='comments' cols='30' rows='5' placeholder='Leave a comment' value={Val.comments} onChange={handleChange}></textarea>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<button>cancel</button>
											<button>submit</button>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}