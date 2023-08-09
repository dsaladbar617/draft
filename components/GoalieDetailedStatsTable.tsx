'use client';
import { useState } from "react";
import StatSelect from "./group/StatSelect/StatSelect";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
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
  switch (seasonType) {
    case "Regular Season":
      index = 0;
      break;
    case "Playoffs":
      index = 1;
      break;
    default:
      break;
  }

  let careerIndex = -1;
  switch (seasonType) {
    case "Regular Season":
      careerIndex = 2;
      break;
    case "Playoffs":
      careerIndex = 3;
      break;
    default:
      break;
  }

  const playerData = player?.people?.[0];

  const yearByYearStats = playerData?.stats[index];

  const filteredStats = yearByYearStats?.splits.filter((elem) => {
    if (currentLeauge !== "all")
      return elem.league?.name === currentLeauge ? elem : null;

    return elem;
  });

  const reducedStats =
    // filteredStats.length > 0 &&
    filteredStats.reduce((acc, curr) => {
      const goalie = curr.stat as GoalieSplitStats;
      const gamesPlayed = goalie.games;
      const gamesStarted = goalie.gamesStarted;
      const wins = goalie.wins;
      const losses = goalie.losses;
      const ties = goalie.ties;
      const ot = goalie.ot;
      const shotsAgainst = goalie.shotsAgainst;
      const goalsAgainst = goalie.goalsAgainst;
      const goalsAgainstAverage = Math.ceil(goalie.goalAgainstAverage * 10) / 10;
      const saves = goalie.saves;
      const savePercentage = goalie.savePercentage;
      const shutouts = goalie.shutouts;
      const minutes = goalie.timeOnIce;

      const minutesSplit = minutes!.split(':');
      // const hours = parseInt(minutesSplit[0]) / 60;
      const seconds = parseInt(minutesSplit[0]) * 60 + parseInt(minutesSplit[1]);

      // console.log(seconds);
      const goalieAcc = acc.stat as GoalieSplitStats;

      return {
        stat: {
          games: goalieAcc.games + gamesPlayed,
          gamesStarted: goalieAcc.gamesStarted! + gamesStarted!,
          wins: goalieAcc.wins! + wins!,
          losses: goalieAcc.losses! + losses!,
          ties: goalieAcc.ties! + ties!,
          ot: goalieAcc.ot! + ot!,
          shotsAgainst: goalieAcc.shotsAgainst! + shotsAgainst!,
          goalsAgainst: goalieAcc.goalsAgainst! + goalsAgainst!,
          goalAgainstAverage: goalieAcc.goalAgainstAverage! + goalsAgainstAverage!,
          saves: goalieAcc.saves! + saves!,
          savePercentage: goalieAcc.savePercentage! + savePercentage!,
          shutouts: goalieAcc.shutouts! + shutouts!,
          // minutes: goalieAcc.timeOnIce! + minutes!,
          seconds: goalieAcc.seconds! + seconds!
        },
      };
    }, {
      stat: {
        games: 0,
        gamesStarted: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        ot: 0,
        shotsAgainst: 0,
        goalsAgainst: 0,
        goalAgainstAverage: 0,
        saves: 0,
        savePercentage: 0,
        shutouts: 0,
        // minutes: "0",
        seconds: 0!
      } as GoalieSplitStats,
    });

    const reducedGoalieStats = reducedStats?.stat as GoalieSplitStats;


    const leagues = playerData?.stats[0].splits.map((elem) => {
    return elem.league?.name;
  });
  const uniqueLeagues = [...new Set(leagues)];

  const reducedSeconds = (reducedGoalieStats.seconds! % 60).toString();

  console.log( reducedGoalieStats.seconds! ,reducedGoalieStats.seconds! % 60);
  return (
    <div>
      <StatSelect
        leagueType={uniqueLeagues}
        setSeason={setSeasonType}
        setLeague={setCurrentLeague}
      />
      <h1 className="text-2xl mt-3 pl-2">{`${playerData.fullName} Career Stats`}</h1>
      <div className="overflow-x-auto rounded-md w-full mx-auto">
        {filteredStats.length > 0 ? (
          <table className="table text-sm  w-[99%] mx-auto mt-2 rounded-md text-center p-4 border-collapse overflow-x-auto ">
            <thead className="table-header-group bg-slate-500 rounded-lg px-[8px] py-[13px]">
              <tr className="table-row rounded">
                {headers.map((header: string, index: number) => (
                  <th
                    key={header}
                    className={` px-[8px] py-[13px] ${
                      index === headers.length - 1 ? "rounded-tr-lg" : null
                    } ${
                      index === 0
                        ? "rounded-tl-lg sticky left-0 bg-slate-500"
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
                // console.log(goalie.ties)
                return (
                  <tr className="table-row" key={uuidv4()}>
                    <td className=" px-[8px] py-[13px] sticky left-0 bg-black">
                      {`${stat.season?.substring(
                        0,
                        4
                      )}-${stat.season?.substring(4)}`}
                    </td>
                    <td className=" px-[8px] py-[13px]">{stat.team?.name}</td>
                    <td className=" px-[8px] py-[13px]">{goalie.games}</td>
                    <td className=" px-[8px] py-[13px]">{goalie.gamesStarted}</td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.wins}
                    </td>
                    <td className=" px-[8px] py-[13px]">{goalie.losses}</td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.ties}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.ot}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.shotsAgainst}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.goalsAgainst}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(goalie.goalAgainstAverage).toFixed(2)}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(goalie.savePercentage).toFixed(3)}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.shutouts}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {goalie.timeOnIce}
                    </td>
                  </tr>
                );
              })}
              {reducedStats && currentLeauge !== "all" && (
                <tr>
                  <td className=" px-[8px] py-[13px] sticky left-0 bg-black">
                    Career
                  </td>
                  <td className=" px-[8px] py-[13px]">{"-"}</td>
                  <td className=" px-[8px] py-[13px]">{reducedGoalieStats.games}</td>
                    <td className=" px-[8px] py-[13px]">{reducedGoalieStats.gamesStarted}</td>
                    <td className=" px-[8px] py-[13px]">
                      {reducedGoalieStats.wins}
                    </td>
                    <td className=" px-[8px] py-[13px]">{reducedGoalieStats.losses}</td>
                    <td className=" px-[8px] py-[13px]">
                      {reducedGoalieStats.ties || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {reducedGoalieStats.ot || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {reducedGoalieStats.shotsAgainst || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {reducedGoalieStats.goalsAgainst || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(reducedGoalieStats.goalAgainstAverage / filteredStats.length ).toFixed(2) || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {(reducedGoalieStats.savePercentage / filteredStats.length).toFixed(3) || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {reducedGoalieStats.shutouts || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {`${reducedSeconds.length === 2 ? (reducedGoalieStats.seconds! / 60 - 1).toFixed(0) : (reducedGoalieStats.seconds! / 60).toFixed(0) }:${reducedSeconds.length !== 2 ? `0${reducedSeconds}` : reducedSeconds} ` || '--'}
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