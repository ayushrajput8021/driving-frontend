import Button from '@mui/material/Button';

interface Action {
	type: string;
	payload?: string;
}

interface NextButtonProps {
	dispatch: React.Dispatch<Action | void>;
	selected: string;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
	index?: number;
}

export default function NextButton({
	dispatch,
	selected,
	setSelected,
	index,
}: NextButtonProps) {
	function handleNext() {
		setSelected(() => '');
		dispatch({ type: 'next', payload: selected });
		if (index === 19) {
			dispatch({ type: 'finished' });
		}
	}

	return (
		<div className='ml-80 mt-4 border rounded-2xl text-white'>
			{selected && (
				<Button key={index} onClick={handleNext}>
					Next
				</Button>
			)}
		</div>
	);
}
