import { TeamRecord } from "@/types/standingsTypes";
import StandingsTeamCellName from "./StandingsTeamCellName";

type StandingsTeamTableProps = {
  team: TeamRecord[];
  conference: string;
}

const StandingsTeamTable = ({team, conference}: StandingsTeamTableProps) => {

  return (<table className="text-sm text-center">
  <thead>
    <tr>
      <th className='py-[20px] px-[8px] text-left'>{conference}</th>
      <th className='py-[20px] px-[8px] w-fit'>GP</th>
      <th className='py-[20px] px-[8px]'>W</th>
      <th className='py-[20px] px-[8px]'>L</th>
      <th className='py-[20px] px-[8px]'>OT</th>
      <th className='py-[20px] px-[8px]'>PTS</th>
      <th className='py-[20px] px-[8px]'>P%</th>
      <th className='py-[20px] px-[8px]'>RW</th>
      <th className='py-[20px] px-[8px]'>ROW</th>
      <th className='py-[20px] px-[8px]'>GF</th>
      <th className='py-[20px] px-[8px]'>GA</th>
      <th className='py-[20px] px-[8px]'>DIFF</th>
      <th className='py-[20px] px-[8px]'>HOME</th>
      <th className='py-[20px] px-[8px]'>AWAY</th>
      <th className='py-[20px] px-[8px]'>S/0</th>
      <th className='py-[20px] px-[8px]'>L10</th>
      <th className='py-[20px] px-[8px]'>STRK</th>
    </tr>
  </thead>
  <tbody>
    {team?.map((team, index) => {
      const goalDiff = team.goalsScored - team.goalsAgainst;
      const homeRecord = team.records.overallRecords[0]
      const awayRecord = team.records.overallRecords[1]
      const shootoutRecord = team.records.overallRecords[2]
      const lastTen = team.records.overallRecords[3]

      const teamRank = conference === 'Wild Card' ? team.wildCardRank : team.divisionRank;

      return (
      <tr key={index}>
        <StandingsTeamCellName team={team} rank={teamRank} />
        {/* <td className='py-[13px] px-[8px] w-[200px] text-left'>{`${teamRank}  ${team.clinchIndicator ? `${team.clinchIndicator}-`: ''}${team.team.name}`}</td> */}
        <td className='py-[13px] px-[8px]'>{team.gamesPlayed}</td>
        <td className='py-[13px] px-[8px]'>{team.leagueRecord.wins}</td>
        <td className='py-[13px] px-[8px]'>{team.leagueRecord.losses}</td>
        <td className='py-[13px] px-[8px]'>{team.leagueRecord.ot}</td>
        <td className='py-[13px] px-[8px]'>{team.points}</td>
        <td className='py-[13px] px-[8px]'>{(team.pointsPercentage).toFixed(3)}</td>
        <td className='py-[13px] px-[8px]'>{team.regulationWins}</td>
        <td className='py-[13px] px-[8px]'>{team.row}</td>
        <td className='py-[13px] px-[8px]'>{team.goalsScored}</td>
        <td className='py-[13px] px-[8px]'>{team.goalsAgainst}</td>
        <td className={`py-[13px] px-[8px] ${goalDiff > 0 ? 'text-green-500 before:content-["+"]' : 'text-red-500'}`}>{goalDiff}</td>
        <td className='py-[13px] px-[8px]'>{`${homeRecord.wins}-${homeRecord.losses}- ${homeRecord.ot}`}</td>
        <td className='py-[13px] px-[8px]'>{`${awayRecord.wins}-${awayRecord.losses}- ${awayRecord.ot}`}</td>
        <td className='py-[13px] px-[8px]'>{`${shootoutRecord.wins}-${shootoutRecord.losses}`}</td>
        <td className='py-[13px] px-[8px]'>{`${lastTen.wins}-${lastTen.losses}- ${lastTen.ot}`}</td>
        <td className='py-[13px] px-[8px]'>{team.streak?.streakCode}</td>
      </tr>
    )})}
  </tbody>
</table>)
}

export default StandingsTeamTable