'use client';
import getNHLYears from '@/lib/getCurrentYear';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';
import { useRouter } from 'next/navigation';

type Props = {
};

const StandingsSelect = ({  }: Props) => {
	const dates = getNHLYears(false).slice(1);
	const router = useRouter();

	return (
		<div className='ml-[2vw] w-full'>
			<Select
				onValueChange={(e) => {
					if (e) router.push(`/standings/${e.slice(0, 4)}/wildcard`);
				}}
				aria-label='draft year'
				>
				<SelectTrigger className='w-[160px]'>
					<SelectValue placeholder='2022-2023' />
				</SelectTrigger>
				<SelectContent className='max-h-[75vh]'>
					{dates.map((elem) => (
						<SelectItem className='hover:bg-neutral-500 focus:bg-neutral-500' key={elem} value={elem}>
							{elem}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

export default StandingsSelect;
