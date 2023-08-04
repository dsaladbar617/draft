'use client';
import { useState } from 'react';
import StatSelect from './StatSelect';
import { v4 as uuidv4 } from 'uuid';

interface StatsTableProps {
	player: NHLPlayer;
}

const StatsTable = ({ player }: StatsTableProps) => {
	const [seasonType, setSeasonType] = useState('Regular Season');
	const [currentLeauge, setCurrentLeague] = useState('National Hockey League');

	const headers = [
		'Season',
		'Team',
		'GP',
		'G',
		'A',
		'P',
		'+/-',
		'PIM',
		'PPG',
		'PPP',
		'SHG',
		'SHP',
		'GWG',
		'OTG',
		'S',
		'S%',
		'FO%'
	];

	let index = -1;
	switch (seasonType) {
		case 'Regular Season':
			index = 0;
			break;
		case 'Playoffs':
			index = 1;
			break;
		default:
			break;
	}

	let careerIndex = -1;
	switch (seasonType) {
		case 'Regular Season':
			careerIndex = 2;
			break;
		case 'Playoffs':
			careerIndex = 3;
			break;
		default:
			break;
	}

	const playerData = player?.people?.[0];

	const yearByYearStats = playerData?.stats[index];

	const filteredStats = yearByYearStats?.splits.filter((elem) =>
		elem.league?.name === currentLeauge ? elem : null
	);

	console.log(filteredStats);

	// filteredStats.reduce((acc, curr) => {
	// 	const gamesPlayed = curr.stat?.games;
	// 	const goals = curr.stat?.goals;
	// 	const assists = curr.stat?.assists;
	// 	const points = curr.stat?.points;
	// 	const plusMinus = curr.stat?.plusMinus;
	// 	const penaltyMinutes = curr.stat?.pim;
	// 	const powerPlayGoals = curr.stat?.powerPlayGoals;
	// 	const powerPlayPoints = curr.stat?.powerPlayPoints;
	// 	const shortHandedGoals = curr.stat?.shortHandedGoals;
	// 	const shortHandedPoints = curr.stat?.shortHandedPoints;
	// 	const gameWinningGoals = curr.stat?.gameWinningGoals;
	// 	const overTimeGoals = curr.stat?.overTimeGoals;
	// 	const shots = curr.stat?.shots;
	// 	const shootingPercentage = curr.stat?.shotPct;
	// 	const faceOffPercentage = curr.stat?.faceOffPct;

	// 	return {...acc,
	// 		[gamesPlayed!]: [...(acc[gamesPlayed!] || []), (gamesPlayed)],)]};
	// }, {});

	const careerStats = playerData?.stats[careerIndex];

	const leagues = playerData?.stats[1].splits.map((elem) => {
		return elem.league?.name;
	});
	const uniqueLeagues = [...new Set(leagues)];

	return (
		<div className='w-full'>
			<StatSelect
				leagueType={uniqueLeagues}
				setSeason={setSeasonType}
				setLeague={setCurrentLeague}
			/>
			<div>{JSON.stringify(filteredStats)}</div>
			{/* <table className='table mx-auto mt-5 table-responsive rounded-md text-center p-4 w-2/3 border-collapse overflow-x-auto '>
				<thead className='table-header-group bg-slate-500 rounded-lg p-4'>
					<tr className='table-row rounded'>
						{headers.map((header: string, index: number) => (
							<th
								key={header}
								className={`table-cell p-4 ${
									index === headers.length - 1 ? 'rounded-tr-lg' : null
								} ${
									index === 0
										? 'rounded-tl-lg sticky left-0 bg-slate-500'
										: null
								}`}>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className='table-row-group divide-y divide-gray-300'>
					{filteredStats.map((stat) => {
						return (
							<tr className='table-row' key={uuidv4()}>
								<td className='table-cell p-4 sticky left-0 bg-black'>
									{`${stat.season?.substring(0, 4)}-${stat.season?.substring(
										4
									)}`}
								</td>
								<td className='table-cell p-4'>{stat.team?.name}</td>
								<td className='table-cell p-4'>{stat.stat?.games}</td>
								<td className='table-cell p-4'>{stat.stat?.goals}</td>
								<td className='table-cell p-4'>{stat.stat?.assists}</td>
								<td className='table-cell p-4'>{stat.stat?.points}</td>
								<td className='table-cell p-4'>
									{stat.stat?.plusMinus || '--'}
								</td>
								<td className='table-cell p-4'>
									{stat.stat?.penaltyMinutes || '--'}
								</td>
								<td className='table-cell p-4'>
									{stat.stat?.powerPlayGoals || '--'}
								</td>
								<td className='table-cell p-4'>
									{stat.stat?.powerPlayPoints || '--'}
								</td>
								<td className='table-cell p-4'>
									{stat.stat?.shortHandedGoals || '--'}
								</td>
								<td className='table-cell p-4'>
									{stat.stat?.shortHandedPoints || '--'}
								</td>
								<td className='table-cell p-4'>
									{stat.stat?.gameWinningGoals || '--'}
								</td>
								<td className='table-cell p-4'>
									{stat.stat?.overTimeGoals || '--'}
								</td>
								<td className='table-cell p-4'>{stat.stat?.shots || '--'}</td>
								<td className='table-cell p-4'>{stat.stat?.shotPct || '--'}</td>
								<td className='table-cell p-4'>
									{stat.stat?.faceOffPct || '--'}
								</td>
							</tr>
						);
					})}
					<tr>
						<td className='table-cell p-4 sticky left-0 bg-black'>Career</td>
						<td className='table-cell p-4'>{}</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.games}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.goals}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.assists}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.points}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.plusMinus || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.penaltyMinutes || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.powerPlayGoals || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.powerPlayPoints || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.shortHandedGoals || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.shortHandedPoints || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.gameWinningGoals || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.overTimeGoals || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.shots || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.shotPct || '--'}
						</td>
						<td className='table-cell p-4'>
							{careerStats.splits[0].stat?.faceOffPct || '--'}
						</td>
					</tr>
				</tbody>
			</table> */}
		</div>
	);
};

export default StatsTable;
