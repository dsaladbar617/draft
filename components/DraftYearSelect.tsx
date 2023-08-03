import getNHLYears from '../lib/getCurrentYear';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';

type DraftYearSelectProps = {
	setter: (value: string) => void;
};

const DraftYearSelect = ({ setter }: DraftYearSelectProps) => {
	const dates = getNHLYears(false);

	return (
		<Select
			onValueChange={async (e) => {
				setter(e.replace('-', ''));
			}}>
			<SelectTrigger className='w-1/3 lg:w-1/4'>
				<SelectValue placeholder='Pick a Season' />
			</SelectTrigger>
			<SelectContent className='max-h-[50vh]' position='popper'>
				{dates.map((elem) => (
					<SelectItem className='hover:bg-slate-500' key={elem} value={elem}>
						{elem}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default DraftYearSelect;
