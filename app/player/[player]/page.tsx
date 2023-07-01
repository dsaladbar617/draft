// 'use client';

import Image from 'next/image';
import CareerStatTable from '@/components/CareerStatTable';
import useFetchProspect from '@/lib/useFetchProspect';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import getProspect from '@/lib/getProspect';
import getPlayerWithStats from '@/lib/getPlayerWithStats';

const Page = async ({ searchParams }: any) => {
	// const { data: prospect } = useFetchProspect(searchParams.id);

	// const fetchedPlayer = prospect?.prospects[0].nhlPlayerId;

	// const { data: player, isLoading } = useQuery({
	// 	queryKey: ['player', fetchedPlayer],
	// 	queryFn: async () => {
	// 		const { data } = await axios.get(
	// 			`https://statsapi.web.nhl.com/api/v1/people/${fetchedPlayer}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason,careerPlayoffs,statsSingleSeason`
	// 		);

	// 		return data as NHLPlayer;
	// 	},
	// 	enabled: !!fetchedPlayer
	// });

	const prospect = await getProspect(searchParams.id);

	const player = await getPlayerWithStats(
		prospect.prospects[0].nhlPlayerId?.toString()
	);

	const playerData = player?.people?.[0];

	// if (isLoading) return <h1>Is Loading...</h1>;

	return (
		<>
			<div className='sm:flex sm:flex-row w-full justify-center'>
				<Image
					alt={`${playerData?.fullName} image`}
					src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerData?.id.toString()}@2x.jpg`}
					width={300}
					height={300}
					priority
					className='rounded-full'
				/>
				<div className=' bg-slate-500 rounded text-left p-5 text-xl'>
					<h1>Name: {playerData?.fullName}</h1>
					<h2>Height: {playerData?.height}</h2>
					<h2>Weight: {playerData?.weight}</h2>
					<h2>Born: {playerData?.birthDate}</h2>
					<h2>
						Birthplace:{' '}
						{`${playerData?.birthCity}, ${playerData?.birthCountry}`}
					</h2>
					<h2>Shoots: {playerData?.shootsCatches}</h2>
				</div>
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
