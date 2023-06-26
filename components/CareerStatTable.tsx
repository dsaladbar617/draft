interface CareerStatTableProps {
	player: NHLPlayer;
}

const CareerStatTable = ({ player }: CareerStatTableProps) => {
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
		<div className='table mx-auto mt-5 table-responsive rounded-md text-center p-4 w-2/3 border-collapse'>
			<div className='table-header-group bg-slate-500 rounded-lg p-4'>
				<div className='table-row rounded'>
					{headers.map((header: string, index: number) => (
						<div
							key={header}
							className={`table-cell p-4 ${
								index === headers.length - 1 ? 'rounded-tr-lg' : null
							} ${index === 0 ? 'rounded-tl-lg' : null}`}>
							{header}
						</div>
					))}
				</div>
			</div>
			<div className='table-row-group divide-y divide-gray-300'>
				{careerStats?.map((stat) => {
					return (
						<div className='table-row' key={stat.type.displayName}>
							<div className='table-cell p-4'>{stat.type.displayName}</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.games}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.goals}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.assists}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.points}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.plusMinus}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.penaltyMinutes}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.powerPlayGoals}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.powerPlayPoints}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.shortHandedGoals}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.shortHandedPoints}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.gameWinningGoals}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.overTimeGoals}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.shots}
							</div>
							<div className='table-cell p-4'>
								{stat.splits?.[0]?.stat?.shotPct}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CareerStatTable;
