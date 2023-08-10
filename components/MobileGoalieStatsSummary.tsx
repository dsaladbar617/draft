import { v4 as uuidv4 } from "uuid";

interface MobileGoalieStatsSummaryProps {
  player: NHLPlayer
}

const MobileGoalieStatsSummary = ({player}: MobileGoalieStatsSummaryProps) => {

  const playerData = player?.people?.[0];

	const career = playerData?.stats?.slice(2);
  const careerStats = career?.[0]?.splits?.[0].stat as GoalieSplitStats;

  const careerPlayoffs = career?.[1]?.splits?.[0]?.stat as GoalieSplitStats;

  const recentSeason = career?.[2]?.splits?.[0];
  const recentSeasonStats = recentSeason.stat as GoalieSplitStats;

  // console.log(career)

  const headers = [
    'GP',
    'W',
    'L',
    'OT',
    'GAA',
    'SV%'
  ]



  return (
    <div className='block p-4 md:hidden'>
      <h2>Career Playoffs</h2>
      <table className="text-sm w-[98%] text-center mx-auto">
        <thead>
          <tr>
            {headers.map(elem => <th className="font-normal p-[8px]" key={uuidv4()}>{elem}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{careerPlayoffs?.games || '--'}</td>
            <td>{careerPlayoffs?.wins || '--'}</td>
            <td>{careerPlayoffs?.losses || '--'}</td>
            <td>{careerPlayoffs?.ot || '0'}</td>
            <td>{(careerPlayoffs?.goalAgainstAverage)?.toFixed(2) || '--'}</td>
            <td>{(careerPlayoffs?.savePercentage)?.toFixed(3) || '--'}</td>
          </tr>
          </tbody>
      </table>
      <h2>{recentSeason.season?.substring(0, 4) + '-' + recentSeason.season?.substring(4)} Regular Season</h2>
      <table className="text-sm w-[98%] text-center mx-auto">
        <thead>
          <tr>
            {headers.map(elem => <th className="font-normal p-[8px]" key={uuidv4()}>{elem}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{recentSeasonStats?.games || '--'}</td>
            <td>{recentSeasonStats?.wins || '--'}</td>
            <td>{recentSeasonStats?.losses || '--'}</td>
            <td>{recentSeasonStats?.ot || '0'}</td>
            <td>{(recentSeasonStats?.goalAgainstAverage)?.toFixed(2) || '--'}</td>
            <td>{(recentSeasonStats?.savePercentage)?.toFixed(3) || '--'}</td>
          </tr>
          </tbody>
      </table>
      <h2>Career</h2>
      <table className="text-sm w-[98%] text-center mx-auto">
        <thead>
          <tr>
            {headers.map(elem => <th className="font-normal p-[8px]" key={uuidv4()}>{elem}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{careerStats?.games || '--'}</td>
            <td>{careerStats?.wins || '--'}</td>
            <td>{careerStats?.losses || '--'}</td>
            <td>{careerStats?.ot || '--'}</td>
            <td>{(careerStats?.goalAgainstAverage)?.toFixed(2) || '--'}</td>
            <td>{(careerStats?.savePercentage)?.toFixed(3) || '--'}</td>
          </tr>
          </tbody>
      </table>
    </div>
  )
}

export default MobileGoalieStatsSummary