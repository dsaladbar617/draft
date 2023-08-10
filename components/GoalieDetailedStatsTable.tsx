'use client';
import { useState } from "react";
import StatSelect from "./group/StatSelect/StatSelect";
import { v4 as uuidv4 } from "uuid";

interface GoalieDetailedStatsTableProps {
  player: NHLPlayer;
}

const GoalieDetailedStatsTable = ({player}: GoalieDetailedStatsTableProps) => {
  const [seasonType, setSeasonType] = useState("Regular Season");
  const [currentLeauge, setCurrentLeague] = useState("National Hockey League");

  const headers = [
    'Season',
    'Team',
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
  ];

let index = -1;
  let careerIndex = -1;
  if (seasonType === 'Regular Season') {
    index = 0;
    careerIndex = 2;
  } else if (seasonType === 'Playoffs') {
    index = 1;
    careerIndex = 3;
  }

  const playerData = player?.people?.[0];

  console.log(playerData)

  const yearByYearStats = playerData?.stats[index];

  const filteredStats = yearByYearStats?.splits.filter((elem) => {
    if (currentLeauge !== "all")
      return elem.league?.name === currentLeauge ? elem : null;

    return elem;
  });

  const careerStats = playerData?.stats[careerIndex].splits[0].stat as GoalieSplitStats;

  const leagues = playerData?.stats[0].splits.map((elem) => {
    return elem.league?.name;
  });
  const uniqueLeagues = [...new Set(leagues)];

  console.log(filteredStats)

  return (
    <div className=''>
      <StatSelect
        leagueType={uniqueLeagues}
        setSeason={setSeasonType}
        setLeague={setCurrentLeague}
      />
      <h1 className="text-2xl mt-3 pl-2">{`${playerData.fullName} Career Stats`}</h1>
      <div className="overflow-x-auto mt-2 rounded-md w-[99%] mx-auto">
        {filteredStats.length > 0 ? (
          <table className="table table-responsive text-sm w-full mx-auto rounded-md text-center border-collapse overflow-x-auto ">
            <thead className="table-header-group bg-slate-500 rounded-md p-4">
              <tr className="table-row rounded">
                {headers.map((header: string, index: number) => (
                  <th
                    key={header}
                    className={` px-[8px] py-[13px] ${
                      index === headers.length - 1 ? "rounded-tr-md" : null
                    } ${
                      index === 0
                        ? "rounded-tl-md sticky left-0 bg-slate-500"
                        : null
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-row-group divide-y divide-gray-300">
              {filteredStats.map((stat) => {

                const goalie = stat.stat as GoalieSplitStats;
                return (
                  <tr className="table-row bg-slate-800" key={uuidv4()}>
                    <td className=" px-[8px] py-[13px] sticky left-0 bg-black">
                      {`${stat.season?.substring(
                        0,
                        4
                      )}-${stat.season?.substring(4)}`}
                    </td>
                    <td className=" px-[8px] py-[13px]">{stat.team?.name}</td>
                    <td className=" px-[8px] py-[13px]">{goalie.games}</td>
                    <td className=" px-[8px] py-[13px]">{goalie.gamesStarted || '--'}</td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.wins || '--'}
                    </td>
                    <td className=" px-[8px] py-[13px]">{goalie.losses || '--'}</td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.ties || '--'}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.ot || '--'}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.shotsAgainst || '--'}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.goalsAgainst || '--'}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(goalie.goalAgainstAverage).toFixed(2)}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(goalie.savePercentage).toFixed(3)}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.shutouts || '--'}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.timeOnIce || '--'}
                    </td>
                  </tr>
                );
              })}
              { currentLeauge === "National Hockey League" && (
                <tr className='bg-slate-800'>
                  <td className=" px-[8px] py-[13px] sticky left-0 bg-black">
                    Career
                  </td>
                  <td className=" px-[8px] py-[13px]">{"-"}</td>
                  <td className=" px-[8px] py-[13px]">{careerStats.games}</td>
                    <td className=" px-[8px] py-[13px]">{careerStats.gamesStarted  || "--"}</td>
                    <td className=" px-[8px] py-[13px]">
                      {careerStats.wins  || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">{careerStats.losses  || "--"}</td>
                    <td className=" px-[8px] py-[13px]">
                      {careerStats.ties || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {careerStats.ot || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {careerStats.shotsAgainst || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(careerStats.goalsAgainst) || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(careerStats.goalAgainstAverage)?.toFixed(2) || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(careerStats.savePercentage)?.toFixed(3) || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {careerStats.shutouts || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {careerStats.timeOnIce || '--'}
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div>{`${playerData.fullName} does not have any ${currentLeauge} stats`}</div>
        )}
      </div>
    </div>
  );
}

export default GoalieDetailedStatsTable