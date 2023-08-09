"use client";
import { useState } from "react";
import StatSelect from "./StatSelect";
import { v4 as uuidv4 } from "uuid";
// import Stats from '../types/Stats';

interface StatsTableProps {
  player: NHLPlayer;
}

const DetailedStatsTable = ({ player }: StatsTableProps) => {
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

  console.log(currentLeauge, filteredStats);

  const reducedStats =
    filteredStats.length > 0 &&
    filteredStats.reduce((acc, curr) => {
      const gamesPlayed = curr.stat?.games;
      const goals = curr.stat?.goals;
      const assists = curr.stat?.assists;
      const points = curr.stat?.points;
      const plusMinus = curr.stat?.plusMinus;
      const pim = curr.stat?.pim;
      const ppg = curr.stat?.powerPlayGoals;
      const ppp = curr.stat?.powerPlayPoints;
      const shg = curr.stat?.shortHandedGoals;
      const shp = curr.stat?.shortHandedPoints;
      const gwg = curr.stat?.gameWinningGoals;
      const otg = curr.stat?.overTimeGoals;
      const shots = curr.stat?.shots;
      const shotPct = curr.stat?.shotPct;
      const faceoffPct = curr.stat?.faceOffPct;

      return {
        stat: {
          games: acc.stat!.games + gamesPlayed!,
          goals: acc.stat!.goals + goals!,
          assists: acc.stat!.assists + assists!,
          points: acc.stat!.points + points!,
          plusMinus: acc.stat!.plusMinus + plusMinus!,
          pim: acc.stat!.pim + pim!,
          powerPlayGoals: acc.stat!.powerPlayGoals! + ppg!,
          powerPlayPoints: acc.stat!.powerPlayPoints! + ppp!,
          shortHandedGoals: acc.stat!.shortHandedGoals! + shg!,
          shortHandedPoints: acc.stat!.shortHandedPoints! + shp!,
          gameWinningGoals: acc.stat!.gameWinningGoals! + gwg!,
          overTimeGoals: acc.stat!.overTimeGoals! + otg!,
          shots: acc.stat!.shots! + shots!,
          shotPct: acc.stat!.shotPct! + shotPct!,
          faceOffPct: acc.stat!.faceOffPct! + faceoffPct!,
        },
      };
    });

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
                return (
                  <tr className="table-row" key={uuidv4()}>
                    <td className=" px-[8px] py-[13px] sticky left-0 bg-black">
                      {`${stat.season?.substring(
                        0,
                        4
                      )}-${stat.season?.substring(4)}`}
                    </td>
                    <td className=" px-[8px] py-[13px]">{stat.team?.name}</td>
                    <td className=" px-[8px] py-[13px]">{stat.stat?.games}</td>
                    <td className=" px-[8px] py-[13px]">{stat.stat?.goals}</td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.assists}
                    </td>
                    <td className=" px-[8px] py-[13px]">{stat.stat?.points}</td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.plusMinus || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.penaltyMinutes || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.powerPlayGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.powerPlayPoints || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.shortHandedGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.shortHandedPoints || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.gameWinningGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.overTimeGoals || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.shots || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.shotPct || "--"}
                    </td>
                    <td className=" px-[8px] py-[13px]">
                      {stat.stat?.faceOffPct || "--"}
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
                    {reducedStats.stat?.games}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.goals}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.assists}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.points}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.plusMinus || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.pim || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.powerPlayGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.powerPlayPoints || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.shortHandedGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.shortHandedPoints || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.gameWinningGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.overTimeGoals || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {reducedStats.stat?.shots || "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {(reducedStats.stat?.shotPct &&
                      (
                        reducedStats.stat?.shotPct! / filteredStats.length
                      ).toFixed(2)) ||
                      "--"}
                  </td>
                  <td className=" px-[8px] py-[13px]">
                    {(reducedStats.stat?.faceOffPct &&
                      (
                        reducedStats.stat?.faceOffPct! / filteredStats.length
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

export default DetailedStatsTable;
