import { v4 as uuidv4 } from "uuid";
type VsStatTableProps = {
  vsData: VsTeamStats | undefined;
};

const VsStatTable = ({ vsData }: VsStatTableProps) => {
  const headers = [
    { label: "Team", dataProp: "opponent.name" },
    { label: "TOI", dataProp: "stat.timeOnIce" },
    { label: "G", dataProp: "stat.goals" },
    { label: "A", dataProp: "stat.assists" },
    { label: "P", dataProp: "stat.points" },
    { label: "S", dataProp: "stat.shots" },
    { label: "H", dataProp: "stat.hits" },
    { label: "GP", dataProp: "stat.games" },
    { label: "G/G", dataProp: "stat.goals" },
    { label: "A/G", dataProp: "stat.assists" },
    { label: "P/G", dataProp: "stat.points" },
    { label: "S/G", dataProp: "stat.shots" },
  ];

  return (
    <table className="table table-responsive text-sm w-full mx-auto rounded-md text-center border-collapse overflow-x-auto whitespace-nowrap">
      <thead className="table-header-group bg-neutral-500 rounded-md p-4">
        <tr className="table-row rounded">
          {headers.map((header: header, index: number) => (
            <th
              key={header.label}
              className={` px-[8px] py-[13px] ${
                index === headers.length - 1 ? "rounded-tr-md" : null
              } ${
                index === 0
                  ? "rounded-tl-md sticky left-0 bg-neutral-500"
                  : null
              }`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table-row-group divide-y divide-gray-300">
        {vsData?.stats[0].splits.map((vsTeam: VsSplits) => (
          <tr className="table-row bg-neutral-800" key={uuidv4()}>
            <td className="px-[8px] py-[13px]">{vsTeam.opponent.name}</td>
            <td className="px-[8px] py-[13px]">{vsTeam.stat.timeOnIce}</td>
            <td className="px-[8px] py-[13px]">{vsTeam.stat.goals}</td>
            <td className="px-[8px] py-[13px]">{vsTeam.stat.assists}</td>
            <td className="px-[8px] py-[13px]">{vsTeam.stat.points}</td>
            <td className="px-[8px] py-[13px]">{vsTeam.stat.shots}</td>
            <td className="px-[8px] py-[13px]">{vsTeam.stat.hits}</td>
            <td className="px-[8px] py-[13px]">{vsTeam.stat.games}</td>
            <td className="px-[8px] py-[13px]">
              {(vsTeam.stat.goals / vsTeam.stat.games).toPrecision(2)}
            </td>
            <td className="px-[8px] py-[13px]">
              {(vsTeam.stat.assists / vsTeam.stat.games).toPrecision(2)}
            </td>
            <td className="px-[8px] py-[13px]">
              {(vsTeam.stat.points / vsTeam.stat.games).toPrecision(2)}
            </td>
            <td className="px-[8px] py-[13px]">
              {(vsTeam.stat.shots / vsTeam.stat.games).toPrecision(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VsStatTable;
