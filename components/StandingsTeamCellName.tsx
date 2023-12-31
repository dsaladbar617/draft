import { TeamRecord } from "@/types/standingsTypes";
import Image from "next/image";

type StandingsTeamCellNameProps = {
  team: TeamRecord;
  rank: string;
};

const StandingsTeamCellName = ({ team, rank }: StandingsTeamCellNameProps) => {
  return (
    <td className="py-[13px] px-[8px] w-[195px] text-left flex justify-start gap-4">
      {rank}
      <Image
        src={`https://assets.nhle.com/logos/nhl/svg/${team.team.abbreviation.toUpperCase()}_light.svg`}
        alt="team logo"
        height={35}
        width={35}
      />
      {`${team.clinchIndicator ? `${team.clinchIndicator}-` : ""}${
        team.team.locationName
      }`}
    </td>
  );
};

export default StandingsTeamCellName;
