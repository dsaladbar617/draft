const getProspect = async (prospectId: string): Promise<FetchedProspect> => {
	const res = await fetch(
		`https://statsapi.web.nhl.com/api/v1/draft/prospects/${prospectId}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

export default getProspect;
