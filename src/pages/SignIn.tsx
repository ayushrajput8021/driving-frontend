/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Button from '@mui/material/Button';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState('');
	const [error, setError] = useState({
		email: false,
		password: false,
	});

	const navigate = useNavigate();

	async function handleSubmit() {
		try {
			setLoading(true);
			const data = { email, password };
			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			);
			const resJson = await res.json();
			if (resJson.Status == 'Success') {
				setResponse('');
				sessionStorage.removeItem('token');
				sessionStorage.setItem('token', resJson.token);
				navigate('/dashboard');
			}
			if (resJson.Status == 'Failed') {
				setResponse(resJson.message);
			}
		} catch (error: any) {
			console.error(error.message);
		} finally {
			setLoading(false);
			setEmail('');
			setPassword('');
		}
	}
	function handleSignup() {
		navigate('/');
	}
	function handleInputCheck() {
		if (!email || !password) {
			setError({
				...error,
				email: true,
				password: true,
			});
		}
		if (email && password) {
			handleSubmit();
		}
	}
	return (
		<div className='flex items-center flex-col h-screen'>
			<div className='p-6 pt-3 flex flex-col items-center border-2 rounded-md'>
				<Heading title='Sign In' className='text-2xl' />
				<TextField
					autoFocus
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

				<p>
					Don't have account ? <Button onClick={handleSignup}>Sign Up</Button>
				</p>
				{response && <p>{response}</p>}
				<Button
					onClick={handleInputCheck}
					variant='outlined'
					disabled={loading}
					sx={{ marginY: '1ch', color: '#fff' }}
				>
					{loading ? 'Signing In ...' : 'Sign In'}
				</Button>
			</div>
		</div>
	);
}
