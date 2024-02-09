/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Tests from '../components/PreviousTests';
import Heading from '../components/Heading';

interface Data {
	photo: string;
	firstName: string;
	lastName: string;
	isVerified: boolean;
	isPassed: boolean;
}
interface Test {
	createdAt: string;
	score: [];
}
export default function Dashboard() {
	const [data, setData] = useState<Data>({
		photo: '',
		firstName: '',
		lastName: '',
		isVerified: false,
		isPassed: false,
	});
	const [tests, setTests] = useState<Test[]>([]);
	const [loading, setLoading] = useState(false);
	const [licenseLoading, setLicenseLoading] = useState(false);
	const navigate = useNavigate();

	function handleLogOut() {
		sessionStorage.removeItem('token');
		navigate('/signin');
	}
	function handleProfile() {
		navigate('/profile');
	}
	function handleTest() {
		navigate('/test');
	}
	function downloadLicense() {
		const token = sessionStorage.getItem('token');
		if (!token) {
			navigate('/');
		}
		async function fetchData() {
			try {
				setLicenseLoading(true);
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/v1/license`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const contentDisposition = response.headers.get('content-disposition');
				const filenameMatch =
					contentDisposition && contentDisposition.match(/filename="(.+)"/);

				const filename = filenameMatch ? filenameMatch[1] : 'license';

				// Convert the response to a blob
				const blob = await response.blob();
				// Create a temporary URL for the blob
				const url = window.URL.createObjectURL(blob);
				// Create an anchor element with a download attribute
				const a = document.createElement('a');
				a.href = url;
				a.download = filename;
				a.className = 'cursor-pointer';
				// Append the anchor element to the document and trigger a click event
				document.body.appendChild(a);
				a.click();

				// Remove the anchor element from the document
				document.body.removeChild(a);
			} catch (error: any) {
				console.error(error.message);
			} finally {
				setLicenseLoading(false);
			}
		}
		fetchData();
	}
	useEffect(function getInitialData() {
		const token = sessionStorage.getItem('token');
		if (!token) {
			navigate('/');
		}
		async function fetchData() {
			try {
				setLoading(true);
				const res = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const resJson = await res.json();
				if (resJson.Status === 'Failed') {
					navigate('/signin');
				}
				setData(resJson.data);
				setTests(resJson?.tests);
			} catch (error: any) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div className='flex items-center flex-col'>
					<div className='flex justify-around w-screen'>
						<div>
							<Button
								variant='outlined'
								disabled={data?.isPassed || !data?.isVerified}
								onClick={handleTest}
							>
								{data?.isPassed ? 'Already Passed' : 'Give Test'}
								{data?.isVerified ? '' : '  {Complete Profile Details}'}
							</Button>
							{data?.isPassed && (
								<a
									className='ml-4 text-blue-300 cursor-pointer'
									onClick={downloadLicense}
								>
									{licenseLoading ? 'Downloading ...' : 'Download License'}
								</a>
							)}
						</div>
						<div className='flex items-center border-2 border-gray-400 rounded-lg p-1.5'>
							<img
								src={data?.photo}
								alt='Avatar'
								className='rounded-full w-11 h-11 mr-2 border-2 border-gray-300'
							/>
							<div className='flex flex-col'>
								<span>
									{data?.firstName} {data?.lastName}
								</span>
								<a
									onClick={handleProfile}
									className='text-blue-500 cursor-pointer text-sm'
								>
									View Profile
								</a>
							</div>
						</div>
						<Button onClick={handleLogOut} variant='outlined'>
							Log Out
						</Button>
					</div>
					<div className='flex items-center flex-col mt-10'>
						<Heading title='Previous Tests' className='text-2xl mb-6' />
						{!tests.length ? 'No tests Attempted' : <Tests tests={tests} />}
					</div>
				</div>
			)}
		</>
	);
}
