import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

interface FeedbackProps {
	score: number;
	category:
		| {
				BASIC_UNDERSTANDING: number;
				ROAD_KNOWLEDGE: number;
				PUBLIC_SAFETY: number;
				TRAFFIC_RULES: number;
		  }
		| any;
}
export default function Feedback({ score, category }: FeedbackProps) {
	const navigate = useNavigate();
	function handleHome() {
		navigate('/dashboard');
	}
	const isPassed =
		score > 12 &&
		category?.BASIC_UNDERSTANDING > 3 &&
		category?.PUBLIC_SAFETY > 3 &&
		category?.TRAFFIC_RULES > 3;
	return (
		<>
			<div className='flex items-center flex-col'>
				<h1 className='text-2xl font-bold'>Score: {score}</h1>
				<h3 className='text-2xl font-serif'>{!isPassed ? 'You failed, try again' : 'You passed, well done'}</h3>
				<div className='flex items-center flex-col p-6'>
					<h2 className='font-bold'>Category Scores</h2>
					<ul className='font-mono'>
						<li className='text-lg'>
							Basic Understanding: {category?.BASIC_UNDERSTANDING}
						</li>
						<li className='text-lg'>
							Road Knowledge: {category?.ROAD_KNOWLEDGE}
						</li>
						<li className='text-lg'>
							Public Safety: {category?.PUBLIC_SAFETY}
						</li>
						<li className='text-lg'>
							Traffic Rules: {category?.TRAFFIC_RULES}
						</li>
					</ul>
				</div>
			</div>
			<Button
				variant='outlined'
				className='mt-12'
				sx={{ marginTop: '5%' }}
				onClick={handleHome}
			>
				Dashboard
			</Button>
		</>
	);
}
