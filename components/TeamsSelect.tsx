import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';
import { Dispatch, SetStateAction } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface TeamsSelectProps {
	data: Team[] | undefined;
	setter: Dispatch<SetStateAction<string | null>>;
}

const TeamsSelect = async ({ data, setter }: TeamsSelectProps) => {
	return (
		// <select className='text-black'>
		// 	<option value=''>Pick a Team...</option>
		// 	{data
		// 		?.sort((a, b) => {
		// 			if (a.name.toUpperCase() > b.name.toUpperCase()) {
		// 				return 1;
		// 			}
		// 			if (a.name.toUpperCase() < b.name.toUpperCase()) {
		// 				return -1;
		// 			}
		// 			return 0;
		// 		})
		// 		.map((elem) => (
		// 			<option key={elem.id} value={elem.id.toString()}>
		// 				{elem.name}
		// 			</option>
		// 			// <SelectItem
		// 			// 	className='hover:bg-slate-500'
		// 			// 	key={elem.id}
		// 			// 	value={elem.id.toString()}>
		// 			// 	{elem.name}
		// 			// </SelectItem>
		// 		))}
		// </select>
		<Select
			onValueChange={(e) => {
				if (e) setter(e);
			}}>
			<SelectTrigger className='w-1/2 lg:w-1/4'>
				<SelectValue placeholder='Select a Team' />
			</SelectTrigger>
			<SelectContent>
				<ScrollArea className=' h-64'>
					{data
						?.sort((a, b) => {
							if (a.name.toUpperCase() > b.name.toUpperCase()) {
								return 1;
							}
							if (a.name.toUpperCase() < b.name.toUpperCase()) {
								return -1;
							}
							return 0;
						})
						.map((elem) => (
							<SelectItem
								className='hover:bg-slate-500'
								key={elem.id}
								value={elem.id.toString()}>
								{elem.name}
							</SelectItem>
						))}
				</ScrollArea>
			</SelectContent>
		</Select>
	);
};

export default TeamsSelect;
