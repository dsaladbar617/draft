const getStandingsData = async (seasonYear: string) => {

  const res = await fetch(
		`https://statsapi.web.nhl.com/api/v1/standings?hydrate=record(overall),division,conference,team(nextSchedule(team),previousSchedule(team))&season=${seasonYear}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export default getStandingsData;