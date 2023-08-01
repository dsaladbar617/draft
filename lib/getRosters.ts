const getRosters = async (year: string): Promise<TeamType> => {
	const res = await fetch(
		`https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season=${year}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

export default getRosters;
