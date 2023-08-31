import StandingsLegend from "@/components/StandingsLegend";
import StandingsTeamTable from "@/components/StandingsTeamTable";
import getWildCardStandings from "@/lib/getWildCardStandings";

type pageProps = {};

const page = async ({ params }: { params: { year: string } }) => {

  const yearNumber = Number(params.year);
  const standings = await getWildCardStandings(`${yearNumber}${yearNumber + 1}`);

  const wildCardEast = standings.records[0]?.teamRecords;
  const wildCardWest = standings.records[1]?.teamRecords;
  const leadersMetro = standings.records[2]?.teamRecords;
  const leadersAtlantic = standings.records[3]?.teamRecords;
  const leadersCentral = standings.records[4]?.teamRecords;
  const leadersPacific = standings.records[5]?.teamRecords;

  return (
    <div className="flex flex-col  ">
      <h2 className='text-3xl my-4 ml-[2vw]'>Eastern</h2>
      <div className="flex flex-col gap-4 w-11/12 mx-auto">
        <StandingsTeamTable team={leadersMetro} conference="Metropolitan" />
        <StandingsTeamTable team={leadersAtlantic} conference="Atlantic" />
        <StandingsTeamTable team={wildCardEast} conference="Wild Card" />
      </div>
      <h2 className='text-3xl mt-4 ml-[2vw]'>Western</h2>
      <div className="flex flex-col gap-4 w-11/12 mx-auto">
        <StandingsTeamTable team={leadersCentral} conference="Central" />
        <StandingsTeamTable team={leadersPacific} conference="Pacific" />
        <StandingsTeamTable team={wildCardWest} conference="Wild Card" />
      </div>
      <StandingsLegend />
    </div>
  );
};

export default page;
