import Image from 'next/image';
import CareerStatTable from '@/components/CareerStatTable';
import getProspect from '@/lib/getProspect';
import getPlayerWithStats from '@/lib/getPlayerWithStats';

type PageProps = {
	searchParams: { id: string };
};

const Page = async ({ searchParams }: PageProps) => {
	const id = searchParams.id;

	const fetchedPlayer =
		id.length === 5
			? (await getProspect(id)).prospects[0].nhlPlayerId?.toString()
			: id;

	if (fetchedPlayer === undefined) return <div className='text-center mt-10'>Player not found</div>;
	const player = await getPlayerWithStats(fetchedPlayer);
	const playerData = player?.people?.[0];

	return (
		<div>
			<div className='sm:flex sm:flex-row w-full justify-center'>
				<Image
					alt={`${playerData?.fullName} image`}
					src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerData?.id.toString()}@2x.jpg`}
					width={300}
					height={300}
					className='rounded-full'
					priority
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
		</div>
	);
};

export default Page;
