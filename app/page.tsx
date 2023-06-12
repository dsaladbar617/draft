'use client';

import { useQuery } from '@tanstack/react-query';
import DraftYearSelect from './components/DraftYearSelect';
import axios from 'axios';

export default function Home() {
	const { data, isLoading } = useQuery({
		queryKey: ['drafts'],
		queryFn: async (): Promise<Drafts> => {
			const { data } = await axios.get(
				'https://statsapi.web.nhl.com/api/v1/draft/2022'
			);

			return data;
		}
	});

	console.log(data);

	return (
		<>
			<DraftYearSelect />
			<div>Hello</div>
		</>
	);
}
