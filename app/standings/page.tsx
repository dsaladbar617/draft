import getWildCardStandings from "@/lib/getWildCardStandings"

type pageProps = {

}

const page = async ({ params }: { params: { year: string } }) => {

  // const standings = await getWildCardStandings(params.year);

  // const wildCardWest = standings.records[1].teamRecords




  return <div>Standings</div>
}

export default page