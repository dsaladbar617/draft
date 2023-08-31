import { Standings } from "@/types/standingsTypes";

const getWildCardStandings = async (seasonYear: string) : Promise<Standings> => {

	console.log(`https://statsapi.web.nhl.com/api/v1/standings/wildCardWithLeaders?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=${seasonYear}`)

  const res = await fetch(
		`https://statsapi.web.nhl.com/api/v1/standings/wildCardWithLeaders?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=${seasonYear}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default getWildCardStandings;