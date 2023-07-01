const getPlayerWithStats = async (
	fetchedPlayer: string
): Promise<NHLPlayer> => {
	const res = await fetch(
		`https://statsapi.web.nhl.com/api/v1/people/${fetchedPlayer}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason,careerPlayoffs,statsSingleSeason`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

export default getPlayerWithStats;
