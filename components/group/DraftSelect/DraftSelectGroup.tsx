import TeamDraftSelect from './TeamDraftSelect';
import DraftYearSelect from './DraftYearSelect';

interface DraftSelectProps {
	currentYear: string;
	setter: (value: string) => void;
}

const DraftSelectGroup = ({ currentYear, setter }: DraftSelectProps) => {
	return (
		<div className='flex flex-row justify-between w-[calc(100vw-3rem)] max-w-[900px] mx-auto mt-4'>
			<DraftYearSelect currentYear={Number(currentYear)} />
			<TeamDraftSelect currentYear={currentYear} setter={setter} />
		</div>
	);
};

export default DraftSelectGroup;
