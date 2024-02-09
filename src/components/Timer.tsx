import { useEffect } from 'react';

interface Action {
	type: string;
	payload?: string;
}

interface TimerProps {
	dispatch: React.Dispatch<Action | void>;
	secondsRemaining: number;
}
function Timer({ dispatch, secondsRemaining }: TimerProps) {
	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;

	useEffect(
		function () {
			const id = setInterval(function () {
				dispatch({ type: 'tick' });
			}, 1000);

			return () => clearInterval(id);
		},
		[dispatch]
	);

	return (
		<div className='border-2 w-fit p-2 rounded-lg font-bold'>
			{mins < 10 && '0'}
			{mins}:{seconds < 10 && '0'}
			{seconds}
		</div>
	);
}

export default Timer;
