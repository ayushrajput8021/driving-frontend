import { useState } from 'react';
import Options from './Options';
import NextButton from './NextButton';

interface Action {
	type: string;
	payload?: string;
}
interface QuestionProps {
	question: {
		question: string;
		options: string[];
		category: string;
	};
	index: number;
	dispatch: React.Dispatch<Action | void>;
}

export default function Question({ question, dispatch, index }: QuestionProps) {
	const [selected, setSelected] = useState('');

	function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSelected(e.target.value);
		dispatch({ type: 'next', payload: e.target.value });
	}
	return (
		<div className='flex items-start flex-col w-full mb-8'>
			<div className='flex items-baseline'>
				<span className='font-semibold'>Q{index + 1}. </span>
				<h4 className='text-lg'> {question?.question}</h4>
			</div>
			<h5 className='font-bold text-lg'>Category: <span className='font-normal'>{question.category}</span> </h5>
			<Options
				options={question.options}
				dispatch={dispatch}
				setSelected={setSelected}
				handleOptionChange={handleOptionChange}
			/>
			
			{selected && (
				<NextButton
					dispatch={dispatch}
					selected={selected}
					setSelected={setSelected}
          index={index}
				/>
			)}
		</div>
	);
}
