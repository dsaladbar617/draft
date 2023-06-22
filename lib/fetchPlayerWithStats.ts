import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useFetchProspect from './fetchProspect';

const useFetchPlayerWithStats = async (playerId: string) => {
	const { data: prospect } = await useFetchProspect(playerId);

	const fetchedPlayer = prospect?.prospects[0].nhlPlayerId;

	return useQuery({
		queryKey: ['player', fetchedPlayer],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://statsapi.web.nhl.com/api/v1/people/${fetchedPlayer}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason`
			);

			return data as NHLPlayer;
		}
	});
};

export default useFetchPlayerWithStats;
