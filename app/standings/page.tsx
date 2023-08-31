import getWildCardStandings from "@/lib/getWildCardStandings"

type pageProps = {

}

const page = async ({ params }: { params: { year: string } }) => {

  const standings = await getWildCardStandings(params.year);

  const wildCardWest = standings.records[1].teamRecords




  return <div>{JSON.stringify(wildCardWest)}</div>
}

export default page