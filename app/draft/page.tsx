'use client';

import { useState } from 'react';
import useFetchDraft from '@/lib/useFetchDraft';
import DraftTable from '../../components/DraftTable';
import TeamSelect from '@/components/TeamSelect';
import TestYearSelect from '@/components/testYearSelect';

export default function Home({ params }: { params: { year: string } }) {
	const getCurrentYear = () => {
		return new Date().getFullYear() - 1;
	};

	const currentYear = getCurrentYear().toString();

	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	const { data, isLoading } = useFetchDraft(
		params.year ? params.year : currentYear
	);

	return (
		<>
			<div className='flex flex-row justify-between w-1/2 mx-auto mt-4'>
				<TestYearSelect currentYear={+currentYear} />
				<TeamSelect setSelectedTeam={setSelectedTeam} />
			</div>
			{isLoading ? <div>Loading...</div> : null}
			<DraftTable data={data!} selectedTeam={selectedTeam} />
		</>
	);
}
