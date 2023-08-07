'use client';
import { useState } from 'react';
import StatSelect from './StatSelect';
import { v4 as uuidv4 } from 'uuid';
// import Stats from '../types/Stats';

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

	const reducedStats =
		filteredStats.length > 0 &&
		filteredStats.reduce((acc, curr) => {
			const gamesPlayed = curr.stat?.games;
			const goals = curr.stat?.goals;
			const assists = curr.stat?.assists;
			const points = curr.stat?.points;
			const plusMinus = curr.stat?.plusMinus;
			const pim = curr.stat?.pim;
			const ppg = curr.stat?.powerPlayGoals;
			const ppp = curr.stat?.powerPlayPoints;
			const shg = curr.stat?.shortHandedGoals;
			const shp = curr.stat?.shortHandedPoints;
			const gwg = curr.stat?.gameWinningGoals;
			const otg = curr.stat?.overTimeGoals;
			const shots = curr.stat?.shots;
			const shotPct = curr.stat?.shotPct;
			const faceoffPct = curr.stat?.faceOffPct;

			console.log(curr.league?.name, curr.stat);
			return {
				stat: {
					games: acc.stat!.games + gamesPlayed!,
					goals: acc.stat!.goals + goals!,
					assists: acc.stat!.assists + assists!,
					points: acc.stat!.points + points!,
					plusMinus: acc.stat!.plusMinus + plusMinus!,
					pim: acc.stat!.pim + pim!,
					powerPlayGoals: acc.stat!.powerPlayGoals! + ppg!,
					powerPlayPoints: acc.stat!.powerPlayPoints! + ppp!,
					shortHandedGoals: acc.stat!.shortHandedGoals! + shg!,
					shortHandedPoints: acc.stat!.shortHandedPoints! + shp!,
					gameWinningGoals: acc.stat!.gameWinningGoals! + gwg!,
					overTimeGoals: acc.stat!.overTimeGoals! + otg!,
					shots: acc.stat!.shots! + shots!,
					shotPct: acc.stat!.shotPct! + shotPct!,
					faceOffPct: acc.stat!.faceOffPct! + faceoffPct!
				}
			};
		});

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
			{/* <div>{JSON.stringify(reducedStats.stat)}</div> */}
			<table className='table mx-auto mt-5 w-11/12 rounded-md text-center p-4 border-collapse overflow-x-auto '>
				<thead className='table-header-group bg-slate-500 rounded-lg p-4'>
					<tr className='table-row rounded'>
						{headers.map((header: string, index: number) => (
							<th
								key={header}
								className={` p-4 ${
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
								<td className=' p-4 sticky left-0 bg-black'>
									{`${stat.season?.substring(0, 4)}-${stat.season?.substring(
										4
									)}`}
								</td>
								<td className=' p-4'>{stat.team?.name}</td>
								<td className=' p-4'>{stat.stat?.games}</td>
								<td className=' p-4'>{stat.stat?.goals}</td>
								<td className=' p-4'>{stat.stat?.assists}</td>
								<td className=' p-4'>{stat.stat?.points}</td>
								<td className=' p-4'>{stat.stat?.plusMinus || '--'}</td>
								<td className=' p-4'>{stat.stat?.penaltyMinutes || '--'}</td>
								<td className=' p-4'>{stat.stat?.powerPlayGoals || '--'}</td>
								<td className=' p-4'>{stat.stat?.powerPlayPoints || '--'}</td>
								<td className=' p-4'>{stat.stat?.shortHandedGoals || '--'}</td>
								<td className=' p-4'>{stat.stat?.shortHandedPoints || '--'}</td>
								<td className=' p-4'>{stat.stat?.gameWinningGoals || '--'}</td>
								<td className=' p-4'>{stat.stat?.overTimeGoals || '--'}</td>
								<td className=' p-4'>{stat.stat?.shots || '--'}</td>
								<td className=' p-4'>{stat.stat?.shotPct || '--'}</td>
								<td className=' p-4'>{stat.stat?.faceOffPct || '--'}</td>
							</tr>
						);
					})}
					{reducedStats && (
						<tr>
							<td className=' p-4 sticky left-0 bg-black'>Career</td>
							<td className=' p-4'>{}</td>
							<td className=' p-4'>{reducedStats.stat?.games}</td>
							<td className=' p-4'>{reducedStats.stat?.goals}</td>
							<td className=' p-4'>{reducedStats.stat?.assists}</td>
							<td className=' p-4'>{reducedStats.stat?.points}</td>
							<td className=' p-4'>{reducedStats.stat?.plusMinus || '--'}</td>
							<td className=' p-4'>{reducedStats.stat?.pim || '--'}</td>
							<td className=' p-4'>
								{reducedStats.stat?.powerPlayGoals || '--'}
							</td>
							<td className=' p-4'>
								{reducedStats.stat?.powerPlayPoints || '--'}
							</td>
							<td className=' p-4'>
								{reducedStats.stat?.shortHandedGoals || '--'}
							</td>
							<td className=' p-4'>
								{reducedStats.stat?.shortHandedPoints || '--'}
							</td>
							<td className=' p-4'>
								{reducedStats.stat?.gameWinningGoals || '--'}
							</td>
							<td className=' p-4'>
								{reducedStats.stat?.overTimeGoals || '--'}
							</td>
							<td className=' p-4'>{reducedStats.stat?.shots || '--'}</td>
							<td className=' p-4'>
								{(reducedStats.stat?.shotPct &&
									(reducedStats.stat?.shotPct! / filteredStats.length).toFixed(
										2
									)) ||
									'--'}
							</td>
							<td className=' p-4'>
								{(reducedStats.stat?.faceOffPct &&
									(
										reducedStats.stat?.faceOffPct! / filteredStats.length
									).toFixed(2)) ||
									'--'}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default StatsTable;
