import StandingsLegend from "@/components/StandingsLegend";
import StandingsTeamTable from "@/components/StandingsTeamTable";
import getStandingsData from "@/lib/getStandingsData";

const Page = async ({ params }: { params: { year: string } }) => {

	const yearNumber = Number(params.year);
  const standings = await getStandingsData(`${yearNumber}${yearNumber + 1}`);

	const metroStats = standings.records[0]?.teamRecords;
  const atlanticStats = standings.records[1]?.teamRecords;
  const centralStats = standings.records[2]?.teamRecords;
  const pacificStats = standings.records[3]?.teamRecords;

	return (
		<div className="flex flex-col  ">
      <div className="flex flex-col gap-4 w-11/12 mx-auto">
        <StandingsTeamTable team={metroStats} conference="Metropolitan" />
        <StandingsTeamTable team={atlanticStats} conference="Atlantic" />
        <StandingsTeamTable team={centralStats} conference="Central" />
        <StandingsTeamTable team={pacificStats} conference="Pacific" />
      </div>
      <StandingsLegend />
    </div>
	);
};

export default Page;