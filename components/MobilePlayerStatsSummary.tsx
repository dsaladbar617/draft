import { v4 as uuidv4 } from "uuid";


interface MobilePlayerStatsSummaryProps {
  player: NHLPlayer;
}

const MobilePlayerStatsSummary = ({player}: MobilePlayerStatsSummaryProps) => {
  const playerData = player?.people?.[0];

	const career = playerData?.stats?.slice(2);
  const careerStats = career?.[0]?.splits?.[0].stat as PlayerSplitStats;

  const careerPlayoffs = career?.[1]?.splits?.[0]?.stat as PlayerSplitStats;

  const recentSeason = career?.[2]?.splits?.[0];
  const recentSeasonStats = recentSeason.stat as PlayerSplitStats;

  // console.log(career)

  const headers = [
    'GP',
    'G',
    'A',
    'P',
    '+/-'
  ]

  return (
    <div className=' p-4 md:hidden'>
      <h2>Career Playoffs</h2>
      <table className="text-sm w-full text-center mx-auto">
        <thead>
          <tr>
            {headers.map(elem => <th className="font-normal p-[8px]" key={uuidv4()}>{elem}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-[8px]'>{careerPlayoffs?.games || '--'}</td>
            <td className='p-[8px]'>{careerPlayoffs?.goals || '--'}</td>
            <td className='p-[8px]'>{careerPlayoffs?.assists || '--'}</td>
            <td className='p-[8px]'>{careerPlayoffs?.points || '0'}</td>
            <td className='p-[8px]'>{careerPlayoffs?.plusMinus || '--'}</td>
          </tr>
          </tbody>
      </table>
      <h2>{recentSeason.season?.substring(0, 4) + '-' + recentSeason.season?.substring(4)} Regular Season</h2>
      <table className="text-sm w-full text-center mx-auto">
        <thead>
          <tr>
            {headers.map(elem => <th className="font-normal p-[8px]" key={uuidv4()}>{elem}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-[8px]'>{recentSeasonStats?.games || '--'}</td>
            <td className='p-[8px]'>{recentSeasonStats?.goals || '--'}</td>
            <td className='p-[8px]'>{recentSeasonStats?.assists || '--'}</td>
            <td className='p-[8px]'>{recentSeasonStats?.points || '0'}</td>
            <td className='p-[8px]'>{recentSeasonStats?.plusMinus || '--'}</td>
          </tr>
          </tbody>
      </table>
      <h2>Career</h2>
      <table className="text-sm w-full text-center mx-auto">
        <thead>
          <tr>
            {headers.map(elem => <th className="font-normal p-[8px]" key={uuidv4()}>{elem}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='p-[8px]'>{careerStats?.games || '--'}</td>
            <td className='p-[8px]'>{careerStats?.goals || '--'}</td>
            <td className='p-[8px]'>{careerStats?.assists || '--'}</td>
            <td className='p-[8px]'>{careerStats?.points || '--'}</td>
            <td className='p-[8px]'>{careerStats?.plusMinus || '--'}</td>
          </tr>
          </tbody>
      </table>
    </div>
  )
}

export default MobilePlayerStatsSummary