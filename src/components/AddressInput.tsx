import TextField from '@mui/material/TextField';
import { SetStateAction } from 'react';

interface AddressInputProps {
	address: {
		houseNo: string;
		street: string;
		area: string;
		city: string;
		state: string;
		pincode: string;
		country: string;
	};
	setAddress: (
		address: SetStateAction<{
			houseNo: string;
			street: string;
			area: string;
			city: string;
			state: string;
			pincode: string;
			country: string;
		}>
	) => void;
}
export default function AddressInput({
	address,
	setAddress,
}: AddressInputProps) {
	return (
		<div>
			<div className='flex mt-4 mb-4'>
				<TextField
					sx={{ width: '100%', marginRight: '1rem' }}
					label='House No'
					id='outlined-houseNo'
					defaultValue={address?.houseNo || ''}
					size='small'
					variant='outlined'
					onChange={(e) => setAddress({ ...address, houseNo: e.target.value })}
				/>
				<TextField
					sx={{ width: '100%' }}
					label='Street'
					id='outlined-street'
					defaultValue={address?.street || ''}
					size='small'
					variant='outlined'
					onChange={(e) => setAddress({ ...address, street: e.target.value })}
				/>
			</div>
      <div className='flex mt-4 mb-4'>
				<TextField
					sx={{ width: '100%', marginRight: '1rem' }}
					label='Area'
					id='outlined-area-name'
					defaultValue={address?.area || ''}
					size='small'
					variant='outlined'
					onChange={(e) => setAddress({ ...address, area: e.target.value })}
				/>
				<TextField
					sx={{ width: '100%' }}
					label='City'
					id='outlined-city'
					defaultValue={address?.city || ''}
					size='small'
					variant='outlined'
					onChange={(e) => setAddress({ ...address, city: e.target.value })}
				/>
			</div>
      <div className='flex mt-4 mb-4'>
				<TextField
					sx={{ width: '100%', marginRight: '1rem' }}
					label='State'
					id='outlined-state'
					defaultValue={address?.state || ''}
					size='small'
					variant='outlined'
					onChange={(e) => setAddress({ ...address, state: e.target.value })}
				/>
				<TextField
					sx={{ width: '100%' }}
					label='Pincode'
					id='outlined-pincode'
					defaultValue={address?.pincode || ''}
					size='small'
					variant='outlined'
					onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
				/>
			</div>
      <div className='flex mt-4 mb-4'>
				<TextField
					sx={{ width: '48%',  }}
					label='Country'
					id='outlined-country'
					defaultValue={address?.country || ''}
					size='small'
					variant='outlined'
					onChange={(e) => setAddress({ ...address, country: e.target.value })}
				/>
			</div>
		</div>
	);
}
