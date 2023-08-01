import { useQuery } from '@tanstack/react-query';

const useRosters = async (season: string) => {
	const { data } = await useQuery(
		['rosters', season],
		async (): Promise<TeamType> => {
			const res = await fetch(
				`https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster&season=${season}}`
			);
			if (!res.ok) {
				throw new Error('Failed to fetch data');
			}
			return res.json();
		}
	);

	return data;
};

export default useRosters;
