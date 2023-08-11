"use client";
import { useState } from "react";
import StatSelect from "./group/StatSelect/StatSelect";
import { v4 as uuidv4 } from "uuid";
import processTableHeaders from "@/lib/processTableHeaders";
import processDetailedStats from "@/lib/processDetailedStats";

interface TestDetailedTableProps {
  player: NHLPlayer;
}

const DetailedStatTable = ({ player }: TestDetailedTableProps) => {
  const [seasonType, setSeasonType] = useState("Regular Season");
  const [currentLeauge, setCurrentLeague] = useState("National Hockey League");

  const playerPosition = player?.people?.[0].primaryPosition?.abbreviation;

  const headers = processTableHeaders(playerPosition)

  const playerData = player?.people?.[0];

  const { filteredStats, uniqueLeagues, careerStats } = processDetailedStats(playerData, currentLeauge, seasonType)

  return (
    <div>
      <StatSelect
        leagueType={uniqueLeagues}
        setSeason={setSeasonType}
        setLeague={setCurrentLeague}
      />
      <h1 className="text-2xl mt-3 pl-2">{`${playerData.fullName} Career Stats`}</h1>
      <div className="overflow-x-auto mt-2 rounded-md w-[99%] mx-auto">
        {filteredStats.length > 0 ? (
          <table className="table table-responsive text-sm w-full mx-auto rounded-md text-center border-collapse overflow-x-auto whitespace-nowrap">
            <thead className="table-header-group bg-slate-500 rounded-md p-4">
              <tr className="table-row rounded">
                {headers.map(
                  (
                    header: { label: string; dataProp: string },
                    index: number
                  ) => (
                    <th
                      key={header.label}
                      className={` px-[8px] py-[13px] ${
                        index === headers.length - 1 ? "rounded-tr-md" : null
                      } ${
                        index === 0
                          ? "rounded-tl-md sticky left-0 bg-slate-500"
                          : null
                      }`}
                    >
                      {header.label}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="table-row-group divide-y divide-gray-300">
              {filteredStats.map((stat) => {
                const seasonStat = playerPosition === 'G' ? stat.stat as GoalieSplitStats : stat.stat as PlayerSplitStats;
                return (
                  <tr className="table-row bg-slate-800" key={uuidv4()}>
                    {headers.map((header: header, index: number) => {
                      if (index === 0) {
                        return (
                          <td
                            key={uuidv4()}
                            className=" px-[8px] py-[13px] sticky left-0 bg-black"
                          >
                            {`${stat.season?.substring(
                              0,
                              4
                            )}-${stat.season?.substring(4)}`}
                          </td>
                        );
                      } else if (index === 1) {
                        return (
                          <td key={uuidv4()} className=" px-[8px] py-[13px]">
                            {stat.team?.name}
                          </td>
                        );
                      }

                      return (
                        <td key={uuidv4()} className="  px-[8px] py-[13px] whitespace-nowrap">
                          {seasonStat[header.dataProp as keyof typeof seasonStat] || '--'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {currentLeauge === "National Hockey League" && (
                <tr className="bg-slate-800">
                  {headers.map((header: header, index: number) => {
                    if (index === 0) {
                      return (
                        <td
                          key={uuidv4()}
                          className=" px-[8px] py-[13px] sticky left-0 bg-black"
                        >
                          Career
                        </td>
                      );
                    } else if (index === 1) {
                      return (
                        <td key={uuidv4()} className=" px-[8px] py-[13px]">
                          {"-"}
                        </td>
                      );
                    }
                    return (
                      <td key={uuidv4()} className=" px-[8px] py-[13px]">
                        {
                          careerStats[
                            header.dataProp as keyof typeof careerStats
                          ]
                        }
                      </td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div>{`${playerData.fullName} does not have any ${currentLeauge} ${seasonType} stats`}</div>
        )}
      </div>
    </div>
  );
};

export default DetailedStatTable;
