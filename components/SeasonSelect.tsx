import { Dispatch, SetStateAction } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import getRosters from '@/lib/getRosters';

type Props = {
	data: any[];
	setter: Dispatch<SetStateAction<string | null>>;
	teams: Team[] | null;
};

const SeasonSelect = ({ data, teams, setter }: Props) => {
	const options = data.map((elem) => ({ value: elem, label: elem }));

	return (
		<Select
			onValueChange={async (e) => {
				setter(e.replace('-', ''));
			}}>
			<SelectTrigger className='w-1/2 lg:w-1/4'>
				<SelectValue placeholder='Pick a Season' />
			</SelectTrigger>
			<SelectContent>
				<ScrollArea className=' h-64'>
					{options.map((elem) => (
						<SelectItem
							className='hover:bg-slate-500'
							key={elem.value}
							value={elem.value}>
							{elem.label}
						</SelectItem>
					))}
				</ScrollArea>
			</SelectContent>
		</Select>
	);
};

export default SeasonSelect;
