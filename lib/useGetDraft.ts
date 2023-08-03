// import useSWR from 'swr';
import { useQuery } from '@tanstack/react-query';

const useGetDraft = (year: string) => {
	const { data, isLoading } = useQuery([year], async () => {
		return await fetch(
			`https://statsapi.web.nhl.com/api/v1/draft/${year}`
		).then((res) => res.json() as Promise<Drafts>);
	});

	return { data, isLoading };
};

export default useGetDraft;
