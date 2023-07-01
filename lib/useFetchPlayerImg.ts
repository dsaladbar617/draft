// https://cms.nhl.bamgrid.com/images/headshots/current/168x168/8471214@2x.jpg

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchPlayerImg = (playerId: string) => {
	return useQuery({
		queryKey: ['playerImg', [playerId]],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${playerId}@2x.jpg`
			);

			return data as image;
		}
	});
};

export default useFetchPlayerImg;
