/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import TextField from '@mui/material/TextField';
import Heading from '../components/Heading';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AadharInput from '../components/AadharInput';
import AddressInput from '../components/AddressInput';
import ImageInput from '../components/ImageInput';
import Button from '@mui/material/Button';

interface Data {
	photo: string;
	firstName: string;
	lastName: string;
	email: string;
	aadharNumber: string;
	address: object;
	aadharPhoto: string;
	contactNo: string;
}
export default function Profile() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [contactNo, setContactNo] = useState('');
	const [photo, setPhoto] = useState('');
	const [aadharNumber, setAadharNumber] = useState('');
	const [avatar, setAvatar] = useState<File>();
	const [aadharPhoto, setAadharPhoto] = useState<File | undefined>(undefined);
	const [address, setAddress] = useState({
		houseNo: '',
		street: '',
		area: '',
		city: '',
		state: '',
		pincode: '',
		country: '',
	});
	const [upload, setUpload] = useState(false);
	const [data, setData] = useState<Data>({
		photo: '',
		firstName: '',
		lastName: '',
		email: '',
		aadharNumber: '',
		address: {},
		aadharPhoto: '',
		contactNo: '',
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			navigate('/');
		}
		async function fetchData() {
			try {
				setLoading(true);
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/v1/profile`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				setData(data.data);
				setAadharNumber(data.data.aadharNumber);
				setPhoto(data.data.photo);
				setFirstName(data.data.firstName);
				setLastName(data.data.lastName);
				setContactNo(data.data.contactNo);
				setAddress(data.data.address);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [photo]);

	async function updateProfile() {
		const token = sessionStorage.getItem('token');
		if (!token) {
			navigate('/signin');
			return; 
		}
		setUpload(true);
		const bodyData = { firstName, lastName, contactNo, address};
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_URL}/api/v1/profile`,
				{
					method: 'PUT',
					body: JSON.stringify(bodyData),
					headers: {
						'Content-Type': 'application/json', 
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				console.error(
					'Failed to update profile:',
					response.status,
					response.statusText
				);
				
			}
		} catch (error:any) {
			console.error('Error updating profile:', error.message);
		}
		finally {
			setUpload(false);
		}
	}

	return (
		<div className='flex flex-col items-center'>
			<a
				title='Dashboard'
				onClick={() => navigate('/dashboard')}
				className='text-center text-blue-400 cursor-pointer border-b-2 w-fit mb-6'
			>
				{' '}
				Go to Dashboard
			</a>
			<Heading title='Profile' className='text-xl mb-2' />
			{loading ? (
				<p>Loading...</p>
			) : (
				<div className='border border-gray-400 p-12 rounded-lg'>
					<div className='flex flex-row justify-between'>
						<div className='flex flex-col items-start'>
							<div className=''>
								<TextField
									sx={{ width: '40%', marginRight: '3%' }}
									label='First Name'
									id='outlined-first-name'
									defaultValue={firstName}
									size='small'
									variant='outlined'
									onChange={(e) => setFirstName(e.target.value)}
								/>
								<TextField
									sx={{ width: '40%' }}
									label='Last Name'
									id='outlined-last-name'
									defaultValue={lastName}
									size='small'
									variant='outlined'
									onChange={(e) => setLastName(e.target.value)}
								/>
							</div>
							<div className='flex flex-col'>
								<TextField
									sx={{ width: '100%', marginY: '12%' }}
									label='Email'
									id='outlined-last-name'
									defaultValue={data.email || ''}
									size='small'
									variant='outlined'
									disabled
									className='cursor-none'
								/>
								<TextField
									sx={{ width: '100%' }}
									label='Contact Number'
									id='outlined-last-name'
									defaultValue={contactNo || ''}
									size='small'
									variant='outlined'
									onChange={(e) => setContactNo(e.target.value)}
								/>
								<AddressInput address={address} setAddress={setAddress} />
							</div>
						</div>

						<ImageInput
							avatar={avatar}
							setAvatar={setAvatar}
							photo={photo}
							setPhoto={setPhoto}
						/>
					</div>
					<Button
						variant='outlined'
						onClick={updateProfile}
						className='text-white'
					>
						{upload?'Uploading ...':'Update Profile'}
					</Button>
					<AadharInput
						aadharNumber={aadharNumber}
						setAadharNumber={setAadharNumber}
						setAadharPhoto={setAadharPhoto}
						aadharPhoto={aadharPhoto}
					/>
				</div>
			)}
		</div>
	);
}
