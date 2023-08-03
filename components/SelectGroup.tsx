'use client';
import { useEffect, useState } from 'react';
import DraftYearSelect from '../components/DraftYearSelect';
import TeamsSelect from './TeamsSelect';
import getNHLYears from '../lib/getCurrentYear';
import { useQuery } from '@tanstack/react-query';
import useRosters from '../lib/useRosters';
import PlayerSelect from '../components/PlayerSelect';
import axios from 'axios';
import PlaceholderSelect from './PlaceholderSelect';

interface SelectsGroupProps {}

const SelectGroup = ({}) => {
	const dates = getNHLYears(false);
	const [draftYear, setDraftYear] = useState<string>(dates[0].replace('-', ''));
	const [currentTeam, setCurrentTeam] = useState<string>('');

	useEffect(() => {
		setCurrentTeam('');
	}, [draftYear]);

	const { data: roster, isFetching } = useQuery(
		['rosters', draftYear],
		async () => {
			const res = await axios.get(
				`https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season=${draftYear}`
			);

			return res.data;
		}
	);

	return (
		<div className='flex flex-row justify-end gap-3 m-10'>
			<DraftYearSelect setter={setDraftYear} />
			{isFetching ? (
				<PlaceholderSelect />
			) : (
				<TeamsSelect data={roster} setter={setCurrentTeam} />
			)}
			<PlayerSelect data={roster} currentTeam={currentTeam} />
		</div>
	);
};

export default SelectGroup;
