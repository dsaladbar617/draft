'use client';
import { useEffect, useState } from 'react';
import RosterYearSelect from './RosterYearSelect';
import TeamRosterSelect from './TeamRosterSelect';
import getNHLYears from '../../../lib/getCurrentYear';
import { useQuery } from '@tanstack/react-query';
import useRosters from '../../../lib/useRosters';
import PlayerSelect from './PlayerSelect';
import axios from 'axios';
import PlaceholderSelect from '../../PlaceholderSelect';

interface SelectsGroupProps {}

const PlayerSearchSelectGroup = ({}) => {
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
		<div className='flex flex-row justify-end gap-3 max-w-[1264px] mx-auto my-3'>
			<RosterYearSelect setter={setDraftYear} />
			{isFetching ? (
				<PlaceholderSelect placeholder='Pick a Team'/>
			) : (
				<TeamRosterSelect data={roster} setter={setCurrentTeam} />
			)}
			{
				isFetching ? (
					<PlaceholderSelect placeholder='Pick a Player' />
				) : (
					<PlayerSelect data={roster} currentTeam={currentTeam} />
				)
			}
		</div>
	);
};

export default PlayerSearchSelectGroup;
