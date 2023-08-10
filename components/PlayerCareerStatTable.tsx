interface CareerStatTableProps {
	player: NHLPlayer;
}

const PlayerCareerStatTable = ({ player }: CareerStatTableProps) => {
	const headers = [
		'Season',
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
		'S%'
	];

	const playerData = player?.people?.[0];

	const careerStats = playerData?.stats?.slice(2);

	return (
		<div className=' overflow-x-auto mx-auto rounded-md hidden md:block'>
			<table className='table w-full rounded-md text-center border-collapse text-sm '>
				<thead className='table-header-group bg-slate-500 rounded-lg p-4'>
					<tr className='table-row rounded'>
						{headers.map((header: string, index: number) => (
							<th
								key={header}
								className={`table-cell px-[8px] py-[13px] ${
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
				<tbody className='table-row-group divide-y divide-gray-300 '>
					{careerStats?.map((stat) => {
						let statTitle = '';

						if (stat.type.displayName === 'careerRegularSeason') {
							statTitle = 'NHL Career';
						} else if (stat.type.displayName === 'careerPlayoffs') {
							statTitle = 'Career Playoffs';
						} else if (stat.type.displayName === 'statsSingleSeason') {
							const season = `${stat.splits[0]?.season}`;
							const index = 4;
							statTitle =
								season.substring(0, index) + '-' + season.substring(index);
						}

						const player = stat.splits?.[0]?.stat as PlayerSplitStats;
						if (stat.splits.length) {
							return (
								<tr className='table-row ' key={stat.type.displayName}>
									<td className='table-cell text-left text-small break-keep w-fit px-[8px] py-[13px] sticky left-0 bg-black'>
										{statTitle}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.games}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.goals}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.assists}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.points}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.plusMinus}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.penaltyMinutes}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.powerPlayGoals}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.powerPlayPoints}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.shortHandedGoals}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.shortHandedPoints}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.gameWinningGoals}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.overTimeGoals}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.shots}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{player.shotPct}
									</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		 </div>
	);
};

export default PlayerCareerStatTable;