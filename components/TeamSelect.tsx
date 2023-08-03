import axios from 'axios';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';
import { useQuery } from '@tanstack/react-query';

type Props = {
	setter: (value: string) => void;
	currentYear: string;
};

const TeamSelect = ({ setter, currentYear }: Props) => {
	const { data: teams } = useQuery(['teams'], async () => {
		const res = await axios.get(
			`https://statsapi.web.nhl.com/api/v1/teams?season=${currentYear}${(
				Number(currentYear) + 1
			).toString()}`
		);

		return res.data.teams as Team[];
	});

	return (
		<Select
			onValueChange={(e) => {
				if (e) setter(e);
			}}>
			<SelectTrigger className='w-1/3'>
				<SelectValue placeholder='Select a team...' />
			</SelectTrigger>
			<SelectContent className='max-h-[75vh]'>
				<SelectItem className='hover:bg-slate-500' key={0} value={'0'}>
					{'None'}
				</SelectItem>
				{teams
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
			</SelectContent>
		</Select>
	);
};

export default TeamSelect;
