import processTableHeaders from "@/lib/processTableHeaders";
import { v4 as uuidv4 } from "uuid";

type TestCareerTableProps = {
  player: NHLPlayer;
}

const CareerStatTable = ({player}: TestCareerTableProps) => {
  const playerData = player?.people?.[0];
  const playerPosition = playerData?.primaryPosition?.abbreviation;

  const headers = processTableHeaders(playerPosition)

  const careerStats = playerData?.stats?.slice(2);

  return (
		<div className='hidden md:block overflow-x-auto m-auto w-full rounded-md '>
			<table className='table w-full table-responsive rounded-md text-center border-collapse text-sm whitespace-nowrap'>
				<thead className='table-header-group bg-slate-500 rounded-md p-4'>
					<tr className='table-row rounded-md'>
						{headers.map((header: header, index: number) => {
              if (header.label === 'Team') return null
              return (
							<th
								key={uuidv4()}
								className={`table-cell px-[8px] py-[13px] ${
									index === headers.length - 1 ? 'rounded-tr-md' : null
								} ${
									index === 0
										? 'rounded-tl-md sticky left-0 bg-slate-500'
										: null
								}`}>
								{header.label}
							</th>
						)})}
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
								`${season.substring(0, index)}-${season.substring(index)}`;
						}

            const seasonStat = playerPosition === 'G' ? stat.splits?.[0]?.stat as GoalieSplitStats : stat.splits?.[0]?.stat as PlayerSplitStats;
						if (stat.splits.length) {
							return (
                <tr key={uuidv4()}>
                  {headers.map((header: header, index: number) => {
                    if (index === 0) return (
                      <td
                        key={uuidv4()}
                        className=" px-[8px] py-[13px] sticky left-0 bg-black "
                      >
                        {statTitle}
                      </td>
                    )

                    if (header.label === 'Team') return null;

                    return (<td key={uuidv4()} className=" px-[8px] py-[13px]">
                      {seasonStat[header.dataProp as keyof typeof seasonStat] || '-'}
                    </td>)
                  })}
                </tr>
							);
						}
					})}
				</tbody>
			</table>
		</div>
	);

}

export default CareerStatTable;