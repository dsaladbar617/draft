import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../ui/select';
import { v4 as uuidv4 } from 'uuid';

interface StatSelectProps {
	leagueType: (string | undefined)[] | undefined;
	setSeason: (value: string) => void;
	setLeague: (value: string) => void;
}

const StatSelect = ({ leagueType, setSeason, setLeague }: StatSelectProps) => {
	return (
		<div className='flex flex-row gap-4 justify-center w-2/3 mx-auto '>
			<Select
				onValueChange={(e) => setLeague(e)}
				aria-label='league select'>
				<SelectTrigger className='w-1/3'>
					<SelectValue placeholder='NHL' />
				</SelectTrigger>
				<SelectContent className='max-h-[75vh]'>
				<SelectItem
							className='hover:bg-neutral-500'
							key={uuidv4()}
							value={'all'}>
							{'All Types'}
						</SelectItem>
						<SelectItem
							className='hover:bg-neutral-500'
							key={uuidv4()}
							value={'National Hockey League'}>
							{'NHL'}
						</SelectItem>

					{leagueType?.map((elem) => (
						elem === 'National Hockey League' ?
						null
						:
						<SelectItem
							className='hover:bg-neutral-500'
							key={uuidv4()}
							value={elem!}>
							{elem}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select onValueChange={(e) => setSeason(e)}>
				<SelectTrigger className='w-1/3'>
					<SelectValue placeholder='Regular Season' />
				</SelectTrigger>
				<SelectContent className='max-h-[75vh]'>
					<SelectItem
						className='hover:bg-neutral-500'
						key={uuidv4()}
						value={'Regular Season'}>
						{'Regular Season'}
					</SelectItem>
					<SelectItem
						className='hover:bg-neutral-500'
						key={uuidv4()}
						value={'Playoffs'}>
						{'Playoffs'}
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
};

export default StatSelect;
