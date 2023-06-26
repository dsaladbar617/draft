'use client';

import CareerStatTable from '@/components/CareerStatTable';
import useFetchProspect from '@/lib/useFetchProspect';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const Page = ({}) => {
	const searchParams = useSearchParams();

	const id = searchParams.get('id');

	const { data: prospect } = useFetchProspect(id!);

	const fetchedPlayer = prospect?.prospects[0].nhlPlayerId;

	const { data: player, isLoading } = useQuery({
		queryKey: ['player', fetchedPlayer],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://statsapi.web.nhl.com/api/v1/people/${fetchedPlayer}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason,careerPlayoffs,statsSingleSeason`
			);

			return data as NHLPlayer;
		},
		enabled: !!fetchedPlayer
	});

	const playerData = player?.people?.[0];

	if (isLoading) return <h1>Is Loading...</h1>;

	return (
		<>
			<div className='w-1/3 bg-slate-500 rounded text-center p-5 mx-auto text-xl'>
				<h1>Name: {playerData?.fullName}</h1>
				<h2>Height: {playerData?.height}</h2>
				<h2>Weight: {playerData?.weight}</h2>
				<h2>Born: {playerData?.birthDate}</h2>
				<h2>
					Birthplace: {`${playerData?.birthCity}, ${playerData?.birthCountry}`}
				</h2>
				<h2>Shoots: {playerData?.shootsCatches}</h2>
			</div>
			{/* <h2>Draft: {playerData?.}</h2> */}
			<div>
				<h1 className='text-2xl text-center'>Stats</h1>
				<CareerStatTable player={player!} />
			</div>
		</>
	);
};

export default Page;
