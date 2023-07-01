const getDraft = async (year: string): Promise<Drafts> => {
	const res = await fetch(`https://statsapi.web.nhl.com/api/v1/draft/${year}`);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
};

export default getDraft;
