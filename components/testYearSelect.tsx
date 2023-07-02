'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { useRouter } from 'next/navigation';

type Props = {
	currentYear: number;
};

const TestYearSelect = ({ currentYear }: Props) => {
	const router = useRouter();
	const draftDates = [];

	for (let i = currentYear; i > 1962; i--) {
		draftDates.push(i.toString());
	}

	return (
		<Select
			onValueChange={(e) => {
				if (e) router.push(`/draft/${e}`);
			}}>
			<SelectTrigger className='w-1/2 lg:w-1/4'>
				<SelectValue placeholder='Pick a Draft Year...' />
			</SelectTrigger>
			<SelectContent>
				<ScrollArea className=' h-64'>
					{draftDates.map((elem) => (
						<SelectItem className='hover:bg-slate-500' key={elem} value={elem}>
							{elem}
						</SelectItem>
					))}
				</ScrollArea>
			</SelectContent>
		</Select>
	);
};

export default TestYearSelect;
