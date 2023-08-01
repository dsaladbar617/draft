'use client';

import axios from 'axios';
import { Suspense, useState } from 'react';
import getNHLYears from '@/lib/getCurrentYear';
import useSWR, { Fetcher } from 'swr';
import SeasonSelect from '@/components/SeasonSelect';
import TeamsSelect from '@/components/TeamsSelect';
import BasicSelect from '@/components/BasicSelect';

const Page = () => {
	// Returns an array of years in the format of YYYY-YYYY
	const dates = getNHLYears();

	// Set the current date to the first year in the array

	const [currentDate, setCurrentDate] = useState<string | null>(
		dates[0].replace('-', '')
	);
	const [currentTeam, setCurrentTeam] = useState<string | null>(null);

	// Fetch the data from the API
	const fetcher: Fetcher<TeamType> = async (currentDate: string) => {
		const { data } = await axios.get(
			`https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season=${currentDate}`
		);

		return data as TeamType;
	};

	const { data: teams, error } = useSWR(currentDate, fetcher);

	const options = teams?.teams.map((elem) => ({
		value: elem.id,
		label: elem.name
	}));

	console.log(currentDate);

	return (
		<>
			{/* <select
				className='text-black'
				onChange={(e) => {
					setCurrentDate(e.currentTarget.value.replace('-', ''));
				}}>
				<option value=''>Pick a Season...</option>
				{dates?.map((elem) => (
					<option key={elem} value={elem}>
						{elem}
					</option>
				))}
			</select> */}
			<SeasonSelect
				data={dates}
				setter={setCurrentDate}
				teams={teams ? teams.teams : null}
			/>
			{/* <Suspense */}
			{/* fallback={<BasicSelect data={null} placeholder='Select a Team' />}> */}
			<TeamsSelect data={teams?.teams} setter={setCurrentTeam} />
			{/* </Suspense> */}
		</>
	);
};

export default Page;
