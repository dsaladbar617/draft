'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import TeamsSelect from './TeamsSelect';
import SeasonSelect from './SeasonSelect';

interface SelectGroupProps {
	teams: Team[] | null;
	dates: string[];
	setter: Dispatch<SetStateAction<string>>;
}

const SelectGroup = ({ teams, dates, setter }: SelectGroupProps) => {
	const [currentTeam, setCurrentTeam] = useState<string>('');
	// const [currentTeams, setCurrentTeams] = useState<Team[] | null>(teams);

	return (
		<>
			<SeasonSelect data={dates} setter={setter} teams={teams} />
			<TeamsSelect data={teams} setter={setCurrentTeam} />
		</>
	);
};

export default SelectGroup;
