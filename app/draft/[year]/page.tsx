'use client';

import { Suspense, useState } from 'react';
import useFetchDraft from '@/lib/useFetchDraft';
import DraftTable from '../../../components/DraftTable';
import TeamSelect from '@/components/TeamSelect';
import TestYearSelect from '@/components/testYearSelect';
import getDraft from '@/lib/getDraft';

export default async function Home({ params }: { params: { year: string } }) {
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	const currentYear = getCurrentYear().toString();

	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	// const { data, isLoading } = useFetchDraft(params.year);
	const data = await getDraft(params.year);

	return (
		<>
			<div className='flex flex-row justify-between w-1/2 mx-auto mt-4'>
				<TestYearSelect currentYear={+currentYear} />
				<TeamSelect setSelectedTeam={setSelectedTeam} />
			</div>
			{/* {isLoading ? <div>Loading...</div> : null} */}
			<Suspense fallback={<div>Loading...</div>}>
				<DraftTable data={data} selectedTeam={selectedTeam} />
			</Suspense>
		</>
	);
}
