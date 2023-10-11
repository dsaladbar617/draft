"use client";
import getVsYearsAndTeams from "@/lib/getVsYearsAndTeams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type VsTableSelectGroupProps = {
  player: NHLPlayer;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
};

const VsTableSelectGroup = ({ player, setSeason }: VsTableSelectGroupProps) => {
  const { nhlSeasons } = getVsYearsAndTeams(player);

  return (
    <Select
      onValueChange={(e) => {
        setSeason(e);
      }}
      aria-label="draft year"
    >
      <SelectTrigger className="w-1/4">
        <SelectValue placeholder="Season" />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
        className="max-h-[75vh]"
      >
        {nhlSeasons.map((elem) => (
          <SelectItem
            className="hover:bg-neutral-500 focus:bg-neutral-500"
            key={elem.season}
            value={elem.season!}
          >
            {elem.season}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default VsTableSelectGroup;
