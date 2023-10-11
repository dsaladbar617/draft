"use client";
import getVsYearsAndTeams from "@/lib/getVsYearsAndTeams";
import VsTableSelectGroup from "./VsTableSelect";
import { Suspense, useState } from "react";
import useGetVsTeamStats from "@/lib/useGetVsTeamStats";
import VsStatTable from "./VsStatTable";

type VsTeamStatTableProps = {
  player: NHLPlayer;
};

const VsTeamStatTable = ({ player }: VsTeamStatTableProps) => {
  const { firstSeasonPlayed, lastSeasonPlayed, nhlSeasons } =
    getVsYearsAndTeams(player);

  const [season, setSeason] = useState(lastSeasonPlayed!);

  const { data: vsData, isLoading } = useGetVsTeamStats(
    player?.people[0].id.toString(),
    season
  );

  return (
    <div className="overflow-x-auto mt-2 rounded-md w-[99%] mx-auto">
      <VsTableSelectGroup player={player} setSeason={setSeason} />
      <h2 className="text-2xl mt-3 pl-2">{`${player.people[0].fullName} Season By Opponent Stats`}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <VsStatTable vsData={vsData!} />
      </Suspense>
    </div>
  );
};

export default VsTeamStatTable;
