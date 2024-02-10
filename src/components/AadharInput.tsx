import Heading from './Heading';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface AadharInputProps {
	aadharNumber: string;
	aadharPhoto: File | void;
	setAadharNumber: (aadharNumber: string) => void;
	setAadharPhoto: (aadharPhoto: File) => void;
}
export default function AadharInput({
	aadharNumber,
	aadharPhoto,
	setAadharNumber,
	setAadharPhoto,
}: AadharInputProps) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [lock, setLock] = useState(false);
	const [error, setError] = useState(false);

	const firstRender = useRef(true);
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setAadharPhoto(e.target.files[0]);
		}
	};
	const handleUploadClick = () => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			navigate('/signin');
		}
		if (!aadharPhoto) {
			return;
		}

		const formData = new FormData();
		formData.append('aadhar', aadharPhoto);
		formData.append('aadharNumber', aadharNumber);
		setLoading(true);
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/profile/aadhar`, {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(() => {
				setLoading(false);
        setLock(true);
			})
			.catch((err) => console.error(err));
	};
	useEffect(() => {
		if (firstRender.current) {
			if (aadharNumber?.length) {
				setLock(true);
				setError(false);
			}
			firstRender.current = false;
			return;
		}
		if (aadharNumber?.length !== 12) {
			setError(true);
		}
		if (aadharNumber?.length === 12) {
			setError(false);
		}
	}, [aadharNumber]);
	return (
		<div className='flex flex-col items-start border rounded-md p-4 pt-1 pl-2 border-white mt-8'>
			<Heading title='Aadhar Information' className='mb-2' />
			<div className='flex justify-between w-full items-center'>
				<TextField
					sx={{ width: '50%', marginBottom: '5%', marginRight: '5%' }}
					label='Aadhar Number'
					type='number'
					id='outlined-aadhar-number'
					defaultValue={aadharNumber}
					onChange={(e) => setAadharNumber(e.target.value)}
					size='small'
					variant='outlined'
					disabled={lock}
					error={error}
				/>
				{lock ? (
					<p className='text-sm text-gray-500'>
						Aadhar Photo Already Uploaded
					</p>
				) : (
					<TextField
						sx={{ width: '50%', marginBottom: '5%',padding:'1ch' }}
						id='outlined-last-name'
						type='file'
						size='small'
						variant='outlined'
						onChange={handleFileChange}
						disabled={lock}
					/>
				)}
			</div>
			<Button
				onClick={handleUploadClick}
				variant='outlined'
				disabled={lock}
				sx={{ marginY: '1ch', color: '#fff' }}
			>
				{loading ? 'Uploading ...' : 'Upload Aadhar Info'}
			</Button>
		</div>
	);
}
