

interface Action {
	type: string;
	payload?: string;
}

interface OptionsProps {
	options: string[];
	dispatch?: React.Dispatch<Action | void>;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
	handleOptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Options({
	options,
	setSelected,
}: OptionsProps) {
	function handleSelected(i: number) {
		setSelected(""+i);
	}
	return (
		<div className=" mt-3 p-2 border rounded-xl w-full">
			<h4 className="font-medium">Options</h4>
      {options.map((option, index) => (
        <div key={option} className="mb-2 flex items-baseline">
          <input
            type='radio'
            name='options'
            value={option}
            onChange={()=>handleSelected(index+1)}
						className="mr-2"
						id={option}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
		</div>
	);
}
