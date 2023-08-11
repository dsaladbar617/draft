import processSummaryHeaders from "@/lib/processSummaryHeaders";
import { v4 as uuidv4 } from "uuid";

type MobileStatSummaryProps = {
  player: NHLPlayer;
};

const MobileStatSummary = ({ player }: MobileStatSummaryProps) => {
  const playerPosition = player?.people?.[0].primaryPosition?.abbreviation;
  const headers = processSummaryHeaders(playerPosition);
  const playerData = player?.people?.[0];
  const career = playerData?.stats?.slice(2);

  return (
    <div className=" p-4 md:hidden">
      {career.map((season) => {
        let statTitle = "";

        if (season.type.displayName === "careerRegularSeason") {
          statTitle = "NHL Career";
        } else if (season.type.displayName === "careerPlayoffs") {
          statTitle = "Career Playoffs";
        } else if (season.type.displayName === "statsSingleSeason") {
          const seasonName = `${season.splits[0]?.season}`;
          const index = 4;
          statTitle =
          `${seasonName.substring(0, index)}-${seasonName.substring(index)}`;
        }

        return (
          <div key={uuidv4()} className="p-4 md:hidden">
            <h2>{statTitle}</h2>
            <table className="text-sm w-full text-center mx-auto">
              <thead>
                <tr>
                  {headers.map((header) => {
                    const stat = season.splits[0].stat;
                    if (stat)
                      return (
                        <th
                          key={uuidv4()}
                          className={`font-normal p-[8px] ${playerPosition === 'G' ? 'w-1/6' : 'w-1/5'}`}
                        >
                          {header.label}
                        </th>
                      );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                {headers.map((header: header) => {
                    const stat = season.splits[0].stat;
                    if (stat)
                      return (
                        <td
                          key={uuidv4()}
                          className="font-normal p-[8px]"
                        >
                          { header.label === 'GAA' || header.label === 'SV%' ? (stat?.[header.dataProp as keyof typeof stat] as number)?.toFixed(2) :  stat[header.dataProp as keyof typeof stat] || "--"}
                        </td>
                      );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default MobileStatSummary;
