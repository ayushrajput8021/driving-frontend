/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TestRules from '../components/TestRules';
import { useEffect, useReducer, useState } from 'react';
import Question from '../components/Question';
import Feedback from '../components/Feedback';
import LinearProgress from '@mui/material/LinearProgress';
import Timer from '../components/Timer';

const SECS_PER_QUES = 20;

const initialState = {
	questions: [],

	// 'loading', 'error', 'ready', 'active', 'finished'
	status: 'loading',
	index: 0,
	answer: [],
	secondsRemaining: null,
};
let numQuestions = 0;
function reducer(state: any, action: any) {
	const newAnswer = Number(action.payload);
	switch (action.type) {
		case 'questions':
			numQuestions = action.payload.length;
			return { ...state, questions: action.payload, status: 'ready' };
		case 'start':
			return {
				...state,
				status: 'active',
				secondsRemaining: SECS_PER_QUES * numQuestions,
			};
		case 'next':
			return {
				...state,
				index: state.index + 1,
				answer: [...state.answer, newAnswer],
			};
		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finished' : state.status,
			};
		case 'finished':
			return { ...state, status: 'finished' };
		default:
			throw new Error('Action unkonwn');
	}
}

export default function TestStarting() {
	const navigate = useNavigate();
	const [data, setData] = useState({
		result: 0,
		category_scores: [],
	});
	const [loading, setLoading] = useState(false);
	const [{ questions, status, index, answer, secondsRemaining }, dispatch] =
		useReducer(reducer, initialState);

	const numQuestions = questions?.length;

	function handleDashboard() {
		navigate('/dashboard');
	}
	useEffect(function getData() {
		async function getData() {
			try {
				const token = sessionStorage.getItem('token');
				if (!token) {
					navigate('/');
				}
				const data = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/v1/test`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const res = await data.json();
				dispatch({ type: 'questions', payload: res.data });
			} catch (error: any) {
				console.log(error.message);
			}
		}
		getData();
	}, []);

	useEffect(
		function getScore() {
			if (status !== 'finished') {
				return;
			}
			async function getScoreData() {
				try {
					setLoading(true);
					const token = sessionStorage.getItem('token');
					if (!token) {
						navigate('/');
					}
					const data = await fetch(
						`${import.meta.env.VITE_BACKEND_URL}/api/v1/test`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${token}`,
							},
							body: JSON.stringify({ answers: answer }),
						}
					);
					const res = await data.json();
					setData(res.data);
				} catch (error: any) {
					console.log(error.message);
				} finally {
					setLoading(false);
				}
			}
			getScoreData();
		},
		[status]
	);
	return (
		<div className='flex items-center flex-col'>
			{status === 'loading' && <h1>Loading...</h1>}
			{status === 'ready' && (
				<div>
					<TestRules />
					<div className='flex justify-around w-96 mt-8'>
						<Button
							variant='outlined'
							className='mr-4'
							onClick={handleDashboard}
						>
							Dashboard
						</Button>
						<Button
							variant='outlined'
							onClick={() => dispatch({ type: 'start' })}
						>
							Start Test
						</Button>
					</div>
				</div>
			)}
			{status === 'active' && (
				<div className='w-96'>
					<h3>Progress</h3>
					<LinearProgress
						variant='determinate'
						value={(index / numQuestions) * 100}
						sx={{
							width: '100%',
							marginY: '5%',
							borderRadius: '10px',
							height: '10px',
						}}
					/>
					<Question
						question={questions[index]}
						dispatch={dispatch}
						index={index}
					/>
					<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
				</div>
			)}
			{loading ? (
				<h1>Loading...</h1>
			) : (
				status === 'finished' && (
					<Feedback score={data?.result} category={data?.category_scores} />
				)
			)}
		</div>
	);
}
