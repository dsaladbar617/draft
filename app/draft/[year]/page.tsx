'use client';

import { Suspense, use, useState } from 'react';
import getDraft from '@/lib/getDraft';
import DraftTable from '../../../components/DraftTable';
import TeamSelect from '@/components/TeamSelect';
import TestYearSelect from '@/components/testYearSelect';
import useGetDraft from '@/lib/useGetDraft';

export default function Home({ params }: { params: { year: string } }) {
	const getCurrentYear = () => {
		return new Date().getFullYear() - 1;
	};

	const currentYear = getCurrentYear().toString();

	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	const { data, isLoading } = useGetDraft(params.year);

	return (
		<>
			<div className='flex flex-row justify-between w-1/2 mx-auto mt-4'>
				<TestYearSelect currentYear={Number(currentYear)} />
				<TeamSelect setSelectedTeam={setSelectedTeam} />
			</div>
			<Suspense fallback={<div>Loading...</div>}>
				<DraftTable data={data!} selectedTeam={selectedTeam} />
			</Suspense>
		</>
	);
}
