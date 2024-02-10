/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Button from '@mui/material/Button';

export default function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState('');
	const [error, setError] = useState({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
		confirmPassword: false,
	});

	const navigate = useNavigate();

	async function handleSubmit() {
		try {
			setLoading(true);
			const data = { firstName, lastName, email, password };
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			const resJson = await res.json();
			if (resJson.Status == 'Failed') {
				setResponse(resJson.message);
			}
		} catch (error: any) {
			console.error(error.message);
		} finally {
			setLoading(false);
			setFirstName('');
			setLastName('');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
			navigate('/signin');
		}
	}
	function handleLogin() {
		navigate('/signin');
	}
	function handleInputCheck() {
		if(password.length < 6) {
			setError({...error, password: true})
		}
		if (confirmPassword !== password) {
			setError({ ...error, confirmPassword: true });
		}
		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			setError({
				...error,
				firstName: true,
				lastName: true,
				email: true,
				password: true,
				confirmPassword: true,
			});
		}
		if (
			confirmPassword === password &&
			firstName &&
			lastName &&
			email &&
			password &&
			confirmPassword
		) {
			handleSubmit();
		}
	}
	return (
		<div className='flex items-center flex-col h-screen'>
			
			<div className='p-6 pt-3 flex flex-col items-center border-2 rounded-md'>
				<Heading title='Sign Up' className='text-2xl' />
				<div className='flex'>
					<TextField
						sx={{
							width: '15ch',
							height: '2ch',
							marginY: '1ch',
							marginRight: '1ch',
						}}
						autoFocus
						error={error?.firstName}
						label='First Name'
						type='text'
						autoComplete='current-first-name'
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<TextField
						sx={{ width: '15ch', height: '6ch', marginY: '1ch' }}
						label='Last Name'
						type='text'
						error={error.lastName}
						autoComplete='current-last-name'
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>

				<TextField
					sx={{ width: '31ch', height: '6ch', marginY: '1ch' }}
					label='Email'
					type='email'
					error={error.email}
					autoComplete='current-email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					sx={{ width: '31ch', height: '6ch', marginY: '1ch' }}
					label='Password'
					type='password'
					error={error.password}
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<TextField
					sx={{ width: '31ch', height: '6ch', marginY: '1ch' }}
					label='Confirm Password'
					type='password'
					required
					error={error.confirmPassword}
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<p>
					Have account ? <Button onClick={handleLogin}>Log in</Button>
				</p>
				{response && <p>{response}</p>}
				<Button
					onClick={handleInputCheck}
					variant='outlined'
					sx={{ marginY: '1ch', color: '#fff' }}
				>
					{loading ? 'Signing Up ...' : 'Sign Up'}
				</Button>
			</div>
		</div>
	);
}
