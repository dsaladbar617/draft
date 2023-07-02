import { Dispatch, SetStateAction } from 'react';
import { ScrollArea } from './ui/scroll-area';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from './ui/select';

type Props = {
	setSelectedTeam: Dispatch<SetStateAction<string | null>>;
};

const TeamSelect = ({ setSelectedTeam }: Props) => {
	let teams = [
		{ name: 'None', team_id: 0 },
		{ name: 'Anaheim Ducks', team_id: 24 },
		{ name: 'Arizona Coyotes', team_id: 53 },
		{ name: 'Boston Bruins', team_id: 6 },
		{ name: 'Buffalo Sabres', team_id: 7 },
		{ name: 'Calgary Flames', team_id: 20 },
		{ name: 'Carolina Hurricanes', team_id: 12 },
		{ name: 'Chicago Blackhawks', team_id: 16 },
		{ name: 'Colorado Avalanche', team_id: 21 },
		{ name: 'Columbus Blue Jackets', team_id: 29 },
		{ name: 'Dallas Stars', team_id: 25 },
		{ name: 'Detroit Red Wings', team_id: 17 },
		{ name: 'Edmonton Oilers', team_id: 22 },
		{ name: 'Florida Panthers', team_id: 13 },
		{ name: 'Los Angeles Kings', team_id: 26 },
		{ name: 'Minnesota Wild', team_id: 30 },
		{ name: 'Montréal Canadiens', team_id: 8 },
		{ name: 'Nashville Predators', team_id: 18 },
		{ name: 'New Jersey Devils', team_id: 1 },
		{ name: 'New York Islanders', team_id: 2 },
		{ name: 'New York Rangers', team_id: 3 },
		{ name: 'Ottawa Senators', team_id: 9 },
		{ name: 'Philadelphia Flyers', team_id: 4 },
		{ name: 'Pittsburgh Penguins', team_id: 5 },
		{ name: 'San Jose Sharks', team_id: 28 },
		{ name: 'Seattle Kraken', team_id: 55 },
		{ name: 'St Louis Blues', team_id: 19 },
		{ name: 'Tampa Bay Lightning', team_id: 14 },
		{ name: 'Toronto Maple Leafs', team_id: 10 },
		{ name: 'Vancouver Canucks', team_id: 23 },
		{ name: 'Vegas Golden Knights', team_id: 54 },
		{ name: 'Washington Capitals', team_id: 15 },
		{ name: 'Winnipeg Jets', team_id: 52 }
	];

	return (
		<Select
			onValueChange={(e) => {
				if (e) setSelectedTeam(e);
			}}>
			<SelectTrigger className='w-1/2 lg:w-1/4'>
				<SelectValue placeholder='Select a team...' />
			</SelectTrigger>
			<SelectContent>
				<ScrollArea className=' h-64'>
					{teams.map((elem) => (
						<SelectItem
							className='hover:bg-slate-500'
							key={elem.team_id}
							value={elem.team_id.toString()}>
							{elem.name}
						</SelectItem>
					))}
				</ScrollArea>
			</SelectContent>
		</Select>
	);
};

export default TeamSelect;
