'use client';

import useFetchPlayerWithStats from '@/lib/fetchPlayerWithStats';
import useFetchProspect from '@/lib/fetchProspect';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const Page = ({}) => {
	const searchParams = useSearchParams();

	const id = searchParams.get('id');

	const { data: prospect } = useFetchProspect(id!);

	const fetchedPlayer = prospect?.prospects[0].nhlPlayerId;

	// const player = useFetchPlayerWithStats(fetchedPlayer!.toString());
	const { data: player1, isLoading } = useQuery({
		queryKey: ['player', fetchedPlayer],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://statsapi.web.nhl.com/api/v1/people/${fetchedPlayer}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason`
			);

			return data as NHLPlayer;
		},
		enabled: !!fetchedPlayer
	});

	console.log(player1);

	const playerData = player1?.people?.[0];

	if (isLoading) return <h1>Is Loading...</h1>;

	return (
		<div>
			<h1>Name: {playerData?.fullName}</h1>
			<h2>Height: {playerData?.height}</h2>
			<h2>Weight: {playerData?.weight}</h2>
			<h2>Born: {playerData?.birthDate}</h2>
			<h2>
				Birthplace: {`${playerData?.birthCity}, ${playerData?.birthCountry}`}
			</h2>
			<h2>Shoots: {playerData?.shootsCatches}</h2>
			{/* <h2>Draft: {playerData?.}</h2> */}
		</div>
	);
};

export default Page;
