interface GoalieCareerStatTableProps {
  player: NHLPlayer;
}

const GoalieCareerStatTable = ({player}: GoalieCareerStatTableProps) => {

  const headers = [
    'Season',
    'GP',
    'GS',
    'W',
    'L',
    'T',
    'OT',
    'SA',
    'GA',
    'GAA',
    'SV%',
    'SO',
    'MIN'
  ]

  const playerData = player?.people?.[0];

	const careerStats = playerData?.stats?.slice(2);

  return (
		<div className='hidden md:block overflow-x-auto m-auto w-full rounded-md '>
			<table className='table w-full table-responsive rounded-md text-center border-collapse text-sm '>
				<thead className='table-header-group bg-slate-500 rounded-md p-4'>
					<tr className='table-row rounded-md'>
						{headers.map((header: string, index: number) => (
							<th
								key={header}
								className={`table-cell px-[8px] py-[13px] ${
									index === headers.length - 1 ? 'rounded-tr-md' : null
								} ${
									index === 0
										? 'rounded-tl-md sticky left-0 bg-slate-500'
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

						console.log(stat);
						const goalie = stat.splits?.[0]?.stat as GoalieSplitStats;
						if (stat.splits.length) {
							return (
								<tr className='table-row bg-slate-800' key={stat.type.displayName}>
									<td className='table-cell text-left text-small break-keep px-[8px] py-[13px] sticky left-0 bg-black'>
										{statTitle}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.games}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.gamesStarted}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.wins}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.losses}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.ties || '--' }
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.ot}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.shotsAgainst}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.goalsAgainst}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{(goalie.goalAgainstAverage!).toFixed(2)}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{(goalie.savePercentage!).toFixed(3)}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.shutouts}
									</td>
									<td className='table-cell px-[8px] py-[13px]'>
										{goalie.timeOnIce}
									</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		</div>
	);
}

export default GoalieCareerStatTable