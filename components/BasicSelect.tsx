import { Dispatch, SetStateAction } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';
import { ScrollArea } from './ui/scroll-area';

type Props = {
	data: any[] | null;
	placeholder?: string;
};

const BasicSelect = ({ data, placeholder }: Props) => {
	const options = data?.map((elem) => ({ value: elem, label: elem }));

	return (
		<Select>
			<SelectTrigger className='w-1/2 lg:w-1/4'>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				<ScrollArea className=' h-64'>
					{options?.map((elem) => (
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

export default BasicSelect;
