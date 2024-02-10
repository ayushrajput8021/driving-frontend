import TextField from '@mui/material/TextField';
import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
interface ImageInputProps {
	photo: string;
	avatar: File | undefined;
	setPhoto: (photo: string) => void;
	setAvatar: (avatar: File) => void;
}
export default function ImageInput({
	avatar,
	setAvatar,
	photo,
	setPhoto,
}: ImageInputProps) {
	const navigate = useNavigate();
	const [fileLoading, setFileLoading] = useState(false);
	const [lock, setLock] = useState(false);
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setAvatar(e.target.files[0]);
		}
	};
	const handleUploadClick = () => {
		const token = sessionStorage.getItem('token');
		if (!token) {
			navigate('/');
		}
		if (!avatar) {
			return;
		}

		const formData = new FormData();
		formData.append('avatar', avatar);
		setFileLoading(true);
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/profile/image`, {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(() => {
				setFileLoading(false);
				setPhoto('');
			})
			.catch((err) => console.error(err));
	};
	useEffect(() => {
		if (avatar && !lock) {
			setLock(true);
		}
	}, [lock, avatar]);
	return (
		<div className='flex flex-col items-center ml-6 h-40 w-40'>
			<div className={` ${avatar ? '' : ''} flex items-center flex-col`}>
				{photo ? (
					<img
						src={photo}
						alt='profile'
						className='rounded-full h-full w-full'
					/>
				) : (
					<>
						<TextField type='file' size='small' onChange={handleFileChange} />
						<a
							onClick={handleUploadClick}
							className='cursor-pointer text-blue-200 border p-2 rounded-lg mt-2 w-fit text-center'
						>
							{fileLoading ? 'Uploading ...' : 'Upload Image'}
						</a>
					</>
				)}
			</div>
		</div>
	);
}
