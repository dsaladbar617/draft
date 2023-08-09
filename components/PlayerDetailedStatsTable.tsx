"use client";
import { useState } from "react";
import StatSelect from "./group/StatSelect/StatSelect";
import { v4 as uuidv4 } from "uuid";

interface StatsTableProps {
  player: NHLPlayer;
}

const PlayerDetailedStatsTable = ({ player }: StatsTableProps) => {
  const [seasonType, setSeasonType] = useState("Regular Season");
  const [currentLeauge, setCurrentLeague] = useState("National Hockey League");

  const headers = [
    "Season",
    "Team",
    "GP",
    "G",
    "A",
    "P",
    "+/-",
    "PIM",
    "PPG",
    "PPP",
    "SHG",
    "SHP",
    "GWG",
    "OTG",
    "S",
    "S%",
    "FO%",
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

      const player = curr.stat as PlayerSplitStats;
      const gamesPlayed = player.games;
      const goals = player.goals;
      const assists = player.assists;
      const points = player.points;
      const plusMinus = player.plusMinus;
      const pim = player.pim;
      const ppg = player.powerPlayGoals;
      const ppp = player.powerPlayPoints;
      const shg = player.shortHandedGoals;
      const shp = player.shortHandedPoints;
      const gwg = player.gameWinningGoals;
      const otg = player.overTimeGoals;
      const shots = player.shots;
      const shotPct = player.shotPct;
      const faceoffPct = player.faceOffPct;

      const playerAcc = acc.stat as PlayerSplitStats;

      return {
        stat: {
          games: playerAcc.games + gamesPlayed!,
          goals: playerAcc.goals + goals!,
          assists: playerAcc.assists + assists!,
          points: playerAcc.points + points!,
          plusMinus: playerAcc.plusMinus! + plusMinus!,
          pim: playerAcc.pim + pim!,
          powerPlayGoals: playerAcc.powerPlayGoals! + ppg!,
          powerPlayPoints: playerAcc.powerPlayPoints! + ppp!,
          shortHandedGoals: playerAcc.shortHandedGoals! + shg!,
          shortHandedPoints: playerAcc.shortHandedPoints! + shp!,
          gameWinningGoals: playerAcc.gameWinningGoals! + gwg!,
          overTimeGoals: playerAcc.overTimeGoals! + otg!,
          shots: playerAcc.shots! + shots!,
          shotPct: playerAcc.shotPct! + shotPct!,
          faceOffPct: playerAcc.faceOffPct! + faceoffPct!,
        },
      };
    });

    const reducedPlayerStats = reducedStats?.stat as PlayerSplitStats;

  const careerStats = playerData?.stats[careerIndex];

  const leagues = playerData?.stats[0].splits.map((elem) => {
    return elem.league?.name;
  });
  const uniqueLeagues = [...new Set(leagues)];

  return (
    <>
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
                const player = stat.stat as PlayerSplitStats;
                return (
                  <tr className="table-row" key={uuidv4()}>
                    <td className=" px-[8px] py-[13px] sticky left-0 bg-black">
                      {`${stat.season?.substring(
                        0,
                        4
                      )}-${stat.season?.substring(4)}`}
                    </td>
                    <td className=" px-[8px] py-[13px]">{stat.team?.name}</td>
                    <td className=" px-[8px] py-[13px]">{player.games}</td>
                    <td className=" px-[8px] py-[13px]">{player.goals}</td>
                    <td className=" px-[8px] py-[13px]">
                      {player.assists}
                    </td>
                    <td className=" px-[8px] py-[13px]">{player.points}</td>
                    <td className=" px-[8px] py-[13px]">
                      {player.plusMinus || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.penaltyMinutes || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.powerPlayGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.powerPlayPoints || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.shortHandedGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.shortHandedPoints || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.gameWinningGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.overTimeGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.shots || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.shotPct || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {player.faceOffPct || "--"}
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
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.games}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.goals}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.assists}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.points}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.plusMinus || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.pim || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.powerPlayGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.powerPlayPoints || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.shortHandedGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.shortHandedPoints || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.gameWinningGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.overTimeGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedPlayerStats.shots || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {(reducedPlayerStats.shotPct &&
                      (
                        reducedPlayerStats.shotPct! / filteredStats.length
                      ).toFixed(2)) ||
                      "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {(reducedPlayerStats.faceOffPct &&
                      (
                        reducedPlayerStats.faceOffPct! / filteredStats.length
                      ).toFixed(2)) ||
                      "--"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div>{`${playerData.fullName} does not have any ${currentLeauge} stats`}</div>
        )}
      </div>
    </>
  );
};

export default PlayerDetailedStatsTable;
