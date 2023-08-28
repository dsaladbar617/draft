'use client';
import getNHLYears from '@/lib/getCurrentYear';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../ui/select';
import { useRouter } from 'next/navigation';

type Props = {
	currentYear: number;
	// setCurrentYear: (value: string) => void;
};

const DraftYearSelect = ({ currentYear }: Props) => {
	const dates = getNHLYears(true);
	const router = useRouter();

	return (
		<Select
			onValueChange={(e) => {
				if (e) router.push(`/draft/${e}`);
			}}
			aria-label='draft year'
			>
			<SelectTrigger className='w-1/3'>
				<SelectValue placeholder='Draft Year' />
			</SelectTrigger>
			<SelectContent ref={(ref) => { if (!ref) return; ref.ontouchstart = (e) => { e.preventDefault(); }; }} className='max-h-[75vh]'>
				{dates.map((elem) => (
					<SelectItem className='hover:bg-neutral-500 focus:bg-neutral-500' key={elem} value={elem}>
						{elem}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default DraftYearSelect;
