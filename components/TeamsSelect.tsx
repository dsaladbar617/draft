import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';

interface TeamsSelectProps {
	setter: (value: string) => void;
	data: TeamTypeWithRoster | undefined;
}

const TeamsSelect = ({ setter, data }: TeamsSelectProps) => {
	return (
		<Select
			onValueChange={(e) => {
				setter(e);
			}}>
			<SelectTrigger className='w-1/3 lg:w-1/4'>
				<SelectValue placeholder='Pick a Team' />
			</SelectTrigger>
			<SelectContent className='max-h-[50vh]' position='popper'>
				{data?.teams
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
							key={elem.name}
							value={elem.id.toString()}>
							{elem.name}
						</SelectItem>
					))}
			</SelectContent>
		</Select>
	);
};

export default TeamsSelect;
