import { Dispatch, SetStateAction } from 'react';
import Select from 'react-select';

type Props = {
	currentYear: number;
	setDraftYear: Dispatch<SetStateAction<string>>;
};

const DraftYearSelect = ({ currentYear, setDraftYear }: Props) => {
	const draftDates = [];

	for (let i = currentYear; i > 1962; i--) {
		draftDates.push(i.toString());
	}

	const options = draftDates.map((elem) => ({ value: elem, label: elem }));

	return (
		<Select
			onChange={(e) => {
				if (e) setDraftYear(e.value);
			}}
			className='text-black'
			options={options}
		/>
	);
};

export default DraftYearSelect;
