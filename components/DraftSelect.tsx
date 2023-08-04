import TeamSelect from './TeamSelect';
import TestYearSelect from './testYearSelect';

interface DraftSelectProps {
	currentYear: string;
	setter: (value: string) => void;
}

const DraftSelect = ({ currentYear, setter }: DraftSelectProps) => {
	return (
		<div className='flex flex-row justify-between w-2/3 mx-auto mt-4'>
			<TestYearSelect currentYear={Number(currentYear)} />
			<TeamSelect currentYear={currentYear} setter={setter} />
		</div>
	);
};

export default DraftSelect;
